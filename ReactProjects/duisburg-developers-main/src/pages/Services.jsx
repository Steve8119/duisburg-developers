
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  PencilRuler,
  Building2,
  HardHat,
  Route,
  Ruler,
  ClipboardCheck,
  ShieldCheck,
  Building,
  Zap,
  Paintbrush,
  Truck,
  Trees,
  BriefcaseBusiness,
  Wrench,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import "./Services.css";

// Match service titles to icons
const getServiceIcon = (title = "") => {
  const name = title.toLowerCase();

  if (name.includes("drawing") || name.includes("design")) return PencilRuler;
  if (name.includes("building construction")) return Building2;
  if (name.includes("steel")) return HardHat;
  if (name.includes("road")) return Route;
  if (name.includes("survey")) return Ruler;
  if (name.includes("management")) return ClipboardCheck;
  if (name.includes("audit")) return ShieldCheck;
  if (name.includes("partition")) return Building;
  if (name.includes("electrical") || name.includes("mechanical")) return Zap;
  if (name.includes("paint")) return Paintbrush;
  if (name.includes("material") || name.includes("supply")) return Truck;
  if (name.includes("landscape")) return Trees;
  if (name.includes("property")) return BriefcaseBusiness;

  return Wrench;
};

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // LOAD SERVICES FROM SUPABASE
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) {
        console.error("Services loading error:", error);
        setError("We could not load our services at the moment. Please try again later.");
      } else {
        setServices(data || []);
      }

      setLoading(false);
    };

    loadServices();
  }, []);

  // SCROLL REVEAL
  useEffect(() => {
    const elements = document.querySelectorAll("[data-service-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) =>
        element.classList.add("service-visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("service-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [services, loading]);

  return (
    <main className="services-page">

      {/* HERO SECTION */}
      <section className="services-hero">
        <div className="services-hero-overlay"></div>

        <div className="services-hero-content" data-service-reveal>
          <span className="services-hero-label">
            DUISBURG DEVELOPERS LTD
          </span>

          <h1>Our Services</h1>

          <p>
            Professional construction, engineering, design and
            property solutions. From concept to completion,
            we bring your vision to life.
          </p>

          <div className="services-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Our Services</span>
          </div>
        </div>

        <div className="services-hero-bottom">
          <span>BUILDING EXCELLENCE. DELIVERING QUALITY.</span>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="services-intro">

        <div className="services-intro-image" data-service-reveal>
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=90"
            alt="Architectural design and construction planning"
          />

          <div className="services-image-label">
            <strong>DUISBURG DEVELOPERS LTD</strong>
            <span>We go above & beyond on every job.</span>
          </div>
        </div>

        <div className="services-intro-content" data-service-reveal>
          <span className="services-eyebrow">WHO WE ARE</span>

          <h2>
            Creating spaces.
            <br />
            Building possibilities.
          </h2>

          <p>
            Duisburg Developers Ltd is a Kenyan incorporated and
            locally owned company offering engineering construction,
            design and build services and construction project management.
          </p>

          <p>
            We work with individuals, organisations and property
            developers to deliver practical solutions that respond
            to their unique project requirements.
          </p>

          <div className="services-intro-points">
            <div>
              <CheckCircle2 />
              <span>Professional project approach</span>
            </div>

            <div>
              <CheckCircle2 />
              <span>Quality-focused delivery</span>
            </div>

            <div>
              <CheckCircle2 />
              <span>Client-centred solutions</span>
            </div>
          </div>

          <Link to="/#contact" className="services-primary-btn">
            Discuss Your Project
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-list-section">

        <div className="services-section-heading" data-service-reveal>
          <span className="services-eyebrow">WHAT WE DO</span>

          <h2>Our Areas of Expertise</h2>

          <p>
            We offer a comprehensive range of construction and
            development services to support projects of different
            sizes and requirements.
          </p>

          <div className="services-heading-line"></div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="services-loading">
            <div className="services-loader"></div>
            <p>Loading our services...</p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="services-empty">
            <Wrench size={42} />
            <h3>Services temporarily unavailable</h3>
            <p>{error}</p>
          </div>
        )}

        {/* NO SERVICES */}
        {!loading && !error && services.length === 0 && (
          <div className="services-empty">
            <Wrench size={42} />
            <h3>No services available at the moment</h3>
            <p>
              Please check back soon or contact our team
              for assistance.
            </p>
          </div>
        )}

        {/* DYNAMIC SERVICE CARDS */}
        {!loading && !error && services.length > 0 && (
          <div className="services-page-grid">

            {services.map((service, index) => {
              const Icon = getServiceIcon(service.title);

              const serviceId =
                service.slug || `service-${service.id}`;

              const enquiryLink =
                `/?service=${encodeURIComponent(service.title)}#contact`;

              return (
                <article
                  className="services-page-card"
                  id={serviceId}
                  key={service.id}
                  data-service-reveal
                  style={{
                    "--service-delay": `${(index % 3) * 0.12}s`,
                  }}
                >

                  {/* SERVICE IMAGE */}
                  <div className="services-card-image">

                    {service.image_url ? (
                      <img
                        src={service.image_url}
                        alt={service.title}
                        loading="lazy"
                      />
                    ) : (
                      <div className="services-no-image">
                        <Icon size={55} strokeWidth={1.5} />
                      </div>
                    )}

                    <div className="services-card-overlay">
                      <div className="services-overlay-icon">
                        <Icon size={30} strokeWidth={1.7} />
                      </div>

                      <span className="services-overlay-number">
                        SERVICE {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3>{service.title}</h3>

                      <Link to={enquiryLink}>
                        Enquire About This Service
                        <ArrowRight size={17} />
                      </Link>
                    </div>

                    <span className="services-image-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* SERVICE DETAILS */}
                  <div className="services-card-content">

                    <div className="services-card-heading">
                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3>{service.title}</h3>
                    </div>

                    <p>{service.description}</p>

                    <div className="services-card-divider"></div>

                    <div className="services-card-footer">
                      <span>
                        <CheckCircle2 size={16} />
                        Professional Service
                      </span>

                      <Link
                        to={enquiryLink}
                        className="services-card-link"
                      >
                        Enquire Now
                        <ArrowRight size={17} />
                      </Link>
                    </div>

                  </div>
                </article>
              );
            })}

          </div>
        )}
      </section>

      {/* OUR COMMITMENT */}
      <section className="services-approach">
        <div className="services-approach-content" data-service-reveal>
          <span className="services-eyebrow">OUR COMMITMENT</span>

          <h2>We go above & beyond on every job.</h2>

          <p>
            Every project deserves attention, responsibility and
            a professional approach. From the initial idea to
            project completion, we remain committed to delivering
            solutions that meet our clients' requirements.
          </p>

          <Link to="/#contact" className="services-light-btn">
            Let's Work Together
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="services-bottom-cta" data-service-reveal>
        <div className="services-bottom-cta-content">
          <span>HAVE A PROJECT IN MIND?</span>

          <h2>Let's build something great together.</h2>

          <p>
            Get in touch with our team and let's discuss
            how we can bring your project to life.
          </p>
        </div>

        <Link to="/#contact" className="services-primary-btn">
          Request Consultation
          <ArrowRight size={18} />
        </Link>
      </section>

    </main>
  );
}

export default Services;
