-- Fix security issue: Remove email addresses from publicly visible username field

-- First, update existing records to remove email addresses from username field
UPDATE public.profiles 
SET username = split_part(username, '@', 1) 
WHERE username LIKE '%@%';

-- Update the handle_new_user function to not store email addresses
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public 
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, display_name)
  VALUES (
    NEW.id, 
    -- Use part before @ symbol instead of full email
    split_part(NEW.email, '@', 1),
    COALESCE(NEW.raw_user_meta_data ->> 'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$;