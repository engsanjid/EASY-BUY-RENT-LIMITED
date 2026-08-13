import Hero from "@/components/website/Hero";
import FeaturedCategories from "@/components/website/FeaturedCategories";
import FeaturedVehicles from "@/components/website/FeaturedVehicles";
import WhyChooseUs from "@/components/website/WhyChooseUs";
import FeaturedBrands from "@/components/website/FeaturedBrands";
import About from "@/components/website/About";
import Testimonials from "@/components/website/Testimonials";
import CTASection from "@/components/website/CTASection";
import ContactSection from "@/components/website/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />

      <FeaturedCategories />

      <FeaturedVehicles />

      <WhyChooseUs />

      <FeaturedBrands />

      <About />

      <Testimonials />

      <CTASection />

      <ContactSection />
    </>
  );
}