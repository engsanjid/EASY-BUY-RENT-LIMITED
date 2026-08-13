import Navbar from "@/components/website/Navbar";
import Hero from "@/components/website/Hero";
import FeaturedCategories from "@/components/website/FeaturedCategories";
import FeaturedVehicles from "@/components/website/FeaturedVehicles";
import WhyChooseUs from "@/components/website/WhyChooseUs";
import FeaturedBrands from "@/components/website/FeaturedBrands";
import About from "@/components/website/About";
import Testimonials from "@/components/website/Testimonials";
import CTASection from "@/components/website/CTASection";
import ContactSection from "@/components/website/ContactSection";
import Footer from "@/components/website/Footer";

export default function HomePage() {
  return (
    <>
      {/* Public Website Navbar */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Car / Bike Categories */}
        <FeaturedCategories />

        {/* Featured Vehicles
            - 4 Bikes
            - 4 Cars
            - Filter: All / Cars / Bikes
        */}
        <FeaturedVehicles />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* Featured Brands */}
        <FeaturedBrands />

        {/* About Company */}
        <About />

        {/* Customer Testimonials */}
        <Testimonials />

        {/* Call To Action */}
        <CTASection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Public Website Footer */}
      <Footer />
    </>
  );
}