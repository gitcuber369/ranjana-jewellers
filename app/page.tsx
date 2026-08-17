import NavBar from "@/components/NavBar";
import PromoBanner from "@/components/PromoBanner";
import HeroBanner from "@/components/HeroBanner";
import RakhiSection from "@/components/RakhiSection";
import ProductsSection from "@/components/ProductsSection";
import CollectionsSection from "@/components/CollectionsSection";
import CategoryShortcuts from "@/components/CategoryShortcuts";
import TrendingSection from "@/components/TrendingSection";
import OccasionGrid from "@/components/OccasionGrid";
import DarkPromoBanner from "@/components/DarkPromoBanner";
import CuratedForYouSection from "@/components/CuratedForYouSection";
import MosaicGallery from "@/components/MosaicGallery";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("id, name").order("name");

  return (
    <div>
      <NavBar categories={categories ?? []} />
      <PromoBanner />
      <HeroBanner />
      <RakhiSection />
      <ProductsSection />
      <MosaicGallery />
      <CollectionsSection />
      <CategoryShortcuts />
      <TrendingSection />
      <OccasionGrid />
      <DarkPromoBanner />
      <CuratedForYouSection />
      <Footer />
    </div>
  );
}
