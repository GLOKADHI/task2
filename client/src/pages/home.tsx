import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Categories from "@/components/sections/categories";
import Restaurants from "@/components/sections/restaurants";
import PopularDishes from "@/components/sections/popular-dishes";
import HowItWorks from "@/components/sections/how-it-works";
import Testimonials from "@/components/sections/testimonials";
import DownloadApp from "@/components/sections/download-app";
import AddressDisplay from "@/components/address/address-display";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-4">
        <AddressDisplay />
      </div>
      <Categories />
      <Restaurants />
      <PopularDishes />
      <HowItWorks />
      <Testimonials />
      <DownloadApp />
      <Footer />
    </div>
  );
}
