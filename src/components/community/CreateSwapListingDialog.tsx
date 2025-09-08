import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSwapBoard } from '@/hooks/useSwapBoard';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface CreateSwapListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onListingCreated?: () => void;
}

const CreateSwapListingDialog = ({ open, onOpenChange, onListingCreated }: CreateSwapListingDialogProps) => {
  const { user } = useAuth();
  const { createSwapListing, loading } = useSwapBoard();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    item_condition: '',
    location: '',
    description: '',
    wants_in_return: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to create a listing');
      return;
    }

    if (!formData.title.trim() || !formData.category || !formData.item_condition || !formData.location.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await createSwapListing({
        title: formData.title.trim(),
        category: formData.category,
        item_condition: formData.item_condition,
        location: formData.location.trim(),
        description: formData.description.trim(),
        wants_in_return: formData.wants_in_return.trim() || undefined,
      });
      
      setFormData({
        title: '',
        category: '',
        item_condition: '',
        location: '',
        description: '',
        wants_in_return: '',
      });
      
      onOpenChange(false);
      onListingCreated?.();
    } catch (error) {
      toast.error('Failed to create listing');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Swap Listing</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Item Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Organic Tomato Seeds - Heritage Variety"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seeds">Seeds</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="produce">Produce</SelectItem>
                  <SelectItem value="materials">Materials</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="item_condition">Condition *</Label>
              <Select 
                value={formData.item_condition} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, item_condition: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wants_in_return">What do you want in return?</Label>
            <Input
              id="wants_in_return"
              value={formData.wants_in_return}
              onChange={(e) => setFormData(prev => ({ ...prev, wants_in_return: e.target.value }))}
              placeholder="e.g., Looking for organic fertilizer or seeds"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Pune, Maharashtra"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the item, its condition, and any special notes..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Listing'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSwapListingDialog;