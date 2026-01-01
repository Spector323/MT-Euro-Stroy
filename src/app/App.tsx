import { Routes, Route } from "react-router-dom";
import { Hero } from "./components/Hero";
import { FeaturedProperties } from "./components/FeaturedProperties";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { PropertyPage } from "./pages/PropertyPage";

function HomePage() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <Hero />
      <FeaturedProperties />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/properties/:id" element={<PropertyPage />} />
    </Routes>
  );
}
