import Navbar from '@/components/Navbar';
import MembersSection from '@/components/MembersSection';
import Footer from '@/components/Footer';

export default function MembersPage() {
  return (
    <main>
      <Navbar />
      <div className="bg-oliveDark px-5 pb-16 pt-36 text-center text-white">
        <p className="text-sm uppercase tracking-[0.3em] text-gold">Members</p>
        <h1 className="mt-4 font-heading text-5xl md:text-7xl">Current Members</h1>
      </div>
      <MembersSection />
      <Footer />
    </main>
  );
}
