import { useState } from "react";
import { LoaderCircle, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageIntro from "../components/PageIntro";
import { contactAPI } from "../utils/api";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "support@kuviyampublications.com",
    href: "mailto:support@kuviyampublications.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 9600021480",
    href: "tel:+919600021480",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Tiruchirappalli, Tamil Nadu, India",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      await contactAPI.sendMessage(formData);
      toast.success("Your message was sent successfully.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Your message could not be sent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0]">
      <Navbar />

      <main className="pb-20">
        <PageIntro
          icon={Sparkles}
          eyebrow="CONTACT KUVIYAM PUBLICATIONS"
          title="We’d love to hear"
          highlight="from you."
          description="Questions about a book or an order? Get in touch with our team using the details below or send us a note."
        />

        <section className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-8 lg:px-10" aria-label="Contact Kuviyam Publications">
          <aside className="relative isolate overflow-hidden rounded-[28px] bg-brand-purple-900 p-6 text-white shadow-xl sm:p-8 lg:p-10">
            <div aria-hidden="true" className="absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-brand-purple-500/40 blur-3xl" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-20 -z-10 h-64 w-64 rounded-full bg-brand-teal-500/25 blur-3xl" />

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-gold-300">Say hello</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Talk with our team</h2>
            <p className="mt-4 max-w-md leading-7 text-white/75">
              We’re happy to help with questions about our Tamil books, your order, or working with Kuviyam Publications.
            </p>

            <div className="mt-8 space-y-3">
              {contactMethods.map(({ icon: Icon, label, value, href }) => {
                const Content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-gold-200">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{label}</span>
                      <span className="mt-1 block break-words font-semibold text-white">{value}</span>
                    </span>
                  </>
                );

                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:border-white/20 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {Content}
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    {Content}
                  </div>
                );
              })}
            </div>
          </aside>

          <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10" aria-labelledby="contact-form-title">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-teal-50 text-brand-teal-800">
                <Mail size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 id="contact-form-title" className="text-2xl font-semibold text-slate-950 sm:text-3xl">Send us a message</h2>
                <p className="mt-2 leading-7 text-slate-600">Fill in the form and our team will receive your message.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} aria-busy={loading} className="mt-7 space-y-5">
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-slate-800">Full name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={120}
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-purple-700 focus:ring-2 focus:ring-brand-purple-100 disabled:bg-slate-50"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-slate-800">Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={254}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-purple-700 focus:ring-2 focus:ring-brand-purple-100 disabled:bg-slate-50"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-slate-800">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  maxLength={2000}
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-purple-700 focus:ring-2 focus:ring-brand-purple-100 disabled:bg-slate-50"
                />
                <p className="mt-1 text-right text-xs text-slate-500">{formData.message.length}/2000</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-purple-800 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-brand-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
              >
                {loading ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
                {loading ? "Sending…" : "Send message"}
              </button>
            </form>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
