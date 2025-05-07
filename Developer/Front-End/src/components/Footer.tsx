
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-travel-600">
              Travel<span className="text-yogya-500">Mate</span>
            </h3>
            <p className="text-sm text-gray-600">
              Find the perfect destination in Yogyakarta that fits your budget and preferences.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Destinations</h3>
            <ul className="space-y-2">
              {['Popular Places', 'Budget Friendly', 'Family Spots', 'Cultural Heritage'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-travel-600">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Resources</h3>
            <ul className="space-y-2">
              {['Travel Guide', 'Cost Calculator', 'Trip Planner', 'Travel Tips'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-travel-600">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Contact</h3>
            <ul className="space-y-2">
              {['About Us', 'Support', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Button variant="link" className="p-0 h-auto text-gray-600 hover:text-travel-600">
                    {item}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-sm text-center text-gray-500">
            © {new Date().getFullYear()} TravelMate. Created by Team CC25-CF064.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
