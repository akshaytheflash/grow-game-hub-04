import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useSwapBoard, SwapListing } from "@/hooks/useSwapBoard";
import { useAuth } from "@/hooks/useAuth";
import { Search, Package, MapPin, Clock, MessageCircle, Plus } from "lucide-react";
import CreateSwapListingDialog from "./CreateSwapListingDialog";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

const SwapBoard = () => {
  const { user } = useAuth();
  const { getSwapListings, contactLister, loading } = useSwapBoard();
  const [listings, setListings] = useState<SwapListing[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredListings, setFilteredListings] = useState<SwapListing[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    loadListings();
  }, []);

  useEffect(() => {
    filterListings();
  }, [listings, searchTerm]);

  const loadListings = async () => {
    try {
      const data = await getSwapListings();
      setListings(data);
    } catch (error) {
      toast.error('Failed to load swap listings');
    }
  };

  const filterListings = () => {
    let filtered = listings;

    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredListings(filtered);
  };

  const handleContact = async (listingId: string) => {
    if (!user) {
      toast.error('Please sign in to contact lister');
      return;
    }

    try {
      await contactLister(listingId, "I'm interested in this item. Please let me know if it's still available.");
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const getItemTypeColor = (category: string) => {
    const colors: Record<string, string> = {
      'seeds': 'bg-green-100 text-green-800',
      'equipment': 'bg-blue-100 text-blue-800',
      'tools': 'bg-yellow-100 text-yellow-800',
      'produce': 'bg-orange-100 text-orange-800',
      'materials': 'bg-purple-100 text-purple-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getConditionColor = (condition: string) => {
    const colors: Record<string, string> = {
      'new': 'bg-green-100 text-green-800',
      'good': 'bg-blue-100 text-blue-800',
      'fair': 'bg-yellow-100 text-yellow-800',
      'poor': 'bg-red-100 text-red-800',
    };
    return colors[condition] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4">
      {/* Header with Search and Create */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search seeds, tools, equipment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          List Item
        </Button>
      </div>

      {/* Swap Listings */}
      <div className="space-y-4">
        {filteredListings.map((listing) => (
          <Card key={listing.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-base">{listing.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getItemTypeColor(listing.category)}>
                      <Package className="w-3 h-3 mr-1" />
                      {listing.category}
                    </Badge>
                    <Badge className={getConditionColor(listing.item_condition)}>
                      {listing.item_condition}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{listing.wants_in_return || 'Open to offers'}</p>
                  <p className="text-xs text-muted-foreground">
                    {listing.profiles?.display_name || listing.profiles?.username || 'Anonymous'}
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {listing.description && (
                <p className="text-sm text-muted-foreground">{listing.description}</p>
              )}
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {listing.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatDistanceToNow(new Date(listing.created_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Looking for: {listing.wants_in_return || 'Open to offers'}
                </div>
                
                <Button
                  size="sm"
                  onClick={() => handleContact(listing.id)}
                  disabled={loading || listing.user_id === user?.id}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredListings.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Package className="w-12 h-12 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">
                {searchTerm ? 'No listings found matching your search' : 'No swap listings available'}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Listing
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <CreateSwapListingDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onListingCreated={() => {
          setShowCreateDialog(false);
          loadListings();
        }}
      />
    </div>
  );
};

export default SwapBoard;