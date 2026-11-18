import { Mail, MapPin, Phone } from "lucide-react";

const Header = () => (
  <header className="bg-brand-purple-900 text-white">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-2.5 text-xs sm:flex-row sm:px-6 sm:text-sm">
      <p className="inline-flex items-center gap-2 text-white/80">
        <MapPin size={14} aria-hidden="true" />
        Tiruchirappalli, Tamil Nadu
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
        <a
          href="mailto:support@kuviyampublications.com"
          className="inline-flex items-center gap-2 text-white/90 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Mail size={14} aria-hidden="true" />
          support@kuviyampublications.com
        </a>
        <a
          href="tel:+919600021480"
          className="inline-flex items-center gap-2 text-white/90 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Phone size={14} aria-hidden="true" />
          +91 9600021480
        </a>
      </div>
    </div>
  </header>
);

export default Header;
