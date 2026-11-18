import { BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import "../pages/Login.css";

const AuthStoryPanel = () => (
  <section className="login-story" aria-label="Paachcharam reading club">
    <div className="login-story-brand-row">
      <Link className="login-brand" to="/" aria-label="Kuviyam Publications home">
        <span className="login-brand-mark">
          <img src="/Paachcharam_logo_02.png" alt="" />
        </span>
        <span className="login-brand-copy">
          <strong>Kuviyam</strong>
          <span>PUBLICATIONS</span>
        </span>
      </Link>
      <span className="login-brand-tag">PAACHCHARAM</span>
    </div>

    <div className="login-story-copy">
      <p className="login-eyebrow"><Sparkles size={15} /> THE JOY OF READING</p>
      <h2>
        A little Tamil.
        <span>A lot of wonder.</span>
      </h2>
      <p className="login-story-description">
        Pick up where your family’s reading journey left off. There’s always
        another lovely story to discover.
      </p>
    </div>

    <div className="login-story-art" aria-label="Paachcharam Tamil children’s book">
      <div className="login-art-spark login-art-spark--one" aria-hidden="true">✦</div>
      <div className="login-art-spark login-art-spark--two" aria-hidden="true">✧</div>
      <div className="login-art-glow" aria-hidden="true" />
      <img
        className="login-book-cover"
        src="/Paachcharam_book.png"
        alt="Paachcharam Tamil children’s book cover with a colorful elephant and young readers"
      />
      <div className="login-story-note">
        <span className="login-story-note-icon"><BookOpen size={17} /></span>
        <span>
          <strong>Stories that stay with them</strong>
          <small>Rhymes · Wonder · Learning</small>
        </span>
      </div>
      <span className="login-art-caption">A LITTLE MAGIC ON EVERY PAGE</span>
    </div>

    <div className="login-story-footer" aria-hidden="true">
      <span>READ</span><i /><span>IMAGINE</span><i /><span>GROW</span>
    </div>
  </section>
);

export default AuthStoryPanel;
