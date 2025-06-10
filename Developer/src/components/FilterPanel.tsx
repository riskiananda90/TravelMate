
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from '@/utils/calculations';

interface FilterPanelProps {
  onFilterChange: (budget: { min: number; max: number }, distance: number) => void;
}

export const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const [maxDistance, setMaxDistance] = useState<number>(50); // Default 50km
  const [minBudget, setMinBudget] = useState<string>('0');
  const [maxBudget, setMaxBudget] = useState<string>('1000000');

  const handleDistanceChange = (value: number[]) => {
    setMaxDistance(value[0]);
  };

  const handleApplyFilters = () => {
    onFilterChange(
      { 
        min: Number(minBudget) || 0,
        max: Number(maxBudget) || 1000000
      },
      maxDistance
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filter Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Budget Filter */}
          <div className="space-y-3">
            <h3 className="font-medium">Budget (IDR)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="min-budget">Minimum</Label>
                <Input
                  id="min-budget"
                  placeholder="0"
                  type="number"
                  value={minBudget}
                  onChange={(e) => setMinBudget(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="max-budget">Maximum</Label>
                <Input
                  id="max-budget"
                  placeholder="1000000"
                  type="number"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Distance Filter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Maximum Distance</h3>
              <span className="font-medium text-sm">{maxDistance} km</span>
            </div>
            <Slider 
              defaultValue={[50]} 
              max={100} 
              step={5} 
              onValueChange={handleDistanceChange} 
              className="py-2"
            />
          </div>

          <Button 
            onClick={handleApplyFilters}
            className="w-full bg-travel-600 hover:bg-travel-700"
          >
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;
