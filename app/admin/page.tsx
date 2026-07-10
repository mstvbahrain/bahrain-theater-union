import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminPanel from '@/components/AdminPanel';

export default function AdminPage() {
  return (
    <main className="bg-cream">
      <Navbar />
      <AdminPanel />
      <Footer />
    </main>
  );
}
