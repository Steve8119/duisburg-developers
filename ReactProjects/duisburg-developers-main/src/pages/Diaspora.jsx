
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Building2,
  ClipboardCheck,
  FileCheck,
  Wallet,
  Eye,
  Globe2,
  HardHat,
  Camera,
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  Send,
  Ruler,
  FileText,
  Clock,
  AlertTriangle,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import "./Diaspora.css";

const risks = [
  {
    icon: MapPin,
    title: "Land Ownership Concerns",
    description:
      "Buying land without proper verification can expose you to ownership disputes, boundary issues and unexpected legal complications.",
  },
  {
    icon: Wallet,
    title: "Unplanned Expenditure",
    description:
      "Without proper project planning and cost estimates, construction expenses can increase beyond the original budget.",
  },
  {
    icon: HardHat,
    title: "Poor Workmanship",
    description:
      "When you cannot regularly visit the site, it can be difficult to monitor construction quality and ensure work follows the agreed plans.",
  },
  {
    icon: FileText,
    title: "Lack of Documentation",
    description:
      "Unclear agreements, missing drawings and poorly documented payments can make it difficult to track project decisions.",
  },
  {
    icon: Clock,
    title: "Project Delays",
    description:
      "Poor coordination, material shortages and inadequate supervision can affect construction schedules.",
  },
  {
    icon: ShieldCheck,
    title: "Limited Accountability",
    description:
      "Without clear responsibilities, reporting and communication, it becomes difficult to know how your project is progressing.",
  },
];

const planningSteps = [
  {
    number: "01",
    title: "Land & Site Assessment",
    icon: MapPin,
    description:
      "Begin with an understanding of your property, location, site conditions and development objectives. Independent legal verification and professional due diligence are important before committing to a land purchase.",
    points: [
      "Understand the property location and access",
      "Arrange appropriate land ownership verification",
      "Assess site conditions and development suitability",
      "Understand applicable planning requirements",
    ],
  },
  {
    number: "02",
    title: "Architectural Design & Planning",
    icon: Ruler,
    description:
      "Translate your ideas into practical building designs. Discuss your preferred layout, building style, space requirements and functionality before proceeding with construction.",
    points: [
      "Architectural drawings and design development",
      "Structural and engineering coordination",
      "Design reviews and revisions",
      "3D visualisation where required",
    ],
  },
  {
    number: "03",
    title: "Budgeting & Cost Planning",
    icon: Wallet,
    description:
      "Understand the financial requirements of your project before construction begins. A properly prepared cost plan helps you make informed decisions about scope, materials and project priorities.",
    points: [
      "Preparation of Bills of Quantities where applicable",
      "Construction cost planning",
      "Material and finishing considerations",
      "Project budget and contingency planning",
    ],
  },
  {
    number: "04",
    title: "Approvals & Documentation",
    icon: FileCheck,
    description:
      "Understand the documentation and statutory approvals required for your project. The relevant professionals and authorities should be involved at the appropriate stages.",
    points: [
      "Building plan documentation",
      "Relevant county approval processes",
      "Project scope and specifications",
      "Contracts and project documentation",
    ],
  },
  {
    number: "05",
    title: "Construction & Supervision",
    icon: HardHat,
    description:
      "With planning in place, construction can proceed through coordinated implementation, supervision and communication, with attention to the agreed design and project requirements.",
    points: [
      "Construction coordination",
      "Site supervision and progress monitoring",
      "Quality checks at relevant stages",
      "Project updates and documentation",
    ],
  },
];

const remoteBenefits = [
  {
    icon: Camera,
    title: "Visual Progress Updates",
    description:
      "Receive photographs and videos that help you follow the progress of work on site.",
  },
  {
    icon: Eye,
    title: "Site Monitoring",
    description:
      "Stay informed about construction activities, completed stages and outstanding work.",
  },
  {
    icon: Globe2,
    title: "Remote Consultations",
    description:
      "Discuss designs, project decisions and progress through convenient online meetings.",
  },
  {
    icon: FileText,
    title: "Project Documentation",
    description:
      "Keep important project information, drawings and agreed updates organised.",
  },
];

