import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe2,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const FORM_ENDPOINT = "https://formspree.io/f/mdaryvov";

const phrases = [
  "Welcome to a smarter digital system.",
  "Your visibility starts with clarity.",
  "We build systems that grow with your business.",
  "Let's map your next digital move.",
];

function Typewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[phraseIndex];
    const speed = deleting ? 35 : 58;

    const timer = setTimeout(() => {
      if (!deleting && text.length < phrase.length) {
        setText(phrase.slice(0, text.length + 1));
      } else if (!deleting && text.length === phrase.length) {
        setDeleting(true);
      } else if (deleting && text.length > 0) {
        setText(phrase.slice(0, text.length - 1));
      } else {
        setDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }
    }, deleting ? speed : text.length === phrase.length ? 1300 : speed);

    return () => clearTimeout(timer);
  }, [text, deleting, phraseIndex]);

  return (
    <span>
      {text}
      <span className="cursor">|</span>
    </span>
  );
}

function ToggleField({ name, label, placeholder }) {
  const [needsSetup, setNeedsSetup] = useState(false);

  return (
    <div className="field-group">
      <label>{label}</label>

      <div className="toggle-row">
        <button
          type="button"
          className={!needsSetup ? "choice active" : "choice"}
          onClick={() => setNeedsSetup(false)}
        >
          I already have one
        </button>

        <button
          type="button"
          className={needsSetup ? "choice active" : "choice"}
          onClick={() => setNeedsSetup(true)}
        >
          I need one created
        </button>
      </div>

      {needsSetup ? (
        <input type="hidden" name={name} value="Needs to be created" />
      ) : (
        <input name={name} type="url" placeholder={placeholder} />
      )}

      {needsSetup && (
        <p className="helper-text">
          Noted — this will be included in the setup assessment.
        </p>
      )}
    </div>
  );
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const scrollToForm = () => {
    setShowForm(true);

    setTimeout(() => {
      document
        .getElementById("discovery-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        alert(
          "There was an issue sending the form. Please try again or contact Solomough directly on WhatsApp."
        );
      }
    } catch {
      alert("Network error. Please try again.");
    }
  };

  return (
    <main>
      <section className="hero">
        <div className="orb orb-one"></div>
        <div className="orb orb-two"></div>

        <nav>
          <div className="brand-mini">
            <img src="/solomough-logo.png" alt="Solomough System logo" />
            <span>SOLOMOUGH SYSTEM</span>
          </div>

          <button className="nav-button" onClick={scrollToForm}>
            Start Discovery <ArrowRight size={16} />
          </button>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={15} />
              DIGITAL GROWTH DISCOVERY PORTAL
            </div>

            <h1>
              <Typewriter />
            </h1>

            <p>
              A focused starting point for businesses ready to improve their
              Google visibility, build authority online, and turn their digital
              presence into a practical growth system.
            </p>

            <div className="hero-actions">
              <button className="primary-button" onClick={scrollToForm}>
                Begin Your Discovery <ArrowRight size={18} />
              </button>

              <a className="text-link" href="#about">
                How this works <ChevronDown size={17} />
              </a>
            </div>
          </div>

          <div className="profile-card">
            <div className="profile-glow"></div>

            <img
              className="portrait"
              src="/solomon-portrait.jpg"
              alt="Solomon Moughkaa Zahemen"
            />

            <div className="profile-info">
              <p>YOUR DIGITAL PARTNER</p>
              <h3>Solomon Moughkaa Zahemen</h3>
              <span>Digital Expert · Web Developer · AI Engineer</span>
            </div>
          </div>
        </div>

        <div className="scroll-note">
          SCROLL TO EXPLORE <ChevronDown size={16} />
        </div>
      </section>

      <section id="about" className="section intro-section">
        <div className="section-label">WELCOME ABOARD</div>

        <h2>
          More than a website.
          <br />
          A system designed for growth.
        </h2>

        <p className="large-copy">
          At Solomough, we create high-performance digital systems that combine
          modern web development, AI automation, strategic content, and
          scalable digital infrastructure.
        </p>

        <div className="pillar-grid">
          <article>
            <Target />
            <h3>Strategic Growth</h3>
            <p>
              Aligning your digital footprint with long-term business goals.
            </p>
          </article>

          <article>
            <Sparkles />
            <h3>AI-Driven Efficiency</h3>
            <p>
              Building automation into systems so your business can work
              smarter.
            </p>
          </article>

          <article>
            <Globe2 />
            <h3>Digital Presence</h3>
            <p>
              Creating a premium online appearance that commands authority.
            </p>
          </article>

          <article>
            <Users />
            <h3>Scalable Systems</h3>
            <p>
              Practical technology designed to grow alongside your vision.
            </p>
          </article>
        </div>
      </section>

      <section className="section process-section">
        <div>
          <div className="section-label">WHAT HAPPENS NEXT</div>
          <h2>
            Your journey from scattered tools to a focused digital engine.
          </h2>
        </div>

        <div className="process-list">
          <div>
            <span>01</span>
            <div>
              <h3>Discovery & Alignment</h3>
              <p>
                We understand your business, market, audience, and current
                online footprint.
              </p>
            </div>
          </div>

          <div>
            <span>02</span>
            <div>
              <h3>System Strategy</h3>
              <p>
                We identify the best opportunities across Google, social
                platforms, website, and automation.
              </p>
            </div>
          </div>

          <div>
            <span>03</span>
            <div>
              <h3>Execution & Growth</h3>
              <p>
                We build and optimize a user-focused digital system for
                sustainable visibility and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {!showForm ? (
        <section className="cta-section">
          <Search size={34} />
          <h2>Ready to map your digital visibility?</h2>
          <p>
            Complete the discovery form and receive a clearer starting point
            for your business growth strategy.
          </p>

          <button className="primary-button" onClick={scrollToForm}>
            Open Discovery Form <ArrowRight size={18} />
          </button>
        </section>
      ) : (
        <section id="discovery-form" className="form-section">
          <div className="form-heading">
            <div className="section-label">CLIENT ONBOARDING</div>
            <h2>Tell us about your business.</h2>
            <p>
              Your answers help us research, assess, and recommend the right
              digital visibility strategy.
            </p>
          </div>

          {submitted ? (
            <div className="success-card">
              <CheckCircle2 size={58} />
              <h2>Discovery received.</h2>
              <p>
                Thank you for sharing your business details. Solomough System
                will review the information and follow up with the next steps.
              </p>

              <a
                className="primary-button"
                href="https://wa.me/2347076560169"
                target="_blank"
                rel="noreferrer"
              >
                Continue on WhatsApp <MessageCircle size={18} />
              </a>
            </div>
          ) : (
            <form onSubmit={submitForm}>
              <input
                type="hidden"
                name="_subject"
                value="New Solomough Digital Growth Discovery Submission"
              />

              <div className="progress-wrap">
                <div className="progress-top">
                  <span>Step {step} of 3</span>
                  <span>
                    {step === 1
                      ? "Business Profile"
                      : step === 2
                        ? "Digital Presence"
                        : "Growth Goals"}
                  </span>
                </div>

                <div className="progress-bar">
                  <span style={{ width: `${step * 33.33}%` }}></span>
                </div>
              </div>

              {step === 1 && (
                <div className="form-page">
                  <h3>Business Profile</h3>

                  <div className="form-grid">
                    <div className="field-group">
                      <label>Business name *</label>
                      <input
                        required
                        name="Business Name"
                        placeholder="Enter business name"
                      />
                    </div>

                    <div className="field-group">
                      <label>Business location(s) *</label>
                      <input
                        required
                        name="Business Locations"
                        placeholder="City, State, Country — include all branches"
                      />
                    </div>

                    <div className="field-group full">
                      <label>Website URL (if available)</label>
                      <input
                        name="Website URL"
                        type="url"
                        placeholder="https://yourbusiness.com"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-page">
                  <h3>Current Digital Presence</h3>

                  <p className="form-intro">
                    Select whether each account already exists or should be
                    included in your setup plan.
                  </p>

                  <ToggleField
                    name="Google Business Profile"
                    label="Google Business Profile"
                    placeholder="Paste your Google Business Profile link"
                  />

                  <ToggleField
                    name="Facebook Page"
                    label="Facebook Page"
                    placeholder="Paste Facebook page link"
                  />

                  <ToggleField
                    name="Instagram Page"
                    label="Instagram Page"
                    placeholder="Paste Instagram profile link"
                  />

                  <ToggleField
                    name="LinkedIn Page"
                    label="LinkedIn Page"
                    placeholder="Paste LinkedIn page link"
                  />

                  <div className="field-group">
                    <label>Other social media accounts</label>
                    <textarea
                      name="Other Social Accounts"
                      placeholder="TikTok, X, YouTube, WhatsApp Business, Pinterest, or any other relevant platforms"
                    ></textarea>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-page">
                  <h3>Products, Audience & Growth Goals</h3>

                  <div className="field-group">
                    <label>What products or services do you offer? *</label>
                    <textarea
                      required
                      name="Products and Services"
                      placeholder="For example: electrical wiring materials, circuit breakers, sockets, switches, cables, fans, home appliances, installation services, repairs, etc."
                    ></textarea>

                    <p className="helper-text">
                      Include your best-selling products, brands you carry,
                      services offered, and what makes your business different.
                    </p>
                  </div>

                  <div className="field-group">
                    <label>Product images or catalogue link (optional)</label>
                    <input
                      name="Product Images"
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                    />

                    <p className="helper-text">
                      You can upload images if available, or paste a Google
                      Drive / catalogue link below.
                    </p>

                    <input
                      name="Catalogue Link"
                      type="url"
                      placeholder="Google Drive, Dropbox, catalogue, or product image link"
                    />
                  </div>

                  <div className="field-group">
                    <label>Target locations and audience *</label>
                    <textarea
                      required
                      name="Target Locations and Audience"
                      placeholder="For example: We want customers in Abuja, Wuse, Garki, Kubwa, and nearby areas. Our ideal customers include homeowners, electricians, contractors, property developers, and appliance buyers."
                    ></textarea>

                    <p className="helper-text">
                      Mention specific cities, neighbourhoods, states, customer
                      types, or industries you want to reach.
                    </p>
                  </div>

                  <div className="field-group">
                    <label>Primary goals *</label>

                    <div className="goal-grid">
                      {[
                        "More Google visibility",
                        "More leads / enquiries",
                        "More phone calls",
                        "More website traffic",
                        "More local customers",
                        "Social media growth",
                        "Need a professional website",
                        "Need Google Business Profile setup",
                      ].map((goal) => (
                        <label className="check-option" key={goal}>
                          <input
                            type="checkbox"
                            name="Primary Goals"
                            value={goal}
                          />
                          <span>{goal}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="field-group">
                    <label>Anything else we should know?</label>
                    <textarea
                      name="Additional Notes"
                      placeholder="Tell us about your current challenges, competitors, timeline, budget range if you wish, or any important details."
                    ></textarea>
                  </div>

                  <label className="consent">
                    <input
                      required
                      type="checkbox"
                      name="Consent"
                      value="Client confirms submitted information is accurate and authorizes initial digital presence research."
                    />
                    <span>
                      I confirm that the information provided is accurate and I
                      authorize Solomough System to conduct an initial review of
                      my business&apos;s digital presence.
                    </span>
                  </label>
                </div>
              )}

              <div className="form-navigation">
                {step > 1 && (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </button>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => setStep(step + 1)}
                  >
                    Continue <ArrowRight size={18} />
                  </button>
                ) : (
                  <button className="primary-button" type="submit">
                    Send Discovery Details <Send size={18} />
                  </button>
                )}
              </div>
            </form>
          )}
        </section>
      )}

      <footer>
        <div>
          <img src="/solomough-logo.png" alt="" />
          <span>SOLOMOUGH SYSTEM</span>
        </div>

        <p>Building intelligent digital systems for scalable growth.</p>

        <div className="footer-links">
          <a
            href="https://wa.me/2347076560169"
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} /> WhatsApp
          </a>

          <a
            href="https://www.facebook.com/Solomough3"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
      </footer>
    </main>
  );
}

export default App;
