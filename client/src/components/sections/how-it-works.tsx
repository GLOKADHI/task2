import { Search, Utensils, Bike } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Choose Restaurant",
      description: "Browse through hundreds of restaurants and pick your favorite"
    },
    {
      number: 2,
      icon: Utensils,
      title: "Select Food",
      description: "Choose from our delicious menu options and add to cart"
    },
    {
      number: 3,
      icon: Bike,
      title: "Fast Delivery",
      description: "Get your hot, fresh food delivered to your door in 30 minutes"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl opacity-90">Simple steps to get your favorite food</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="relative inline-block mb-6">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-2 -right-2 bg-accent text-dark w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="opacity-90">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
