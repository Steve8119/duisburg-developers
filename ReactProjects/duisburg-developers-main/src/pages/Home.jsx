
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Building2,
  CheckCircle2,
  HardHat,
  Users,
  Globe,
  Send,
  PencilRuler,
  ClipboardCheck,
  Hammer,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import "./Home.css";

/* =========================================
   COMPANY SERVICES
========================================= */

const companyServices = [
  "Drawings & Designs",
  "Building Construction",
  "Steel Structures Works",
  "Road Construction",
  "Survey Works",
  "Construction Management",
  "Construction Audits",
  "Office Partitioning",
  "Electrical & Mechanical Works",
  "Paint Works",
  "Supply of Building Materials",
  "Landscaping",
  "Property Management",
];

const companyServiceDescriptions = {
  "Drawings & Designs": {
    description:
      "We provide professional design and drawing services to help transform your construction ideas into practical plans. Our services cover architectural drawings, structural drawings and preparation of Bills of Quantities (BOQs) to support project planning and cost estimation.",
    details: [
      "Architectural drawings",
      "Structural drawings",
      "Bill of Quantities (BOQ)",
    ],
  },

  "Building Construction": {
    description:
      "We undertake building construction projects for individuals and organisations. From project commencement to completion, we focus on quality workmanship, proper coordination and dependable construction solutions.",
    details: [
      "Residential building construction",
      "Commercial building construction",
      "Construction project implementation",
    ],
  },

  "Steel Structures Works": {
    description:
      "We undertake steel structure works for different construction requirements, providing practical solutions for structural fabrication, installation and related construction activities.",
    details: [
      "Steel structure fabrication",
      "Steel structure installation",
      "Structural steel construction works",
    ],
  },

  "Road Construction": {
    description:
      "We provide road construction services designed to support reliable transport infrastructure, with attention to project planning, construction quality and implementation.",
    details: [
      "Road construction",
      "Road works implementation",
      "Construction project coordination",
    ],
  },

  "Survey Works": {
    description:
      "Our survey works support land assessment, construction planning, measurements and project implementation. Accurate surveying helps establish a reliable foundation for construction decisions.",
    details: [
      "Land surveying",
      "Site measurements",
      "Construction survey support",
    ],
  },

  "Construction Management": {
    description:
      "We provide construction project management to coordinate project activities, resources, contractors and schedules. Our aim is to support efficient project delivery while maintaining attention to quality and agreed requirements.",
    details: [
      "Project planning and coordination",
      "Site supervision",
      "Construction progress monitoring",
    ],
  },

  "Construction Audits": {
    description:
      "We provide construction audit services to assess project activities, progress and implementation. Our reviews help clients gain a clearer understanding of project performance and construction processes.",
    details: [
      "Construction project reviews",
      "Progress assessment",
      "Project documentation review",
    ],
  },

  "Office Partitioning": {
    description:
      "We provide office partitioning solutions that help create organised, functional and professional working environments for businesses and organisations.",
    details: [
      "Office space partitioning",
      "Workspace organisation",
      "Commercial interior improvements",
    ],
  },

  "Electrical & Mechanical Works": {
    description:
      "We offer electrical and mechanical works as part of our integrated construction solutions, supporting building functionality and project requirements.",
    details: [
      "Electrical installation works",
      "Mechanical installation works",
      "Building services coordination",
    ],
  },

  "Paint Works": {
    description:
      "We undertake interior and exterior painting works to improve the appearance, finish and protection of residential and commercial properties.",
    details: [
      "Interior painting",
      "Exterior painting",
      "Building finishing works",
    ],
  },

  "Supply of Building Materials": {
    description:
      "We facilitate the supply of building materials to support construction projects, helping clients obtain materials required for their construction activities.",
    details: [
      "Building material supply",
      "Construction material sourcing",
      "Project material support",
    ],
  },

  Landscaping: {
    description:
      "We provide landscaping services to improve outdoor spaces through thoughtful planning, design and implementation, creating attractive and functional environments.",
    details: [
      "Landscape planning",
      "Outdoor space improvement",
      "Landscape implementation",
    ],
  },

  "Property Management": {
    description:
      "We offer property management services focused on supporting the effective operation, maintenance and management of residential and commercial properties.",
    details: [
      "Property management",
      "Property maintenance coordination",
      "Property operations support",
    ],
  },
};

