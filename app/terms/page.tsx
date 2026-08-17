import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Terms & Conditions — Ranjana Jewellers",
};

export default async function TermsPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from("categories").select("id, name").order("name");

  return (
    <div>
      <NavBar categories={categories ?? []} />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-4xl text-ink">Terms &amp; Conditions</h1>
        <p className="mt-2 text-sm text-ink/60">Last updated: August 2026</p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink/80">
          <section>
            <h2 className="font-serif text-xl text-ink">1. About This Website</h2>
            <p className="mt-2">
              This website is a catalog for Ranjana Jewellers, showcasing our jewellery, silver articles, and pooja
              essentials. It is not a transactional e-commerce store — there is no online cart, checkout, or payment
              gateway. All enquiries, pricing discussions, and orders are conducted directly over WhatsApp or in
              person at our store.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">2. Pricing</h2>
            <p className="mt-2">
              Prices are not displayed on this website, as they vary with prevailing gold/silver rates, making
              charges, and gemstone valuations at the time of purchase. Final pricing is shared directly with you
              over WhatsApp or in-store and is subject to confirmation before any order is placed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">3. Product Images</h2>
            <p className="mt-2">
              We try to represent our jewellery as accurately as possible. However, due to photography lighting and
              individual screen/display differences, actual colour, finish, and size may vary slightly from what is
              shown here. Handmade and gemstone pieces may also carry natural variations, which are not defects.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">4. Orders &amp; Enquiries</h2>
            <p className="mt-2">
              Clicking &quot;Enquire Now&quot; or &quot;Connect on WhatsApp&quot; opens a chat with our team — it does
              not place an order. Orders are confirmed only after we&apos;ve discussed availability, pricing, and
              delivery/pickup details with you directly.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">5. Returns &amp; Exchanges</h2>
            <p className="mt-2">
              Our return, exchange, and warranty terms are communicated at the time of purchase and may vary by
              product category. Please ask us directly over WhatsApp or in-store for the terms applicable to your
              purchase before confirming an order.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">6. Intellectual Property</h2>
            <p className="mt-2">
              All product photography, branding, and content on this website belong to Ranjana Jewellers and may not
              be reproduced or reused without permission.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">7. Governing Law</h2>
            <p className="mt-2">
              These terms are governed by the laws of India. Any disputes are subject to the jurisdiction of the
              courts where Ranjana Jewellers is registered.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-ink">8. Contact Us</h2>
            <p className="mt-2">
              For any questions about these terms, or about a specific product or order, please reach out to us on
              WhatsApp at{" "}
              <a
                href="https://api.whatsapp.com/send?phone=919560019819"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-700 underline"
              >
                +91 95600 19819
              </a>
              .
            </p>
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}
