import { ArrowRight, ArrowUpRight, BookOpen, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Shop all books", to: "/shop" },
  { label: "Our gallery", to: "/gallery" },
  { label: "Stories & journal", to: "/blog" },
  { label: "About Kuviyam", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => (
  <footer className="site-footer">
    <div className="site-footer-glow site-footer-glow--left" aria-hidden="true" />
    <div className="site-footer-glow site-footer-glow--right" aria-hidden="true" />

    <div className="footer-container">
      <section className="footer-feature-card" aria-labelledby="footer-feature-heading">
        <div className="footer-feature-copy">
          <p className="footer-kicker"><Sparkles size={15} /> FOR CURIOUS LITTLE READERS</p>
          <h2 id="footer-feature-heading">One more story.<br /><em>A whole new world.</em></h2>
          <p>Bring joyful Tamil reading into their everyday, one lovely book at a time.</p>
          <Link to="/shop" className="footer-feature-button">
            Find their next favourite <ArrowRight size={17} />
          </Link>
        </div>

        <div className="footer-feature-art" aria-hidden="true">
          <span className="footer-feature-orbit footer-feature-orbit--one" />
          <span className="footer-feature-orbit footer-feature-orbit--two" />
          <span className="footer-feature-star footer-feature-star--one">✦</span>
          <span className="footer-feature-star footer-feature-star--two">✧</span>
          <img src="/Paachcharam_book.png" alt="" />
          <span className="footer-feature-pill"><BookOpen size={15} /> Tamil stories for little minds</span>
        </div>
      </section>

      <div className="footer-main-grid">
        <section className="footer-brand-column" aria-label="About Paachcharam">
          <Link to="/" className="footer-brand" aria-label="Paachcharam home">
            <span className="footer-brand-mark"><img src="/Paachcharam_logo_02.png" alt="" /></span>
            <span className="footer-brand-name">
              <strong>Paachcharam</strong>
              <small>by Kuviyam Publications</small>
            </span>
          </Link>
          <p className="footer-brand-description">
            Inspiring little learners to discover Tamil through joyful rhymes,
            memorable stories, and books made for growing minds.
          </p>
          <div className="footer-values" aria-label="What we make">
            <span>Made with care</span>
            <span>Made for little readers</span>
          </div>
        </section>

        <nav className="footer-column" aria-label="Explore Kuviyam">
          <h3>Explore</h3>
          <ul className="footer-link-list">
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>
                  <span>{item.label}</span>
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="footer-column" aria-labelledby="footer-contact-heading">
          <h3 id="footer-contact-heading">We’re here to help</h3>
          <div className="footer-contact-list">
            <a href="mailto:support@kuviyampublications.com" className="footer-contact-link">
              <span className="footer-contact-icon"><Mail size={16} /></span>
              <span><small>Email us</small><strong>support@kuviyampublications.com</strong></span>
            </a>
            <a href="tel:+919600021480" className="footer-contact-link">
              <span className="footer-contact-icon"><Phone size={16} /></span>
              <span><small>Call us</small><strong>+91 9600021480</strong></span>
            </a>
            <div className="footer-contact-link footer-location">
              <span className="footer-contact-icon"><MapPin size={16} /></span>
              <span><small>Find us</small><strong>Tiruchirappalli, Tamil Nadu</strong></span>
            </div>
          </div>
        </section>

        <section className="footer-column footer-community" aria-labelledby="footer-community-heading">
          <h3 id="footer-community-heading">Say hello</h3>
          <p>Need help choosing a book or have a question about an order? We’d love to help.</p>
          <a
            href="https://wa.me/919600021480"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp-link"
            aria-label="Chat with Kuviyam Publications on WhatsApp"
          >
            <span className="footer-whatsapp-icon"><FaWhatsapp size={20} aria-hidden="true" /></span>
            <span><strong>Chat with our team</strong><small>We’re happy to help</small></span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <span className="footer-community-note">A friendly reply, whenever we can.</span>
        </section>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Kuviyam Publications. All rights reserved.</p>
        <p className="footer-bottom-note"><span /> Thoughtful stories for growing minds.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
