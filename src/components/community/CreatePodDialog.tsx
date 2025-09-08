import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { usePods } from '@/hooks/usePods';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface CreatePodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPodCreated?: () => void;
}

const CreatePodDialog = ({ open, onOpenChange, onPodCreated }: CreatePodDialogProps) => {
  const { user } = useAuth();
  const { createPod, loading } = usePods();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    crop_focus: '',
    is_private: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to create a pod');
      return;
    }

    if (!formData.name.trim() || !formData.location.trim()) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      await createPod({
        name: formData.name.trim(),
        description: formData.description.trim(),
        location: formData.location.trim(),
        crop_focus: (formData.crop_focus as any) || undefined,
        is_private: formData.is_private,
      });
      
      setFormData({
        name: '',
        description: '',
        location: '',
        crop_focus: '',
        is_private: false,
      });
      
      onOpenChange(false);
      onPodCreated?.();
    } catch (error) {
      toast.error('Failed to create pod');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Pod</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Pod Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Gujarat • Vegetables"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Gujarat, India"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="crop_focus">Crop Focus</Label>
            <Select 
              value={formData.crop_focus} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, crop_focus: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select crop type (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your pod's focus and goals..."
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_private"
              checked={formData.is_private}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_private: checked }))}
            />
            <Label htmlFor="is_private">Private Pod (invite only)</Label>
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
              {loading ? 'Creating...' : 'Create Pod'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePodDialog;