import { ArrowRight, BookOpen, Heart, Languages, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageIntro from "../components/PageIntro";

const principles = [
  {
    icon: Languages,
    title: "Rooted in Tamil",
    description: "Our books invite children to explore Tamil language and culture through rhymes, stories, and pictures.",
    tone: "bg-brand-purple-50 text-brand-purple-800",
  },
  {
    icon: BookOpen,
    title: "Made for little readers",
    description: "Clear illustrations and playful details give young readers room to look, listen, and discover.",
    tone: "bg-brand-gold-50 text-brand-gold-700",
  },
  {
    icon: Heart,
    title: "Reading together",
    description: "A shared story can turn a few quiet minutes into a warm part of the everyday routine.",
    tone: "bg-brand-teal-50 text-brand-teal-800",
  },
];

const About = () => (
  <div className="min-h-screen bg-[#f8f6f0]">
    <Navbar />

    <main className="pb-20">
      <PageIntro
        icon={Sparkles}
        eyebrow="ABOUT KUVIYAM PUBLICATIONS"
        title="Tamil stories for"
        highlight="curious little minds."
        description="We create books that bring Tamil rhymes, stories, and early learning into a child’s everyday reading."
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[1.08fr_.92fr] lg:gap-8 lg:px-10" aria-labelledby="about-story-title">
        <div className="flex flex-col justify-center rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-9 lg:p-11">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple-800">Our purpose</p>
          <h2 id="about-story-title" className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-4xl">
            Make Tamil reading feel like play.
          </h2>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Kuviyam Publications brings together children’s books that make room for language, imagination, and shared discovery. Our Paachcharam collection includes Tamil rhymes and stories designed to invite young readers into the page.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            We believe a child’s first experiences with books can be joyful and memorable. Each story is an opportunity to spend time together and let curiosity lead.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/shop"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-purple-800 px-5 py-3 font-semibold text-white transition hover:bg-brand-purple-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
            >
              Explore the books <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-brand-purple-300 hover:bg-brand-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-purple-800"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <div className="relative isolate flex min-h-[360px] items-center justify-center overflow-hidden rounded-[28px] border border-brand-gold-100 bg-gradient-to-br from-brand-gold-50 via-white to-brand-teal-50 p-8 sm:min-h-[440px]">
          <div aria-hidden="true" className="absolute left-8 top-8 h-24 w-24 rounded-full border border-brand-gold-300/70" />
          <div aria-hidden="true" className="absolute bottom-8 right-8 h-40 w-40 rounded-full border border-brand-teal-200/80" />
          <div className="relative flex h-full w-full max-w-sm items-center justify-center">
            <img
              src="/Paachcharam_book.png"
              alt="Paachcharam Tamil children’s storybook"
              loading="lazy"
              className="max-h-[360px] w-full object-contain drop-shadow-[0_24px_28px_rgba(45,31,62,0.16)]"
            />
            <div className="absolute bottom-1 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white bg-white/95 px-4 py-2 text-sm font-semibold text-brand-purple-900 shadow-lg">
              <BookOpen size={16} className="text-brand-teal-700" aria-hidden="true" />
              Stories for growing minds
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-5 sm:mt-20 sm:px-8 lg:px-10" aria-labelledby="about-values-title">
        <header className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-purple-800">What guides us</p>
          <h2 id="about-values-title" className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">A thoughtful start to every story</h2>
          <p className="mt-3 leading-7 text-slate-600">The ideas behind the books we make and the reading moments we hope to share.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {principles.map(({ icon: Icon, title, description, tone }) => (
            <article key={title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}>
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default About;