const process = [
  {
    number: "01",
    title: "Initial Consultation",
    description:
      "Tell us where you are, what you intend to build and what you want to achieve.",
  },
  {
    number: "02",
    title: "Project Assessment",
    description:
      "We discuss your site, requirements, project scope and the professional services needed.",
  },
  {
    number: "03",
    title: "Design & Planning",
    description:
      "Develop the drawings, specifications and cost planning required for your project.",
  },
  {
    number: "04",
    title: "Project Preparation",
    description:
      "Coordinate relevant documentation, approvals, resources and implementation arrangements.",
  },
  {
    number: "05",
    title: "Construction & Monitoring",
    description:
      "Proceed with the agreed construction activities, coordination and progress communication.",
  },
  {
    number: "06",
    title: "Review & Handover",
    description:
      "Review completed works, address outstanding items and coordinate the handover process.",
  },
];

const checklist = [
  "Land ownership and property details have been verified",
  "Site assessment has been undertaken",
  "Project requirements and scope are clearly defined",
  "Architectural drawings have been prepared",
  "Relevant engineering input has been considered",
  "Cost estimates and project budget have been reviewed",
  "Relevant statutory approvals have been addressed",
  "Project agreements and responsibilities are documented",
  "Construction programme and reporting arrangements are agreed",
  "Payment arrangements are clearly documented",
];

const faqs = [
  {
    question: "Can I build a house in Kenya while living abroad?",
    answer:
      "Yes. You can coordinate many stages of a construction project remotely through professional consultations, digital drawings, documented decisions, site updates and an agreed project management arrangement. The exact level of remote support depends on the scope of your project.",
  },
  {
    question: "Can Duisburg Developers help me with architectural designs?",
    answer:
      "We provide drawings and design services as part of our construction and development offering. The specific professional services required will depend on your project. Where statutory professional approvals are required, appropriately qualified and registered professionals should be engaged.",
  },
  {
    question: "Can you help me estimate the cost of building?",
    answer:
      "Yes. Project costs depend on location, building size, design, specifications, materials and site conditions. We can discuss your requirements and the appropriate cost planning or Bill of Quantities services for your project.",
  },
  {
    question: "Do I need to own land before contacting you?",
    answer:
      "No. You can contact us while you are still exploring land or considering a development opportunity. We can discuss your intended project and the assessments or professional support you may need before proceeding.",
  },
  {
    question: "How will I monitor my project from abroad?",
    answer:
      "Remote communication can include scheduled online consultations, photographs, videos, progress discussions and project documentation. The reporting arrangements should be agreed at the beginning of the engagement.",
  },
  {
    question: "Which parts of Kenya do you serve?",
    answer:
      "Share your preferred project location with us. We can discuss the location, scope and practical arrangements before confirming the services we can undertake.",
  },
  {
    question: "Can I start with design services only?",
    answer:
      "Yes. You may engage us for design-related services without necessarily engaging us for the construction phase. The scope and deliverables can be discussed during your consultation.",
  },
  {
    question: "How do I get started?",
    answer:
      "Complete the enquiry form on this page or contact our team through WhatsApp or telephone. Tell us about your project, location and plans, and we will get in touch to discuss the next steps.",
  },
];

