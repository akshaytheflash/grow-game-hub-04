import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePods, Pod } from "@/hooks/usePods";
import { useAuth } from "@/hooks/useAuth";
import { MapPin, Users, Plus, Search } from "lucide-react";
import CreatePodDialog from "./CreatePodDialog";
import { toast } from "sonner";

const PodsPanel = () => {
  const { user } = useAuth();
  const { getPods, joinPod, leavePod, loading } = usePods();
  const [pods, setPods] = useState<Pod[]>([]);
  const [filteredPods, setFilteredPods] = useState<Pod[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    loadPods();
  }, []);

  useEffect(() => {
    filterPods();
  }, [pods, searchTerm, selectedCrop]);

  const loadPods = async () => {
    try {
      const data = await getPods();
      setPods(data);
    } catch (error) {
      toast.error('Failed to load pods');
    }
  };

  const filterPods = () => {
    let filtered = pods;

    if (searchTerm) {
      filtered = filtered.filter(pod =>
        pod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pod.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCrop !== "all") {
      filtered = filtered.filter(pod => pod.crop_focus === selectedCrop);
    }

    setFilteredPods(filtered);
  };

  const handleJoinLeave = async (pod: Pod) => {
    if (!user) {
      toast.error('Please sign in to join pods');
      return;
    }

    try {
      if (pod.is_member) {
        await leavePod(pod.id);
      } else {
        await joinPod(pod.id);
      }
      await loadPods();
    } catch (error) {
      toast.error('Failed to update pod membership');
    }
  };

  const handlePodCreated = () => {
    setShowCreateDialog(false);
    loadPods();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Local Pods</CardTitle>
            <Button
              size="sm"
              onClick={() => setShowCreateDialog(true)}
              className="h-8 w-8 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filter */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search pods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Crops</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pods List */}
          <div className="space-y-3">
            {filteredPods.map((pod) => (
              <Card key={pod.id} className="p-3">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm leading-tight">{pod.name}</h4>
                    {pod.crop_focus && (
                      <Badge variant="secondary" className="text-xs">
                        {pod.crop_focus}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {pod.location}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Users className="w-3 h-3 mr-1" />
                      {pod.member_count} members
                    </div>
                    
                    <Button
                      size="sm"
                      variant={pod.is_member ? "outline" : "default"}
                      onClick={() => handleJoinLeave(pod)}
                      disabled={loading}
                      className="h-6 px-2 text-xs"
                    >
                      {pod.is_member ? "Leave" : "Join"}
                    </Button>
                  </div>
                  
                  {pod.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {pod.description}
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
          
          {filteredPods.length === 0 && (
            <div className="text-center py-4 text-muted-foreground text-sm">
              No pods found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      <CreatePodDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onPodCreated={handlePodCreated}
      />
    </div>
  );
};

export default PodsPanel;