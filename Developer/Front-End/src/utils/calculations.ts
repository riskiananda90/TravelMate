
/**
 * Calculates the distance between two sets of coordinates using the Haversine formula
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

/**
 * Converts degrees to radians
 */
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Calculates rough travel cost based on distance
 * Simple approximation: base fee + per km charge
 */
export function calculateTravelCost(distance: number): number {
  const baseFee = 10000; // Base fee in IDR
  const perKmCharge = 2000; // Cost per km in IDR
  
  return Math.round(baseFee + distance * perKmCharge);
}

/**
 * Calculates total estimated cost for a destination
 */
export function getTotalCost(
  entranceFee: number,
  foodCost: number,
  accommodationCost: number,
  travelCost?: number
): number {
  let total = entranceFee + foodCost + accommodationCost;
  
  if (travelCost) {
    total += travelCost;
  }
  
  return total;
}

/**
 * Formats currency in Indonesian Rupiah
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Format currency in a shortened format for more compact display
 */
export function formatCurrency(amount: number): string {
  if (amount >= 1000000) {
    return `Rp${(amount / 1000000).toFixed(1)}jt`;
  } else if (amount >= 1000) {
    return `Rp${(amount / 1000).toFixed(0)}rb`;
  } else {
    return `Rp${amount}`;
  }
}