/* =========================================
   HERO SLIDES
========================================= */

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=90",
    title: "Building Excellence",
    subtitle: "Quality Construction & Development",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=90",
    title: "Delivering Quality",
    subtitle: "Modern Design & Development",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2000&q=90",
    title: "Value That Lasts",
    subtitle: "Building Your Future",
  },
];

const fallbackImage =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85";

/* =========================================
   HOW WE CAN WORK TOGETHER
========================================= */

const workTogether = [
  {
    number: "01",
    title: "Design & Build",
    description:
      "We take full responsibility for both the design and implementation processes. With everything managed under one roof, quality is consistently maintained, and significant cost savings are often achieved.",
    icon: PencilRuler,
  },
  {
    number: "02",
    title: "Build Only",
    description:
      "For clients who already have a design and would like to engage us solely for construction. Our scope in this arrangement is limited strictly to implementation as per the provided design.",
    icon: Hammer,
  },
  {
    number: "03",
    title: "Design Only",
    description:
      "Engage us solely for the design of your project. We'll develop the plans and obtain council approvals, after which you may choose a different contractor to handle the project. In this arrangement, we also provide site supervision to ensure the works align with the approved design.",
    icon: ClipboardCheck,
  },
];

/* =========================================
   OUR PROCESS
========================================= */

const processSteps = [
  {
    number: "01",
    title: "Understand & Define",
    description:
      "We listen to your ideas, requirements and project objectives.",
  },
  {
    number: "02",
    title: "Plan & Design",
    description:
      "We develop a clear project plan around your needs and expectations.",
  },
  {
    number: "03",
    title: "Build & Deliver",
    description:
      "We work towards delivering the project with care and attention to detail.",
  },
  {
    number: "04",
    title: "Review & Handover",
    description:
      "We review the completed work and guide you through the handover.",
  },
];

/* =========================================
   PLACEHOLDER TEAM
========================================= */

const placeholderTeam = [
  {
    id: "placeholder-team-1",
    full_name: "Lorem Ipsum",
    position: "Managing Director",
    biography:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image_url: "/1.jpg",
  },
  {
    id: "placeholder-team-2",
    full_name: "Lorem Ipsum",
    position: "Project Manager",
    biography:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    image_url: "/2.jpg",
  },
  {
    id: "placeholder-team-3",
    full_name: "Lorem Ipsum",
    position: "Architectural Designer",
    biography:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
    image_url: "/3.jpg",
  },
];

/* =========================================
   PLACEHOLDER TESTIMONIALS
========================================= */

const placeholderTestimonials = [
  {
    id: "placeholder-testimonial-1",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    client_name: "Lorem Ipsum",
    position: "Client",
    company: "Sample Company",
  },
  {
    id: "placeholder-testimonial-2",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    client_name: "Lorem Ipsum",
    position: "Property Owner",
    company: "Sample Company",
  },
  {
    id: "placeholder-testimonial-3",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    client_name: "Lorem Ipsum",
    position: "Business Client",
    company: "Sample Company",
  },
];

/* =========================================
   HOME COMPONENT
========================================= */