function Diaspora() {
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const closeMenu = () => setMobileMenu(false);

  const submitEnquiry = async (event) => {
    event.preventDefault();

    setLoading(true);
    setFeedback("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const { error } = await supabase
        .from("diaspora_enquiries")
        .insert([
          {
            full_name: data.get("full_name"),
            country: data.get("country"),
            email: data.get("email"),
            whatsapp: data.get("whatsapp"),
            project_type: data.get("project_type"),
            project_location: data.get("project_location"),
            budget: data.get("budget"),
            message: data.get("message"),
            status: "new",
          },
        ]);

      if (error) throw error;

      setFeedback(
        "Thank you for contacting Duisburg Developers. Your enquiry has been received."
      );

      form.reset();
    } catch (error) {
      console.error("Diaspora enquiry error:", error);
      setFeedback(
        "Your enquiry could not be submitted. Please try again or contact us on WhatsApp."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diaspora-page">

      {/* HEADER */}
      <header className="diaspora-header">
        <div className="diaspora-nav-container">

          <Link to="/" className="diaspora-brand" onClick={closeMenu}>
            <img src="/logo.png" alt="Duisburg Developers Ltd" />

            <span>
              <strong>DUISBURG</strong>
              <small>DEVELOPERS LTD</small>
            </span>
          </Link>

          <button
            className="diaspora-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

          <nav className={mobileMenu ? "diaspora-nav open" : "diaspora-nav"}>
            <Link to="/" onClick={closeMenu}>Home</Link>
            <Link to="/services" onClick={closeMenu}>Our Services</Link>
            <Link to="/diaspora" onClick={closeMenu}>Diaspora</Link>
            <Link to="/#contact" onClick={closeMenu}>Contact</Link>
          </nav>

          <a href="tel:0728329330" className="diaspora-header-contact">
            <Phone size={17} />
            0728 329 330
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="diaspora-hero">
        <div className="diaspora-hero-image" />

        <div className="diaspora-hero-overlay" />

        <div className="diaspora-hero-content">
          <span className="diaspora-eyebrow">
            DUISBURG DEVELOPERS LTD · DIASPORA SERVICES
          </span>

          <h1>
            Build Your Dream
            <br />
            <span>Home in Kenya.</span>
            <br />
            From Anywhere.
          </h1>

          <p>
            Your vision is in Kenya. You may be miles away.
            We help you plan, design and manage your construction
            project with professional support on the ground.
          </p>

          <div className="diaspora-hero-actions">
            <a href="#diaspora-enquiry" className="diaspora-btn diaspora-btn-gold">
              Discuss Your Project <ArrowRight size={19} />
            </a>

            <a
              href="https://wa.me/254728329330"
              target="_blank"
              rel="noreferrer"
              className="diaspora-btn diaspora-btn-outline"
            >
              WhatsApp Our Team
            </a>
          </div>

          <div className="diaspora-hero-note">
            <Globe2 size={17} />
            <span>Construction and property solutions in Kenya for clients abroad.</span>
          </div>
        </div>

        <a href="#diaspora-intro" className="diaspora-scroll">
          SCROLL TO EXPLORE
          <span />
        </a>
      </section>

      {/* INTRO */}
      <section className="diaspora-intro section-pad" id="diaspora-intro">
        <div className="diaspora-container diaspora-intro-grid">

          <div className="diaspora-intro-copy">
            <span className="diaspora-label">YOUR PROJECT. OUR COMMITMENT.</span>

            <h2>
              Kenya is home.
              <br />
              <span>Your investment deserves careful planning.</span>
            </h2>

            <p>
              Living abroad should not stop you from building a home,
              developing property or pursuing an investment opportunity
              in Kenya.
            </p>

            <p>
              However, managing construction from another country comes
              with unique challenges. Distance, communication, budgeting
              and site supervision all require a clear and organised
              approach.
            </p>

            <p>
              Duisburg Developers Ltd provides construction, design and
              project management solutions to help clients approach
              their projects with greater clarity and confidence.
            </p>

            <Link to="/services" className="diaspora-text-link">
              Explore Our Services <ArrowRight size={18} />
            </Link>
          </div>

          <div className="diaspora-intro-visual">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=90"
              alt="Modern residential house"
            />

            <div className="diaspora-image-caption">
              <Building2 size={25} />
              <span>
                <strong>Build with a plan.</strong>
                <small>Make informed project decisions.</small>
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* CHALLENGES */}
      <section className="diaspora-challenges section-pad">
        <div className="diaspora-container">

          <div className="diaspora-section-heading">
            <span className="diaspora-label">UNDERSTANDING THE CHALLENGE</span>
            <h2>
              Building from abroad
              <br />
              <span>should not be a guessing game.</span>
            </h2>
            <p>
              When you are not physically present, important project
              decisions need proper planning, communication and
              professional coordination.
            </p>
          </div>

          <div className="diaspora-risk-grid">
            {risks.map((risk, index) => {
              const Icon = risk.icon;

              return (
                <article className="diaspora-risk-card" key={risk.title}>
                  <div className="diaspora-risk-top">
                    <span>0{index + 1}</span>
                    <Icon size={27} />
                  </div>

                  <h3>{risk.title}</h3>
                  <p>{risk.description}</p>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* PLANNING GUIDE */}
      <section className="diaspora-planning section-pad">
        <div className="diaspora-container">

          <div className="diaspora-section-heading">
            <span className="diaspora-label">THE RIGHT WAY TO START</span>
            <h2>
              Five important stages
              <br />
              <span>before and during construction.</span>
            </h2>
            <p>
              Every successful project starts with informed decisions.
              Here are important areas to consider when planning your
              development in Kenya.
            </p>
          </div>

          <div className="diaspora-planning-list">
            {planningSteps.map((step) => {
              const Icon = step.icon;

              return (
                <article className="diaspora-planning-card" key={step.number}>
                  <div className="planning-number">{step.number}</div>

                  <div className="planning-icon">
                    <Icon size={30} />
                  </div>

                  <div className="planning-content">
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>

                    <ul>
                      {step.points.map((point) => (
                        <li key={point}>
                          <CheckCircle2 size={16} />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* IMAGE BREAK */}
      <section className="diaspora-image-break">
        <div className="diaspora-image-break-overlay" />
        <div className="diaspora-container diaspora-image-break-content">
          <span className="diaspora-label">YOUR VISION. YOUR FUTURE.</span>
          <h2>
            Make your dream home
            <br />
            a well-planned reality.
          </h2>
          <a href="#diaspora-enquiry" className="diaspora-btn diaspora-btn-gold">
            Start a Conversation <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* REMOTE MANAGEMENT */}
      <section className="diaspora-remote section-pad">
        <div className="diaspora-container diaspora-remote-grid">

          <div className="diaspora-remote-visual">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1100&q=90"
              alt="Construction professionals working on site"
            />

            <div className="remote-floating-card">
              <Globe2 size={23} />
              <span>
                <strong>Connected from anywhere</strong>
                <small>Stay informed about your project.</small>
              </span>
            </div>
          </div>

          <div className="diaspora-remote-copy">
            <span className="diaspora-label">PROJECT MANAGEMENT FROM ABROAD</span>

            <h2>
              Stay connected.
              <br />
              <span>Even when you are away.</span>
            </h2>

            <p>
              Being abroad should not mean being left out of important
              project decisions. Clear communication and agreed reporting
              arrangements help you remain informed throughout the
              development process.
            </p>

            <div className="diaspora-remote-benefits">
              {remoteBenefits.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="remote-benefit" key={item.title}>
                    <span><Icon size={22} /></span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* MISTAKES */}
      <section className="diaspora-mistakes section-pad">
        <div className="diaspora-container diaspora-mistakes-grid">

          <div>
            <span className="diaspora-label">PLAN BEFORE YOU BUILD</span>
            <h2>
              Avoid costly
              <br />
              <span>planning mistakes.</span>
            </h2>

            <p>
              Rushing into construction without the necessary preparation
              can create unnecessary complications. Take time to understand
              your project before committing resources.
            </p>

            <a href="#diaspora-enquiry" className="diaspora-btn diaspora-btn-dark">
              Talk to Our Team <ArrowRight size={18} />
            </a>
          </div>

          <div className="diaspora-mistake-list">
            {[
              "Starting construction without a clear project scope.",
              "Sending money without proper documentation.",
              "Proceeding without understanding the project budget.",
              "Making major design changes during construction.",
              "Ignoring relevant approvals and professional advice.",
              "Failing to agree on communication and reporting.",
            ].map((item, index) => (
              <div key={item}>
                <AlertTriangle size={20} />
                <span>{item}</span>
                <small>0{index + 1}</small>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CHECKLIST */}
      <section className="diaspora-checklist section-pad">
        <div className="diaspora-container diaspora-checklist-grid">

          <div className="checklist-heading">
            <span className="diaspora-label">BEFORE YOU BREAK GROUND</span>
            <h2>
              Your pre-construction
              <br />
              <span>planning checklist.</span>
            </h2>
            <p>
              Use this checklist as a starting point when preparing
              for a construction project in Kenya.
            </p>

            <ClipboardCheck size={72} strokeWidth={1.1} />
          </div>

          <div className="checklist-items">
            {checklist.map((item) => (
              <div key={item}>
                <CheckCircle2 size={20} />
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROCESS */}
      <section className="diaspora-process section-pad">
        <div className="diaspora-container">

          <div className="diaspora-section-heading">
            <span className="diaspora-label">WORKING WITH DUISBURG DEVELOPERS</span>
            <h2>
              Your project journey.
              <br />
              <span>From first conversation to handover.</span>
            </h2>
            <p>
              A structured approach helps everyone understand the
              requirements, responsibilities and next steps.
            </p>
          </div>

          <div className="diaspora-process-grid">
            {process.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div className="process-line" />
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section className="diaspora-faq section-pad">
        <div className="diaspora-container diaspora-faq-grid">

          <div className="diaspora-faq-heading">
            <span className="diaspora-label">FREQUENTLY ASKED QUESTIONS</span>
            <h2>
              Questions about
              <br />
              <span>building in Kenya?</span>
            </h2>
            <p>
              Here are answers to some common questions from clients
              planning construction and property projects from abroad.
            </p>

            <a href="https://wa.me/254728329330" target="_blank" rel="noreferrer">
              Ask us directly <ArrowRight size={18} />
            </a>
          </div>

          <div className="diaspora-faq-list">
            {faqs.map((faq, index) => (
              <article
                className={`diaspora-faq-item ${openFaq === index ? "active" : ""}`}
                key={faq.question}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  aria-expanded={openFaq === index}
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={20} />
                </button>

                {openFaq === index && (
                  <div className="diaspora-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ENQUIRY */}
      <section className="diaspora-enquiry section-pad" id="diaspora-enquiry">
        <div className="diaspora-container diaspora-enquiry-grid">

          <div className="diaspora-enquiry-copy">
            <span className="diaspora-label">LET'S DISCUSS YOUR PROJECT</span>

            <h2>
              Your dream project
              <br />
              <span>can start with a conversation.</span>
            </h2>

            <p>
              Whether you are planning a family home, commercial
              development, renovation or property investment in Kenya,
              we would like to hear about your plans.
            </p>

            <div className="enquiry-contact-item">
              <Phone size={21} />
              <span>
                <small>Call our office</small>
                <a href="tel:0728329330">0728 329 330</a>
                <a href="tel:0733558586">0733 558 586</a>
              </span>
            </div>

            <div className="enquiry-contact-item">
              <Mail size={21} />
              <span>
                <small>Email us</small>
                <a href="mailto:duisburgdevelopers@gmail.com">
                  duisburgdevelopers@gmail.com
                </a>
              </span>
            </div>

            <div className="enquiry-contact-item">
              <MapPin size={21} />
              <span>
                <small>Visit our office</small>
                <strong>HM Plaza, 3rd Floor, Suite HM31, Ruai-Nairobi, Kenya.</strong>
              </span>
            </div>

            <a
              href="https://wa.me/254728329330"
              target="_blank"
              rel="noreferrer"
              className="diaspora-whatsapp-link"
            >
              <Phone size={18} />
              Chat with us on WhatsApp
            </a>
          </div>

          <form className="diaspora-form" onSubmit={submitEnquiry}>
            <div className="form-heading">
              <span>PROJECT ENQUIRY</span>
              <h3>Tell us about your plans.</h3>
              <p>Complete the form and our team will get in touch.</p>
            </div>

            <div className="diaspora-form-row">
              <label>
                Full Name *
                <input name="full_name" required placeholder="Your full name" />
              </label>

              <label>
                Country of Residence *
                <input name="country" required placeholder="e.g. United Kingdom" />
              </label>
            </div>

            <div className="diaspora-form-row">
              <label>
                Email Address *
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email address"
                />
              </label>

              <label>
                WhatsApp Number
                <input name="whatsapp" placeholder="Include country code" />
              </label>
            </div>

            <div className="diaspora-form-row">
              <label>
                Project Type
                <select name="project_type" defaultValue="">
                  <option value="">Select project type</option>
                  <option>Residential Building</option>
                  <option>Commercial Building</option>
                  <option>Apartment Development</option>
                  <option>Land Development</option>
                  <option>Renovation</option>
                  <option>Property Management</option>
                  <option>Design & Drawings</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Project Location
                <input name="project_location" placeholder="County or town in Kenya" />
              </label>
            </div>

            <label>
              Estimated Budget
              <select name="budget" defaultValue="">
                <option value="">Select estimated budget</option>
                <option>Below KSh 1 million</option>
                <option>KSh 1 million - 5 million</option>
                <option>KSh 5 million - 10 million</option>
                <option>KSh 10 million - 30 million</option>
                <option>Above KSh 30 million</option>
                <option>Not yet decided</option>
              </select>
            </label>

            <label>
              Tell us about your project *
              <textarea
                name="message"
                required
                rows="5"
                placeholder="Describe what you are planning to build or develop..."
              />
            </label>

            {feedback && (
              <div className="diaspora-feedback" role="status">
                {feedback}
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Project Enquiry"}
              <Send size={18} />
            </button>

            <small className="form-privacy">
              Your information will be used to respond to your project enquiry.
            </small>
          </form>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="diaspora-final-cta">
        <div className="diaspora-container">
          <span>DUISBURG DEVELOPERS LTD</span>
          <h2>Wherever you are, your project can move forward.</h2>
          <p>We go above & Beyond on every Job.</p>

          <a href="#diaspora-enquiry" className="diaspora-btn diaspora-btn-gold">
            Start Planning Today <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="diaspora-footer">
        <div className="diaspora-container diaspora-footer-grid">

          <div>
            <Link to="/" className="diaspora-brand footer-brand">
              <img src="/logo.png" alt="Duisburg Developers Ltd" />
              <span>
                <strong>DUISBURG</strong>
                <small>DEVELOPERS LTD</small>
              </span>
            </Link>

            <p>
              Buildings, Drawings & Designs, Civil Works,
              Estate Developers & Property Consultants.
            </p>

            <strong className="footer-tagline">
              "We go above & Beyond on every Job"
            </strong>
          </div>

          <div>
            <h3>Explore</h3>
            <Link to="/">Home</Link>
            <Link to="/services">Our Services</Link>
            <Link to="/diaspora">Diaspora</Link>
            <Link to="/#contact">Contact</Link>
          </div>

          <div>
            <h3>Contact Us</h3>
            <a href="tel:0728329330">0728 329 330</a>
            <a href="tel:0733558586">0733 558 586</a>
            <a href="mailto:duisburgdevelopers@gmail.com">
              duisburgdevelopers@gmail.com
            </a>
            <p>HM Plaza, 3rd Floor, Suite HM31, Ruai-Nairobi, Kenya.</p>
          </div>

        </div>

        <div className="diaspora-footer-bottom">
          <p>© {new Date().getFullYear()} Duisburg Developers Ltd. All Rights Reserved.</p>
          <Link to="/admin/login">Admin Login</Link>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href="https://wa.me/254728329330"
        className="diaspora-floating-whatsapp"
        target="_blank"
        rel="noreferrer"
        aria-label="Contact Duisburg Developers on WhatsApp"
      >
        <Phone size={24} />
      </a>

    </div>
  );
}

export default Diaspora;
