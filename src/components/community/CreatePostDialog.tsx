import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Camera, Lightbulb, MessageSquare, Upload, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostCreated?: () => void;
}

const CreatePostDialog = ({ open, onOpenChange, onPostCreated }: CreatePostDialogProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('update');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    location: '',
    crop_type: '',
    before_image: null as File | null,
    after_image: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      location: '',
      crop_type: '',
      before_image: null,
      after_image: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to create a post');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Please fill in title and content');
      return;
    }

    // Photo story validation
    if (activeTab === 'story' && (!formData.before_image || !formData.after_image)) {
      toast.error('Photo stories require both before and after images');
      return;
    }

    setLoading(true);

    try {
      // For now, create post without image upload
      // In a real app, you'd upload images to Supabase Storage first
      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          title: formData.title.trim(),
          content: formData.content.trim(),
          post_type: activeTab as any,
          location: formData.location.trim() || null,
          crop_type: (formData.crop_type as any) || null,
          user_id: user.id,
          status: 'active',
          upvotes: 0,
          comments_count: 0,
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Post created successfully!');
      resetForm();
      onOpenChange(false);
      onPostCreated?.();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (type: 'before' | 'after', file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [`${type}_image`]: file
    }));
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'story': return <Camera className="h-4 w-4" />;
      case 'tip': return <Lightbulb className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share with the Community</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="update" className="flex items-center space-x-2">
              {getTabIcon('update')}
              <span>Update</span>
            </TabsTrigger>
            <TabsTrigger value="tip" className="flex items-center space-x-2">
              {getTabIcon('tip')}
              <span>Tip</span>
            </TabsTrigger>
            <TabsTrigger value="story" className="flex items-center space-x-2">
              {getTabIcon('story')}
              <span>Photo Story</span>
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <TabsContent value="update" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="title">What's happening on your farm?</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Harvested my first organic tomatoes!"
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="tip" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="tip-title">Share your farming tip</Label>
                <Input
                  id="tip-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Natural pest control method that works"
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="story" className="space-y-4 mt-0">
              <div className="space-y-2">
                <Label htmlFor="story-title">Your transformation story</Label>
                <Input
                  id="story-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., From barren land to thriving crops"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Before Image</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <div className="text-sm text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('before', e.target.files?.[0] || null)}
                          className="hidden"
                          id="before-image"
                        />
                        <label htmlFor="before-image" className="cursor-pointer text-primary hover:underline">
                          Upload before image
                        </label>
                        {formData.before_image && (
                          <div className="mt-2">
                            <Badge variant="outline">{formData.before_image.name}</Badge>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleImageUpload('before', null)}
                              className="ml-2 h-auto p-1"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>After Image</Label>
                  <div className="border-2 border-dashed border-muted rounded-lg p-4">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <div className="text-sm text-center">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload('after', e.target.files?.[0] || null)}
                          className="hidden"
                          id="after-image"
                        />
                        <label htmlFor="after-image" className="cursor-pointer text-primary hover:underline">
                          Upload after image
                        </label>
                        {formData.after_image && (
                          <div className="mt-2">
                            <Badge variant="outline">{formData.after_image.name}</Badge>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleImageUpload('after', null)}
                              className="ml-2 h-auto p-1"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <div className="space-y-2">
              <Label htmlFor="content">
                {activeTab === 'story' ? 'What changed and how? (2-line tip)' : 'Tell us more'}
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder={
                  activeTab === 'story' 
                    ? "Share your key learning or tip in 2 lines..."
                    : "Share details, methods, results, or advice..."
                }
                rows={activeTab === 'story' ? 3 : 4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location (optional)</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Gujarat, India"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crop_type">Crop Type (optional)</Label>
                <Select 
                  value={formData.crop_type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, crop_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
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
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Sharing...' : 'Share Post'}
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;