function Home() {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [loading, setLoading] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const [selectedService, setSelectedService] = useState(null);

  const [contactLoading, setContactLoading] = useState(false);
  const [diasporaLoading, setDiasporaLoading] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [diasporaMessage, setDiasporaMessage] = useState("");

  /* =====================================
     LOAD HOMEPAGE DATA
  ===================================== */

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    setLoading(true);

    const results = await Promise.all([
      supabase
        .from("projects")
        .select("*, project_images(*)")
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(6),

      supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),

      supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("display_order"),

      supabase
        .from("testimonials")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

    const [
      projectResult,
      serviceResult,
      teamResult,
      testimonialResult,
    ] = results;

    if (projectResult.error) {
      console.error("Projects error:", projectResult.error);
    } else {
      setProjects(projectResult.data || []);
    }

    if (serviceResult.error) {
      console.error("Services error:", serviceResult.error);
    } else {
      setServices(serviceResult.data || []);
    }

    if (teamResult.error) {
      console.error("Team error:", teamResult.error);
    } else {
      setTeam(teamResult.data || []);
    }

    if (testimonialResult.error) {
      console.error("Testimonials error:", testimonialResult.error);
    } else {
      setTestimonials(testimonialResult.data || []);
    }

    setLoading(false);
  };

  /* =====================================
     GLOBAL SCROLL REVEAL ANIMATIONS
  ===================================== */

  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [loading]);

  /* =====================================
     HERO SLIDER
  ===================================== */

  const nextSlide = () => {
    setSlideIndex(
      (current) => (current + 1) % heroSlides.length
    );
  };

  const previousSlide = () => {
    setSlideIndex(
      (current) =>
        (current - 1 + heroSlides.length) % heroSlides.length
    );
  };

  /* =====================================
     NAVIGATION
  ===================================== */

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setServicesDropdown(false);
  };

  const toggleServicesDropdown = () => {
    setServicesDropdown((current) => !current);
  };

  /* =====================================
     OPEN COMPANY SERVICE DETAILS
  ===================================== */

  const openCompanyService = (service) => {
    const serviceInfo = companyServiceDescriptions[service];

    setSelectedService({
      title: service,
      description:
        serviceInfo?.description ||
        "Contact Duisburg Developers Ltd to learn more about this service.",
      details: serviceInfo?.details || [],
    });
  };

  /* =====================================
     OPEN FEATURED SERVICE DETAILS
  ===================================== */

  const openFeaturedService = (service) => {
    setSelectedService({
      title: service.title,
      description:
        service.description ||
        "Contact us to learn more about this service and how we can support your project.",
      image: service.image_url,
      details: [],
    });
  };

  /* =====================================
     CONTACT FORM
  ===================================== */

  const submitContact = async (event) => {
    event.preventDefault();

    setContactLoading(true);
    setContactMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const { error } = await supabase.from("enquiries").insert([
      {
        full_name: data.get("full_name"),
        email: data.get("email"),
        phone: data.get("phone"),
        service: data.get("service"),
        location: data.get("location"),
        subject: data.get("subject"),
        message: data.get("message"),
        status: "new",
      },
    ]);

    if (error) {
      console.error(error);
      setContactMessage(
        "Your enquiry could not be sent. Please try again."
      );
    } else {
      setContactMessage(
        "Thank you! Your enquiry has been submitted."
      );
      form.reset();
    }

    setContactLoading(false);
  };

  /* =====================================
     DIASPORA FORM
  ===================================== */

  const submitDiaspora = async (event) => {
    event.preventDefault();

    setDiasporaLoading(true);
    setDiasporaMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

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

    if (error) {
      console.error(error);
      setDiasporaMessage(
        "Your enquiry could not be sent. Please try again."
      );
    } else {
      setDiasporaMessage(
        "Thank you! Your enquiry has been received."
      );
      form.reset();
    }

    setDiasporaLoading(false);
  };

  /* =====================================
     PLACEHOLDER DATA SELECTION
  ===================================== */

  const displayTeam = team.length > 0 ? team : placeholderTeam;

  const displayTestimonials =
    testimonials.length > 0
      ? testimonials
      : placeholderTestimonials;

  /* =====================================
     HOMEPAGE
  ===================================== */

  return (
    <div className="home-page">

      {/* HEADER */}

      <header className="site-header">
        <div className="nav-container">

          <Link
            to="/#home"
            className="brand"
            onClick={closeMobileMenu}
          >
            <span className="brand-symbol">
              <img
                src="/logo.png"
                alt="Duisburg Developers Ltd"
                className="brand-logo"
              />
            </span>

            <span className="brand-text">
              <strong>DUISBURG</strong>
              <small>DEVELOPERS LTD</small>
            </span>
          </Link>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Toggle navigation"
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>

          <nav className={`main-nav ${mobileMenu ? "open" : ""}`}>

            <Link to="/#about" onClick={closeMobileMenu}>
              About Us
            </Link>

            <Link to="/#process" onClick={closeMobileMenu}>
              Our Process
            </Link>

            {/* SERVICES DROPDOWN */}

            <div
              className={`nav-dropdown ${
                servicesDropdown ? "dropdown-open" : ""
              }`}
            >
              <div className="nav-dropdown-heading">

                <Link
                  to="/services"
                  onClick={closeMobileMenu}
                  className="nav-dropdown-main-link"
                >
                  Our Services
                </Link>

                <button
                  type="button"
                  className="nav-dropdown-toggle"
                  onClick={toggleServicesDropdown}
                  aria-label="Toggle services menu"
                  aria-expanded={servicesDropdown}
                >
                  <ChevronRight size={16} />
                </button>

              </div>

              <div className="nav-dropdown-menu">

                <Link to="/services" onClick={closeMobileMenu}>
                  View All Services
                </Link>

                <Link
                  to="/services#drawings-designs"
                  onClick={closeMobileMenu}
                >
                  Drawings & Designs
                </Link>

                <Link
                  to="/services#building-construction"
                  onClick={closeMobileMenu}
                >
                  Building Construction
                </Link>

                <Link
                  to="/services#steel-structures"
                  onClick={closeMobileMenu}
                >
                  Steel Structures Works
                </Link>

                <Link
                  to="/services#road-construction"
                  onClick={closeMobileMenu}
                >
                  Road Construction
                </Link>

                <Link
                  to="/services#survey-works"
                  onClick={closeMobileMenu}
                >
                  Survey Works
                </Link>

                <Link
                  to="/services#construction-management"
                  onClick={closeMobileMenu}
                >
                  Construction Management
                </Link>

                <Link
                  to="/services#construction-audits"
                  onClick={closeMobileMenu}
                >
                  Construction Audits
                </Link>

                <Link
                  to="/services#office-partitioning"
                  onClick={closeMobileMenu}
                >
                  Office Partitioning
                </Link>

                <Link
                  to="/services#electrical-mechanical"
                  onClick={closeMobileMenu}
                >
                  Electrical & Mechanical Works
                </Link>

                <Link
                  to="/services#paint-works"
                  onClick={closeMobileMenu}
                >
                  Paint Works
                </Link>

                <Link
                  to="/services#building-materials"
                  onClick={closeMobileMenu}
                >
                  Supply of Building Materials
                </Link>

                <Link
                  to="/services#landscaping"
                  onClick={closeMobileMenu}
                >
                  Landscaping
                </Link>

                <Link
                  to="/services#property-management"
                  onClick={closeMobileMenu}
                >
                  Property Management
                </Link>

              </div>
            </div>

            <Link to="/projects" onClick={closeMobileMenu}>
              Our Projects
            </Link>

            <Link to="/diaspora" onClick={closeMobileMenu}>
              Diaspora
            </Link>

            <Link to="/#contact" onClick={closeMobileMenu}>
              Contact
            </Link>

          </nav>

          <div className="nav-actions">

            <a className="nav-phone" href="tel:0728329330">
              <Phone size={19} />
              <span>0728 329 330</span>
            </a>

            <Link
              to="/#contact"
              className="nav-consultation"
              onClick={closeMobileMenu}
            >
              Request Consultation
            </Link>

          </div>

        </div>
      </header>

      {/* HERO CAROUSEL */}

      <section className="hero-section" id="home">

        <div
          className="hero-background"
          style={{
            backgroundImage: `url("${heroSlides[slideIndex].image}")`,
          }}
        />

        <div className="hero-overlay" />

        <button
          type="button"
          className="hero-arrow hero-arrow-left"
          onClick={previousSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>

        <button
          type="button"
          className="hero-arrow hero-arrow-right"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>

        <div className="hero-content" data-reveal="up">

          <span className="hero-eyebrow">
            BUILDINGS, DRAWINGS & DESIGNS, CIVIL WORKS
          </span>

          <h1>{heroSlides[slideIndex].title}</h1>

          <div className="hero-feature">
            <div>
              <strong>Featured:</strong>
              <h3>
                {projects.length > 0
                  ? projects[0].title
                  : heroSlides[slideIndex].subtitle}
              </h3>
            </div>

            <a href="#projects">
              Explore Project <ArrowRight size={21} />
            </a>
          </div>

          <div className="hero-dots">
            {heroSlides.map((slide, index) => (
              <button
                type="button"
                key={slide.title}
                className={slideIndex === index ? "active" : ""}
                onClick={() => setSlideIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* WHO WE ARE */}

      <section className="intro-section" id="about">
        <div className="intro-grid">

          <div className="intro-content" data-reveal="left">

            <span className="section-label">WHO WE ARE</span>

            <h2>
              Building with purpose.
              <br />
              <span>Creating lasting value.</span>
            </h2>

            <p>
              Duisburg Developers Ltd is a Kenyan Incorporated Company
              and locally owned. The company offers Engineering
              Construction (Design & Build) and Construction Project
              Management.
            </p>

            <p>
              Duisburg Developers Ltd is dedicated to individuals and
              organizations seeking construction services. Our approach
              combines professional expertise, careful planning and
              quality implementation to deliver solutions that meet
              our clients' needs.
            </p>

            <p className="company-tagline">
              "We go above & Beyond on every Job"
            </p>

            <Link to="/services" className="outline-link">
              Explore Our Services <ArrowRight size={19} />
            </Link>

          </div>

          <div className="intro-gallery" data-reveal="right">

            <img
              className="gallery-main"
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85"
              alt="Modern building interior"
            />

            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=700&q=85"
              alt="Architectural design"
            />

            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=700&q=85"
              alt="Construction work"
            />

          </div>
        </div>
      </section>

      {/* OUR PROCESS */}

      <section className="process-section" id="process">

        <div className="section-heading" data-reveal="up">
          <span className="section-label">HOW WE WORK</span>
          <h2>Our Process</h2>
          <p>
            We approach every project with careful planning,
            clear communication and a commitment to quality.
          </p>
        </div>

        <div className="process-grid">
          {processSteps.map((step, index) => (
            <article
              className={`process-card process-card-${index + 1}`}
              key={step.number}
              data-reveal="up"
              style={{
                transitionDelay: `${index * 130}ms`,
              }}
            >
              <span className="process-number">{step.number}</span>

              <div className="process-card-content">
                <small>STEP {step.number}</small>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </div>

      </section>

      {/* HOW WE CAN WORK TOGETHER */}

      <section className="work-together-section" id="work-together">

        <div className="section-heading" data-reveal="up">
          <span className="section-label">LET'S WORK TOGETHER</span>
          <h2>How We Can Work Together</h2>
          <p>
            Whether you need complete project delivery, construction
            or professional design services, we have an arrangement
            that can work for you.
          </p>
        </div>

        <div className="work-together-grid">
          {workTogether.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                className="work-together-card"
                key={item.number}
                data-reveal="zoom"
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                <div className="work-card-top">
                  <span className="work-card-number">
                    {item.number}
                  </span>

                  <span className="work-card-icon">
                    <Icon size={29} />
                  </span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <a href="#contact" className="text-link">
                  Discuss Your Project <ArrowRight size={17} />
                </a>
              </article>
            );
          })}
        </div>

      </section>

      {/* SERVICES */}

      <section className="services-section" id="services">

        <div className="section-heading" data-reveal="up">
          <span className="section-label">WHAT WE DO</span>
          <h2>Our Services</h2>
          <p>
            Comprehensive construction, engineering and property solutions
            tailored to your project requirements.
          </p>

          <Link to="/services" className="outline-link">
            View All Services <ArrowRight size={19} />
          </Link>
        </div>

        {/* OFFICIAL COMPANY SERVICES */}

        <div className="company-services-grid">
          {companyServices.map((service, index) => (
            <article
              className="company-service-card"
              key={service}
              data-reveal="up"
              style={{
                transitionDelay: `${(index % 5) * 80}ms`,
              }}
            >
              <span className="company-service-icon">
                <CheckCircle2 size={21} />
              </span>

              <span className="company-service-name">
                {service}
              </span>

              <button
                type="button"
                className="service-read-more"
                onClick={() => openCompanyService(service)}
              >
                Read More <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>

        {/* FEATURED SERVICES FROM SUPABASE */}

        {!loading && services.length > 0 && (
          <div className="services-grid">
            {services.map((service, index) => (
              <article
                className="service-card"
                key={service.id}
                data-reveal="up"
                style={{
                  transitionDelay: `${(index % 4) * 110}ms`,
                }}
              >
                {service.image_url ? (
                  <img
                    src={service.image_url}
                    alt={service.title}
                  />
                ) : (
                  <div className="service-placeholder">
                    <HardHat size={36} />
                  </div>
                )}

                <div className="service-card-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <button
                    type="button"
                    className="service-featured-read-more"
                    onClick={() => openFeaturedService(service)}
                  >
                    Read More <ArrowRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* SERVICE DETAILS POPUP */}

        {selectedService && (
          <div
            className="service-modal-overlay"
            onClick={() => setSelectedService(null)}
          >
            <div
              className="service-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="service-modal-close"
                onClick={() => setSelectedService(null)}
                aria-label="Close service details"
              >
                <X size={23} />
              </button>

              {selectedService.image && (
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="service-modal-image"
                />
              )}

              <span className="section-label">
                DUISBURG DEVELOPERS LTD
              </span>

              <h2 id="service-modal-title">
                {selectedService.title}
              </h2>

              <div className="service-modal-divider" />

              <p>{selectedService.description}</p>

              {selectedService.details?.length > 0 && (
                <div className="service-modal-details">
                  <h3>Our services include:</h3>

                  <ul>
                    {selectedService.details.map((detail) => (
                      <li key={detail}>
                        <CheckCircle2 size={17} />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="service-modal-actions">
                <a
                  href="#contact"
                  className="service-modal-enquire"
                  onClick={() => setSelectedService(null)}
                >
                  Enquire About This Service
                  <ArrowRight size={17} />
                </a>

                <button
                  type="button"
                  className="service-modal-back"
                  onClick={() => setSelectedService(null)}
                >
                  Back to Services
                </button>
              </div>
            </div>
          </div>
        )}

      </section>

      {/* PROJECTS */}

      <section className="projects-section" id="projects">

        <div className="section-heading" data-reveal="up">
          <span className="section-label">OUR PORTFOLIO</span>
          <h2>Featured Projects</h2>
          <p>A selection of projects from our portfolio.</p>

          <Link to="/projects" className="outline-link">
            View All Projects <ArrowRight size={19} />
          </Link>
        </div>

        {loading ? (
          <p className="empty-text">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="empty-text">
            Featured projects will appear here soon.
          </p>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => {
              const images = [...(project.project_images || [])].sort(
                (a, b) =>
                  (a.display_order || 0) - (b.display_order || 0)
              );

              return (
                <article
                  className="project-card"
                  key={project.id}
                  data-reveal="up"
                  style={{
                    transitionDelay: `${(index % 3) * 130}ms`,
                  }}
                >
                  <div className="project-image">
                    <img
                      src={images[0]?.image_url || fallbackImage}
                      alt={project.title}
                      loading="lazy"
                    />

                    <span>{project.status || "Project"}</span>
                  </div>

                  <div className="project-info">
                    <small>
                      {project.category || "Development"}
                    </small>

                    <h3>{project.title}</h3>

                    {project.location && (
                      <p>
                        <MapPin size={15} /> {project.location}
                      </p>
                    )}

                    <a href="#contact" className="text-link">
                      Explore Project <ArrowRight size={17} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </section>

      {/* WHY CHOOSE US */}

      <section className="why-section">

        <div className="why-content" data-reveal="left">
          <span className="section-label">WHY CHOOSE US</span>

          <h2>
            Quality in every detail.
            <br />
            <span>Commitment in every project.</span>
          </h2>

          <p>
            We combine engineering knowledge, construction experience
            and project management to deliver dependable solutions.
            We go above & Beyond on every Job.
          </p>

          <a href="#contact" className="solid-link">
            Start a Conversation <ArrowRight size={18} />
          </a>
        </div>

        <div className="why-points" data-reveal="right">

          <div data-reveal="up">
            <CheckCircle2 />
            <span>
              <strong>Quality Focus</strong>
              <small>Attention to detail at every stage.</small>
            </span>
          </div>

          <div data-reveal="up">
            <Users />
            <span>
              <strong>Client Commitment</strong>
              <small>Understanding your needs and expectations.</small>
            </span>
          </div>

          <div data-reveal="up">
            <HardHat />
            <span>
              <strong>Professional Approach</strong>
              <small>Thoughtful planning and execution.</small>
            </span>
          </div>

          <div data-reveal="up">
            <Building2 />
            <span>
              <strong>Complete Solutions</strong>
              <small>Construction, engineering and property services.</small>
            </span>
          </div>

        </div>
      </section>

      {/* TEAM */}

      <section className="team-section" id="team">

        <div className="section-heading" data-reveal="up">
          <span className="section-label">THE PEOPLE BEHIND THE WORK</span>
          <h2>Meet Our Team</h2>
        </div>

        {loading ? (
          <p className="empty-text">Loading team...</p>
        ) : (
          <div className="team-grid">
            {displayTeam.map((member, index) => (
              <article
                className="team-card"
                key={member.id}
                data-reveal="up"
                style={{
                  transitionDelay: `${(index % 4) * 120}ms`,
                }}
              >
                {member.image_url ? (
                  <img
                    src={member.image_url}
                    alt={member.full_name}
                  />
                ) : (
                  <div className="team-placeholder">
                    <Users size={38} />
                  </div>
                )}

                <h3>{member.full_name}</h3>
                <span>{member.position}</span>

                {member.biography && (
                  <p>{member.biography}</p>
                )}
              </article>
            ))}
          </div>
        )}

      </section>

      {/* TESTIMONIALS */}

      <section className="testimonials-section" id="testimonials">

        <div className="section-heading" data-reveal="up">
          <span className="section-label">CLIENT EXPERIENCES</span>
          <h2>What Our Clients Say</h2>
        </div>

        {loading ? (
          <p className="empty-text">Loading testimonials...</p>
        ) : (
          <div className="testimonials-grid">
            {displayTestimonials.map((item, index) => (
              <article
                className="testimonial-card"
                key={item.id}
                data-reveal="zoom"
                style={{
                  transitionDelay: `${(index % 3) * 120}ms`,
                }}
              >
                <span className="quote-mark">“</span>

                <p>{item.message}</p>

                <strong>{item.client_name}</strong>

                <small>
                  {[item.position, item.company]
                    .filter(Boolean)
                    .join(" • ")}
                </small>
              </article>
            ))}
          </div>
        )}

      </section>

      {/* DIASPORA */}

      <section className="diaspora-section" id="diaspora">

        <div className="diaspora-content" data-reveal="left">
          <span className="section-label">
            CONNECT WITH US FROM ANYWHERE
          </span>

          <h2>
            Planning a project in Kenya?
            <br />
            <span>We would like to hear from you.</span>
          </h2>

          <p>
            Living abroad and planning a construction or development
            project in Kenya? Send us your requirements.
          </p>

          <div className="diaspora-benefits">
            <span>
              <CheckCircle2 /> Share your project requirements
            </span>
            <span>
              <CheckCircle2 /> Tell us your preferred location
            </span>
            <span>
              <CheckCircle2 /> Our team will get in touch
            </span>
          </div>

          <Link to="/diaspora" className="outline-link">
            Learn More <ArrowRight size={18} />
          </Link>
        </div>

        <form
          className="site-form"
          onSubmit={submitDiaspora}
          data-reveal="right"
        >
          <h3>Diaspora Project Enquiry</h3>
          <p>Tell us about your plans.</p>

          <div className="form-row">
            <label>
              Full Name *
              <input
                name="full_name"
                required
                placeholder="Your full name"
              />
            </label>

            <label>
              Country *
              <input
                name="country"
                required
                placeholder="Country of residence"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Email *
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
              />
            </label>

            <label>
              WhatsApp
              <input
                name="whatsapp"
                placeholder="WhatsApp number"
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Project Type
              <select name="project_type" defaultValue="">
                <option value="">Select project type</option>
                <option>Residential Building</option>
                <option>Commercial Building</option>
                <option>Apartment Development</option>
                <option>Land Development</option>
                <option>Renovation</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Project Location
              <input
                name="project_location"
                placeholder="County or town"
              />
            </label>
          </div>

          <label>
            Estimated Budget
            <select name="budget" defaultValue="">
              <option value="">Select budget</option>
              <option>Below KSh 1 million</option>
              <option>KSh 1 million - 5 million</option>
              <option>KSh 5 million - 10 million</option>
              <option>KSh 10 million - 30 million</option>
              <option>Above KSh 30 million</option>
              <option>Not yet decided</option>
            </select>
          </label>

          <label>
            Project Details *
            <textarea
              name="message"
              required
              rows="4"
              placeholder="Tell us about your project..."
            />
          </label>

          {diasporaMessage && (
            <p className="form-feedback">{diasporaMessage}</p>
          )}

          <button
            type="submit"
            className="solid-link"
            disabled={diasporaLoading}
          >
            {diasporaLoading ? "Sending..." : "Submit Enquiry"}
            <Send size={17} />
          </button>
        </form>

      </section>

      {/* CONTACT */}

      <section className="contact-section" id="contact">

        <div className="section-heading" data-reveal="up">
          <span className="section-label">LET'S WORK TOGETHER</span>
          <h2>Request a Consultation</h2>
          <p>
            Tell us about your project. Our team would be glad to hear from you.
          </p>
        </div>

        <div className="contact-grid">

          <div className="contact-details" data-reveal="left">

            <div data-reveal="up">
              <Phone />
              <span>
                <strong>Office Telephone</strong>
                <a href="tel:0728329330">0728 329 330</a>
                <a href="tel:0733558586">0733 558 586</a>
              </span>
            </div>

            <div data-reveal="up">
              <Mail />
              <span>
                <strong>Email Us</strong>
                <a href="mailto:duisburgdevelopers@gmail.com">
                  duisburgdevelopers@gmail.com
                </a>
              </span>
            </div>

            <div data-reveal="up">
              <MapPin />
              <span>
                <strong>Physical Address</strong>
                <small>
                  HM Plaza, 3rd Floor, Suite No. HM31, Ruai-Nairobi, Kenya.
                </small>
              </span>
            </div>

            <div data-reveal="up">
              <Building2 />
              <span>
                <strong>Postal Address</strong>
                <small>
                  P.O. Box 26605-00100, G.P.O - Nairobi, Kenya.
                </small>
              </span>
            </div>

            <div data-reveal="up">
              <Globe />
              <span>
                <strong>Website</strong>
                <a
                  href="https://www.duisburgdevelopers.co.ke"
                  target="_blank"
                  rel="noreferrer"
                >
                  www.duisburgdevelopers.co.ke
                </a>
              </span>
            </div>

          </div>

          <form
            className="site-form"
            onSubmit={submitContact}
            data-reveal="right"
          >
            <h3>Send Us an Enquiry</h3>

            <div className="form-row">
              <label>
                Full Name *
                <input
                  name="full_name"
                  required
                  placeholder="Your name"
                />
              </label>

              <label>
                Email Address *
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Phone Number
                <input
                  name="phone"
                  placeholder="Your phone number"
                />
              </label>

              <label>
                Service Required
                <select name="service" defaultValue="">
                  <option value="">Select a service</option>

                  {companyServices.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}

                  <option value="Other">Other</option>
                </select>
              </label>
            </div>

            <label>
              Project Location
              <input
                name="location"
                placeholder="Project location"
              />
            </label>

            <label>
              Subject
              <input
                name="subject"
                placeholder="Enquiry subject"
              />
            </label>

            <label>
              Message *
              <textarea
                name="message"
                required
                rows="5"
                placeholder="How can we help you?"
              />
            </label>

            {contactMessage && (
              <p className="form-feedback">{contactMessage}</p>
            )}

            <button
              type="submit"
              className="solid-link"
              disabled={contactLoading}
            >
              {contactLoading ? "Sending..." : "Send Message"}
              <Send size={17} />
            </button>
          </form>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}

      <section className="final-cta">

        <div data-reveal="left">
          <span>HAVE A PROJECT IN MIND?</span>
          <h2>Let's build something great together.</h2>
          <p>We go above & Beyond on every Job.</p>
        </div>

        <a href="#contact" data-reveal="right">
          Request Consultation <ArrowRight />
        </a>

      </section>

      {/* FOOTER */}

      <footer className="site-footer">

        <div className="footer-grid">

          <div data-reveal="up">
            <Link to="/#home" className="brand footer-brand">
              <span className="brand-symbol">
                <img
                  src="/logo.png"
                  alt="Duisburg Developers Ltd"
                  className="brand-logo footer-logo"
                />
              </span>

              <span className="brand-text">
                <strong>DUISBURG</strong>
                <small>DEVELOPERS LTD</small>
              </span>
            </Link>

            <p>
              Buildings, Drawings & Designs, Civil Works,
              Estate Developers & Property Consultants.
            </p>

            <p className="footer-tagline">
              "We go above & Beyond on every Job"
            </p>
          </div>

          <div data-reveal="up">
            <h3>Explore</h3>

            <Link to="/#about">About Us</Link>
            <Link to="/#process">Our Process</Link>
            <Link to="/services">Our Services</Link>
            <Link to="/projects">Our Projects</Link>
            <Link to="/diaspora">Diaspora</Link>
            <Link to="/#contact">Contact</Link>
          </div>

          <div data-reveal="up">
            <h3>Contact Details</h3>

            <a href="tel:0728329330">0728 329 330</a>
            <a href="tel:0733558586">0733 558 586</a>

            <a href="mailto:duisburgdevelopers@gmail.com">
              duisburgdevelopers@gmail.com
            </a>

            <p>HM Plaza, 3rd Floor, Suite No. HM31, Ruai-Nairobi.</p>
            <p>P.O. Box 26605-00100, G.P.O - Nairobi, Kenya.</p>

            <a
              href="https://www.duisburgdevelopers.co.ke"
              target="_blank"
              rel="noreferrer"
            >
              www.duisburgdevelopers.co.ke
            </a>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Duisburg Developers Ltd.
            All Rights Reserved.
          </p>

          <a href="/admin/login">Admin Login</a>
        </div>

      </footer>

      {/* WHATSAPP FLOAT */}

      <a
        className="whatsapp-float"
        href="https://wa.me/254728329330"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <Phone size={25} />
      </a>

    </div>
  );
}

export default Home;
