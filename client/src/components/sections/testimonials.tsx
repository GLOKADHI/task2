import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Mike Johnson",
      role: "Verified Customer",
      rating: 5,
      comment: "Amazing service! Food arrived hot and fresh, exactly as ordered. The app is so easy to use.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Verified Customer",
      rating: 5,
      comment: "Best food delivery app ever! Great variety of restaurants and super fast delivery times.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      id: 3,
      name: "David Chen",
      role: "Verified Customer",
      rating: 5,
      comment: "Excellent customer service and quality food. I order from FoodieHub at least 3 times a week!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark dark:text-white mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Real reviews from real people</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-accent">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{testimonial.rating}.0</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="font-semibold text-dark dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
