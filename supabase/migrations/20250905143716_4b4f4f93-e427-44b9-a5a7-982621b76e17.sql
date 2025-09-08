-- First check if we need to update crop_focus enum type
DO $$
BEGIN
    -- Check if the type exists and add values if needed
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'crop_focus_type') THEN
        -- Add missing enum values if they don't exist
        BEGIN
            ALTER TYPE crop_focus_type ADD VALUE IF NOT EXISTS 'vegetables';
            ALTER TYPE crop_focus_type ADD VALUE IF NOT EXISTS 'cotton';
            ALTER TYPE crop_focus_type ADD VALUE IF NOT EXISTS 'rice';
            ALTER TYPE crop_focus_type ADD VALUE IF NOT EXISTS 'wheat';
            ALTER TYPE crop_focus_type ADD VALUE IF NOT EXISTS 'mixed';
            ALTER TYPE crop_focus_type ADD VALUE IF NOT EXISTS 'other';
        EXCEPTION WHEN OTHERS THEN
            -- Values might already exist
            NULL;
        END;
    ELSE
        -- Create the enum type if it doesn't exist
        CREATE TYPE crop_focus_type AS ENUM ('vegetables', 'cotton', 'rice', 'wheat', 'mixed', 'other');
    END IF;
END $$;

-- Ensure community_pods table uses the proper enum type
ALTER TABLE community_pods 
ALTER COLUMN crop_focus TYPE crop_focus_type USING crop_focus::crop_focus_type;

-- Create missing tables if they don't exist
CREATE TABLE IF NOT EXISTS swap_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    item_type TEXT NOT NULL,
    quantity TEXT NOT NULL,
    condition TEXT NOT NULL DEFAULT 'good',
    location TEXT NOT NULL,
    location_radius INTEGER NOT NULL DEFAULT 10,
    description TEXT,
    contact_method TEXT NOT NULL DEFAULT 'in_app',
    status TEXT NOT NULL DEFAULT 'active',
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS on swap_listings
ALTER TABLE swap_listings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for swap_listings
DROP POLICY IF EXISTS "Active swap listings are viewable by everyone" ON swap_listings;
CREATE POLICY "Active swap listings are viewable by everyone" 
ON swap_listings 
FOR SELECT 
USING (status = 'active' AND expires_at > now());

DROP POLICY IF EXISTS "Users can create their own listings" ON swap_listings;
CREATE POLICY "Users can create their own listings" 
ON swap_listings 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own listings" ON swap_listings;
CREATE POLICY "Users can update their own listings" 
ON swap_listings 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create swap_messages table for contact functionality
CREATE TABLE IF NOT EXISTS swap_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    listing_id UUID NOT NULL REFERENCES swap_listings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on swap_messages
ALTER TABLE swap_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for swap_messages
DROP POLICY IF EXISTS "Users can view messages for their listings" ON swap_messages;
CREATE POLICY "Users can view messages for their listings" 
ON swap_messages 
FOR SELECT 
USING (
    auth.uid() = sender_id OR 
    auth.uid() IN (SELECT user_id FROM swap_listings WHERE id = listing_id)
);

DROP POLICY IF EXISTS "Users can send messages" ON swap_messages;
CREATE POLICY "Users can send messages" 
ON swap_messages 
FOR INSERT 
WITH CHECK (auth.uid() = sender_id);

-- Create pod_memberships table for proper pod functionality
CREATE TABLE IF NOT EXISTS pod_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pod_id UUID NOT NULL REFERENCES community_pods(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member',
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(pod_id, user_id)
);

-- Enable RLS on pod_memberships
ALTER TABLE pod_memberships ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for pod_memberships
DROP POLICY IF EXISTS "Pod members can view membership" ON pod_memberships;
CREATE POLICY "Pod members can view membership" 
ON pod_memberships 
FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM pod_memberships pm 
        WHERE pm.pod_id = pod_memberships.pod_id AND pm.user_id = auth.uid()
    )
);

DROP POLICY IF EXISTS "Users can join pods" ON pod_memberships;
CREATE POLICY "Users can join pods" 
ON pod_memberships 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create database functions for member count management
CREATE OR REPLACE FUNCTION increment_pod_members(pod_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE community_pods 
    SET member_count = member_count + 1 
    WHERE id = pod_id;
END;
$$;

CREATE OR REPLACE FUNCTION decrement_pod_members(pod_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE community_pods 
    SET member_count = GREATEST(member_count - 1, 0) 
    WHERE id = pod_id;
END;
$$;

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for swap_listings
DROP TRIGGER IF EXISTS update_swap_listings_updated_at ON swap_listings;
CREATE TRIGGER update_swap_listings_updated_at
    BEFORE UPDATE ON swap_listings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();