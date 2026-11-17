
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Wrench,
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
} from "lucide-react";

import { supabase } from "../lib/supabase";
import "./Services.css";

const getServiceIcon = (title = "") => {
  const name = title.toLowerCase();

  if (name.includes("drawing") || name.includes("design")) return PencilRuler;
  if (name.includes("building")) return Building2;
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
        setError("We could not load our services at the moment.");
      } else {
        setServices(data || []);
      }

      setLoading(false);
    };

    loadServices();
  }, []);

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

      <section className="services-hero">
        <div className="services-hero-overlay"></div>

        <div className="services-hero-content" data-service-reveal>
          <span className="services-hero-label">
            DUISBURG DEVELOPERS LTD
          </span>

          <h1>Our Services</h1>

          <p>
            Explore our professional services and solutions.
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

      <section className="services-list-section">

        <div className="services-section-heading" data-service-reveal>
          <span className="services-eyebrow">WHAT WE DO</span>
          <h2>Our Areas of Expertise</h2>
          <div className="services-heading-line"></div>
        </div>

        {loading && (
          <div className="services-loading">
            <div className="services-loader"></div>
            <p>Loading our services...</p>
          </div>
        )}

        {!loading && error && (
          <div className="services-empty">
            <Wrench size={42} />
            <h3>Services temporarily unavailable</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="services-empty">
            <Wrench size={42} />
            <h3>Our services are being updated</h3>
            <p>
              Please check back soon or contact our team
              for assistance.
            </p>
          </div>
        )}

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
    </main>
  );
}

export default Services;
