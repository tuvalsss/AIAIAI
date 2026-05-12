import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Demo from "@/components/sections/Demo";
import WhyUs from "@/components/sections/WhyUs";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import ClientOnlyComponents from "@/components/ClientOnlyComponents";
import { AboutProvider } from "@/components/layout/AboutContext";

export default function HomePage() {
  return (
    <AboutProvider>
      <ClientOnlyComponents />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Demo />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </AboutProvider>
  );
}
