import { Button } from "@/components/ui/button";
import { Smartphone, Apple } from "lucide-react";

export default function DownloadApp() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Download Our App</h2>
              <p className="text-xl opacity-90 mb-8">Get exclusive deals, faster ordering, and real-time tracking with our mobile app</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-animate bg-white text-dark px-6 py-3 rounded-xl font-medium flex items-center justify-center hover:bg-gray-100">
                  <Apple className="w-8 h-8 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </Button>
                <Button className="btn-animate bg-white text-dark px-6 py-3 rounded-xl font-medium flex items-center justify-center hover:bg-gray-100">
                  <Smartphone className="w-8 h-8 mr-3" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600" 
                alt="Mobile app mockup interface" 
                className="floating-animation max-w-sm mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
