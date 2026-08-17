import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="bg-pink-700 pt-12 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <h3 className="font-serif text-xl">Chat With Us</h3>
        <p className="mt-2 text-sm text-white/80">+91 95600 19819</p>
        <a
          href="https://api.whatsapp.com/send?phone=919560019819"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm hover:text-white/70"
          aria-label="Chat on WhatsApp"
        >
          <WhatsappLogoIcon size={22} />
          Message us on WhatsApp
        </a>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/20 px-6 py-6 text-xs text-white/70 md:flex-row">
        <p>&copy; {new Date().getFullYear()} Ranjana Jewellers. All Rights Reserved.</p>
        <a href="/terms" className="hover:text-white">
          Terms &amp; Conditions
        </a>
      </div>
    </footer>
  );
}
