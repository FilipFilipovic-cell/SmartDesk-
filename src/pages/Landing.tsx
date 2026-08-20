import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import Problem from "../components/Problem";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import DashboardPreview from "../components/DashboardPreview";
import ROICalculator from "../components/ROICalculator";
import Pricing from "../components/Pricing";
import Testimonials from "../components/Testimonials";
import Security from "../components/Security";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="bg-[--bg]">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Problem />
        <HowItWorks />
        <Features />
        <DashboardPreview />
        <ROICalculator />
        <Pricing />
        <Testimonials />
        <Security />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
