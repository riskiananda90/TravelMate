
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface LocationPermissionModalProps {
  onPermissionGranted: () => void;
  onPermissionDenied: () => void;
}

export const LocationPermissionModal = ({ onPermissionGranted, onPermissionDenied }: LocationPermissionModalProps) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Check if permission was already granted
    if (localStorage.getItem('locationPermissionGranted') === 'true') {
      handlePermissionGranted();
    }
  }, []);

  const handlePermissionGranted = () => {
    localStorage.setItem('locationPermissionGranted', 'true');
    setOpen(false);
    onPermissionGranted();
  };

  const handlePermissionDenied = () => {
    localStorage.setItem('locationPermissionGranted', 'false');
    setOpen(false);
    onPermissionDenied();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-travel-500" />
            Location Access
          </DialogTitle>
          <DialogDescription>
            TravelMate needs access to your location to recommend nearby tourist destinations. 
            This helps us provide personalized recommendations based on your current location.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="bg-travel-50 p-4 rounded-md">
            <p className="text-sm text-travel-800">
              Your location will only be used to calculate distances to tourist destinations and 
              is not stored on our servers. You can always change this permission later.
            </p>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
          <Button variant="outline" onClick={handlePermissionDenied}>
            Use Default Location
          </Button>
          <Button onClick={handlePermissionGranted} className="bg-travel-600 hover:bg-travel-700">
            Allow Location Access
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPermissionModal;
