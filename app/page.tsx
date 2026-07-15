import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HomeUpdatesSlider from '@/components/HomeUpdatesSlider';
import FeaturedSocialVideo from '@/components/FeaturedSocialVideo';
import MembersSection from '@/components/MembersSection';
import AboutPreview from '@/components/AboutPreview';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HomeUpdatesSlider />
      <FeaturedSocialVideo />
      <MembersSection />
      <AboutPreview />
      <ContactSection />
      <Footer />
    </main>
  );
}
