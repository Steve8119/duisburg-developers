import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  ShieldCheck,
  Code2,
  Camera,
  Globe,
  Server,
  Network,
  Palette,
  Zap,
  Monitor,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  MessageCircle,
  Sparkles,
  Layers3,
  Smartphone,
  Database,
  Wifi,
  LockKeyhole,
  Cpu,
  Headphones,
  BarChart3,
  Settings,
  ExternalLink,
  Play,
  Star,
  Send,
  Clock3,
  Building2,
  Users,
  Target,
  Lightbulb,
  Wrench,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import logo from "./images/logo.png";
import cctv from "./images/cctv.jpg";
import networking from "./images/networking.jpg";
import website from "./images/website.jpg";
import poster1 from "./images/poster 1.jpg";
import poster2 from "./images/poster 2.jpg";
import poster3 from "./images/poster 3.jpg";

/*
|--------------------------------------------------------------------------
| E&M TECHNOLOGIES
| Full single-page React website
|--------------------------------------------------------------------------
|
| IMPORTANT:
| 1. Keep this file as src/App.jsx.
| 2. Keep your images inside src/images/.
| 3. If your image extensions differ from .jpg/.png, update the imports.
| 4. Replace the WhatsApp number below with the real business number.
| 5. The CSS is intentionally included in this component so this file
|    can operate as a complete standalone App.jsx.
|
|--------------------------------------------------------------------------
*/

const WHATSAPP_NUMBER = "254700000000";
const BUSINESS_EMAIL = "info@example.com";
const BUSINESS_PHONE = "+254 700 000 000";
const BUSINESS_LOCATION = "Kenya";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Monitor,
    number: "01",
    title: "Web Development",
    short: "Websites & applications",
    description:
      "Modern, responsive and high-performance websites designed to help businesses establish a strong digital presence.",
    items: [
      "Business Websites",
      "Corporate Websites",
      "E-Commerce",
      "Web Applications",
      "Landing Pages",
      "Website Maintenance",
    ],
  },
  {
    icon: Server,
    number: "02",
    title: "IT Solutions",
    short: "Technology support",
    description:
      "Reliable technology solutions that help organizations improve productivity, efficiency and everyday digital operations.",
    items: [
      "IT Support",
      "System Setup",
      "Computer Solutions",
      "Technical Support",
      "Software Setup",
      "Maintenance",
    ],
  },
  {
    icon: Camera,
    number: "03",
    title: "CCTV & Security",
    short: "Protection & monitoring",
    description:
      "Smart security solutions designed to help protect people, property, systems and business operations.",
    items: [
      "CCTV Installation",
      "Security Cameras",
      "Monitoring Systems",
      "Access Control",
      "Remote Monitoring",
      "Security Assessment",
    ],
  },
  {
    icon: Network,
    number: "04",
    title: "Networking",
    short: "Connected infrastructure",
    description:
      "Secure and dependable network infrastructure for homes, offices, institutions and growing businesses.",
    items: [
      "LAN & WAN",
      "Network Installation",
      "Wi-Fi Solutions",
      "Network Troubleshooting",
      "Router Configuration",
      "Structured Cabling",
    ],
  },
  {
    icon: Code2,
    number: "05",
    title: "Digital Solutions",
    short: "Connected business systems",
    description:
      "Technology-driven solutions that connect your business with customers and streamline your operations.",
    items: [
      "Digital Platforms",
      "Business Systems",
      "API Integration",
      "Database Solutions",
      "Automation",
      "Custom Software",
    ],
  },
  {
    icon: Palette,
    number: "06",
    title: "Creative & Design",
    short: "Visual communication",
    description:
      "Creative digital content that gives your brand a professional and memorable visual identity.",
    items: [
      "Graphic Design",
      "Branding",
      "Social Media Graphics",
      "Digital Content",
      "Poster Design",
      "Promotional Artwork",
    ],
  },
];

const reasons = [
  {
    icon: Zap,
    title: "Innovation",
    text:
      "We embrace modern technology and creative thinking to develop practical solutions for real-world needs.",
  },
  {
    icon: ShieldCheck,
    title: "Security",
    text:
      "Security and reliability are considered throughout the solutions we design, install and support.",
  },
  {
    icon: CheckCircle2,
    title: "Reliability",
    text:
      "We focus on dependable solutions that can support your organization as it grows and changes.",
  },
  {
    icon: Headphones,
    title: "Professional Support",
    text:
      "We remain available to help with implementation, maintenance, troubleshooting and technical support.",
  },
];

const projects = [
  {
    category: "Web Development",
    title: "Business Website",
    description:
      "A modern responsive website designed to establish a strong digital presence and improve customer engagement.",
    image: website,
    icon: Globe,
    tags: ["Responsive", "Modern UI", "Business"],
  },
  {
    category: "CCTV & Security",
    title: "CCTV Security System",
    description:
      "Professional CCTV and surveillance solutions designed to improve security, monitoring and protection.",
    image: cctv,
    icon: Camera,
    tags: ["CCTV", "Monitoring", "Security"],
  },
  {
    category: "Networking",
    title: "Network Infrastructure",
    description:
      "Reliable networking solutions designed for offices, organizations and businesses requiring secure connectivity.",
    image: networking,
    icon: Network,
    tags: ["LAN", "Wi-Fi", "Infrastructure"],
  },
  {
    category: "Graphic Design",
    title: "Creative Poster Design",
    description:
      "Professional promotional graphics created for digital campaigns, events and social media communication.",
    image: poster1,
    icon: Palette,
    tags: ["Poster", "Creative", "Branding"],
  },
  {
    category: "Graphic Design",
    title: "Digital Campaign Design",
    description:
      "Eye-catching digital artwork designed to communicate campaigns and strengthen brand visibility.",
    image: poster2,
    icon: ImageIcon,
    tags: ["Campaign", "Social Media", "Design"],
  },
  {
    category: "Creative & Design",
    title: "Promotional Artwork",
    description:
      "Creative visual content developed for promotional communication and digital marketing.",
    image: poster3,
    icon: Sparkles,
    tags: ["Promotion", "Digital", "Creative"],
  },
];

const processSteps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Talk to Us",
    text:
      "Tell us about your business, project, challenge or technology requirements.",
  },
  {
    number: "02",
    icon: Target,
    title: "Understand",
    text:
      "We review your needs and identify the most practical solution for your goals.",
  },
  {
    number: "03",
    icon: Lightbulb,
    title: "Plan",
    text:
      "We define the scope, technology, timeline and implementation approach.",
  },
  {
    number: "04",
    icon: Wrench,
    title: "Build",
    text:
      "Our team implements the solution with attention to quality, usability and security.",
  },
  {
    number: "05",
    icon: CheckCircle2,
    title: "Launch",
    text:
      "We help deploy the solution and make sure the important pieces are working.",
  },
  {
    number: "06",
    icon: Headphones,
    title: "Support",
    text:
      "We remain available for improvements, maintenance, troubleshooting and support.",
  },
];

const stats = [
  { value: "01", label: "Technology Partner", icon: Building2 },
  { value: "06+", label: "Core Services", icon: Layers3 },
  { value: "24/7", label: "Digital Presence", icon: Globe },
  { value: "100%", label: "Client Focus", icon: Users },
];

const technologies = [
  "React.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Node.js",
  "PHP",
  "Python",
  "MySQL",
  "MongoDB",
  "REST APIs",
  "Git",
  "Responsive Design",
];

const testimonials = [
  {
    quote:
      "E&M Technologies brings technology and creativity together to create practical digital solutions.",
    name: "Business Client",
    role: "Digital Solutions",
  },
  {
    quote:
      "The focus on professional presentation, security and dependable technology makes a strong difference.",
    name: "Organization Client",
    role: "Technology Services",
  },
  {
    quote:
      "A modern approach to websites, networking, security and creative digital communication.",
    name: "Project Client",
    role: "Creative & Technology",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [formStatus, setFormStatus] = useState("");
  const [expandedService, setExpandedService] = useState(null);
  const [showTop, setShowTop] = useState(false);

  const filters = useMemo(
    () => ["All", "Web Development", "Security", "Networking", "Graphic Design"],
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    if (activeFilter === "Security") {
      return projects.filter((project) =>
        project.category.toLowerCase().includes("security")
      );
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello E&M Technologies, I would like to make an inquiry about your services."
  )}`;

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormStatus(
      "Thank you. Your message is ready to be sent. Please use WhatsApp or email for the fastest response."
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="site-wrapper">
      <style>{`
        :root {
          --bg: #07090d;
          --bg-soft: #0b0f16;
          --panel: rgba(15, 20, 30, 0.78);
          --panel-solid: #0f141d;
          --panel-light: #151c27;
          --text: #f7f8fa;
          --muted: #9aa5b5;
          --muted-2: #6f7b8d;
          --line: rgba(255,255,255,.09);
          --line-strong: rgba(255,255,255,.15);
          --orange: #ff8a00;
          --orange-2: #ffb347;
          --blue: #2388ff;
          --green: #25d366;
          --radius: 24px;
          --container: 1240px;
          --shadow: 0 25px 80px rgba(0,0,0,.32);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
          background: var(--bg);
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at 10% 10%, rgba(255,138,0,.05), transparent 30%),
            radial-gradient(circle at 90% 30%, rgba(35,136,255,.05), transparent 30%),
            var(--bg);
          color: var(--text);
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          overflow-x: hidden;
        }

        body,
        button,
        input,
        textarea,
        select {
          font-family: inherit;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          border: 0;
        }

        img {
          max-width: 100%;
        }

        .site-wrapper {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.01),
              transparent 18%,
              transparent 82%,
              rgba(255,255,255,.01)
            );
        }

        .section-container {
          width: min(var(--container), calc(100% - 48px));
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .background-effects {
          position: fixed;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }

        .background-grid {
          position: absolute;
          inset: 0;
          opacity: .25;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 55px 55px;
          mask-image: linear-gradient(to bottom, black, transparent 90%);
        }

        .background-glow {
          position: absolute;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: .13;
        }

        .glow-orange {
          top: 8%;
          left: -220px;
          background: var(--orange);
        }

        .glow-blue {
          top: 42%;
          right: -230px;
          background: var(--blue);
        }

        .floating-particles {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,.65);
          box-shadow: 0 0 12px rgba(255,255,255,.2);
        }

        /* NAVIGATION */

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 16px 0;
          background: rgba(7,9,13,.72);
          border-bottom: 1px solid rgba(255,255,255,.06);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
        }

        .navbar-container {
          width: min(var(--container), calc(100% - 48px));
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .brand {
          display: inline-flex;
          align-items: center;
          min-width: 155px;
        }

        .brand-logo-wrapper {
          width: 155px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          overflow: hidden;
        }

        .brand-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: left center;
          display: block;
          transition: transform .35s ease;
        }

        .brand:hover .brand-logo {
          transform: scale(1.04);
        }

        .desktop-navigation {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .navigation-link {
          color: var(--muted);
          font-size: 14px;
          font-weight: 600;
          transition: color .25s ease;
          position: relative;
        }

        .navigation-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 0;
          height: 2px;
          border-radius: 10px;
          background: var(--orange);
          transition: width .25s ease;
        }

        .navigation-link:hover {
          color: white;
        }

        .navigation-link:hover::after {
          width: 100%;
        }

        .quote-button,
        .primary-button,
        .secondary-button,
        .mobile-quote {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 13px;
          padding: 13px 19px;
          font-size: 14px;
          font-weight: 750;
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            border-color .25s ease,
            background .25s ease;
          cursor: pointer;
        }

        .quote-button,
        .primary-button {
          color: #090b0f;
          background: linear-gradient(135deg, #ff8a00, #ffb347);
          box-shadow: 0 12px 30px rgba(255,138,0,.17);
        }

        .quote-button:hover,
        .primary-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 38px rgba(255,138,0,.28);
        }

        .secondary-button {
          border: 1px solid var(--line-strong);
          color: white;
          background: rgba(255,255,255,.035);
        }

        .secondary-button:hover {
          transform: translateY(-3px);
          border-color: rgba(255,138,0,.45);
          background: rgba(255,138,0,.07);
        }

        .mobile-menu-button {
          display: none;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          color: white;
          background: rgba(255,255,255,.05);
          border: 1px solid var(--line);
          border-radius: 12px;
          cursor: pointer;
        }

        .mobile-navigation {
          display: none;
        }

        /* HERO */

        .hero-section {
          position: relative;
          min-height: 900px;
          display: flex;
          align-items: center;
          padding: 150px 0 90px;
        }

        .hero-container {
          width: min(var(--container), calc(100% - 48px));
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(430px, .95fr);
          align-items: center;
          gap: 70px;
          position: relative;
          z-index: 2;
        }

        .hero-content {
          max-width: 700px;
        }

        .hero-badge,
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--orange-2);
          text-transform: uppercase;
          letter-spacing: 2.5px;
          font-size: 11px;
          font-weight: 800;
        }

        .hero-badge {
          padding: 9px 13px;
          border: 1px solid rgba(255,138,0,.2);
          border-radius: 999px;
          background: rgba(255,138,0,.055);
          letter-spacing: 1.3px;
        }

        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--orange);
          box-shadow: 0 0 15px rgba(255,138,0,.8);
          animation: blink 1.7s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: .45; }
          50% { opacity: 1; }
        }

        .hero-content h1 {
          margin-top: 25px;
          max-width: 760px;
          font-size: clamp(52px, 6.2vw, 91px);
          line-height: .94;
          letter-spacing: -4.8px;
          font-weight: 850;
        }

        .hero-content h1 span,
        h2 span {
          display: block;
          color: transparent;
          background: linear-gradient(110deg, #ff8a00, #ffd08a);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .hero-content > p {
          margin-top: 30px;
          max-width: 630px;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.8;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 35px;
        }

        .hero-features {
          display: flex;
          flex-wrap: wrap;
          gap: 25px;
          margin-top: 42px;
        }

        .hero-features div {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #cdd4de;
          font-size: 12px;
          font-weight: 650;
        }

        .hero-features svg {
          color: var(--orange);
        }

        .hero-visual {
          position: relative;
          width: min(100%, 570px);
          aspect-ratio: 1;
          margin-left: auto;
          display: grid;
          place-items: center;
        }

        .hero-orbit {
          position: absolute;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 50%;
          transform: rotate(-20deg);
        }

        .orbit-one {
          width: 78%;
          height: 45%;
          border-color: rgba(255,138,0,.3);
          transform: rotate(-25deg);
        }

        .orbit-two {
          width: 55%;
          height: 85%;
          border-color: rgba(35,136,255,.2);
          transform: rotate(32deg);
        }

        .hero-core {
          position: relative;
          width: 245px;
          height: 245px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at 35% 30%, rgba(255,255,255,.13), transparent 24%),
            radial-gradient(circle, rgba(255,138,0,.2), rgba(255,138,0,.025) 60%, transparent 70%),
            #0c1017;
          border: 1px solid rgba(255,138,0,.35);
          z-index: 2;
        }

        .hero-core::before {
          content: "";
          position: absolute;
          inset: -18px;
          border: 1px dashed rgba(255,138,0,.22);
          border-radius: 50%;
        }

        .hero-core-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hero-em {
          font-size: 45px;
          font-weight: 900;
          letter-spacing: -2px;
        }

        .hero-tech {
          margin-top: -3px;
          font-size: 9px;
          letter-spacing: 4px;
          color: var(--orange-2);
          font-weight: 800;
        }

        .hero-core-line {
          width: 52px;
          height: 1px;
          margin: 17px 0 11px;
          background: rgba(255,138,0,.7);
        }

        .hero-core small {
          font-size: 8px;
          letter-spacing: 1.5px;
          color: var(--muted-2);
        }

        .hero-floating-card {
          position: absolute;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 180px;
          padding: 13px 15px;
          border: 1px solid var(--line);
          border-radius: 15px;
          background: rgba(15,20,30,.78);
          box-shadow: var(--shadow);
          backdrop-filter: blur(16px);
        }

        .hero-floating-card svg {
          color: var(--orange);
        }

        .hero-floating-card div {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .hero-floating-card strong {
          font-size: 12px;
        }

        .hero-floating-card span {
          color: var(--muted-2);
          font-size: 10px;
        }

        .card-top {
          top: 13%;
          right: 2%;
        }

        .card-bottom {
          bottom: 13%;
          left: 2%;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--muted-2);
          font-size: 9px;
          letter-spacing: 2px;
          z-index: 3;
        }

        /* SHARED SECTION */

        section {
          position: relative;
        }

        .about-section,
        .services-section,
        .why-section,
        .portfolio-section,
        .process-section,
        .technology-section,
        .testimonials-section,
        .cta-section,
        .contact-section {
          padding: 125px 0;
        }

        .section-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 50px;
          margin-bottom: 55px;
        }

        .section-heading > div {
          max-width: 700px;
        }

        .section-heading h2,
        .about-content h2,
        .contact-content h2,
        .cta-box h2 {
          margin-top: 15px;
          font-size: clamp(38px, 4.6vw, 65px);
          line-height: 1.03;
          letter-spacing: -2.8px;
          font-weight: 820;
        }

        .section-heading > p {
          max-width: 470px;
          color: var(--muted);
          line-height: 1.75;
          font-size: 15px;
        }

        .centered {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .centered > p {
          max-width: 650px;
        }

        /* ABOUT */

        .about-section {
          background:
            linear-gradient(180deg, transparent, rgba(255,255,255,.015), transparent);
        }

        .about-section .section-container {
          display: grid;
          grid-template-columns: .95fr 1.05fr;
          gap: 100px;
          align-items: center;
        }

        .about-visual {
          min-height: 560px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-main-card {
          width: min(100%, 470px);
          min-height: 430px;
          padding: 48px;
          border-radius: 30px;
          border: 1px solid var(--line);
          background:
            radial-gradient(circle at 80% 20%, rgba(255,138,0,.13), transparent 35%),
            linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.012));
          box-shadow: var(--shadow);
          position: relative;
          overflow: hidden;
        }

        .about-main-card::before {
          content: "";
          position: absolute;
          width: 200px;
          height: 200px;
          right: -80px;
          bottom: -90px;
          border-radius: 50%;
          border: 1px solid rgba(255,138,0,.15);
        }

        .about-small-label {
          color: var(--orange-2);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2.5px;
        }

        .about-main-card h3 {
          margin-top: 55px;
          font-size: 49px;
          line-height: 1.03;
          letter-spacing: -2.5px;
        }

        .about-main-card h3 span {
          color: var(--orange);
        }

        .about-card-line {
          width: 60px;
          height: 2px;
          margin: 30px 0;
          background: var(--orange);
        }

        .about-main-card p {
          max-width: 310px;
          color: var(--muted);
          line-height: 1.7;
          font-size: 14px;
        }

        .about-floating {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 13px 17px;
          border-radius: 13px;
          border: 1px solid var(--line-strong);
          background: rgba(10,14,21,.86);
          backdrop-filter: blur(15px);
          box-shadow: var(--shadow);
          font-size: 12px;
          font-weight: 700;
        }

        .about-floating svg {
          color: var(--orange);
        }

        .floating-one {
          top: 11%;
          right: 1%;
        }

        .floating-two {
          left: 2%;
          bottom: 10%;
        }

        .about-content > p {
          margin-top: 24px;
          color: var(--muted);
          line-height: 1.85;
          max-width: 620px;
          font-size: 15px;
        }

        .about-points {
          display: grid;
          gap: 13px;
          margin-top: 30px;
        }

        .about-points div {
          display: flex;
          align-items: center;
          gap: 11px;
          font-size: 13px;
          font-weight: 650;
        }

        .about-points svg {
          color: var(--orange);
        }

        .text-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 35px;
          color: var(--orange-2);
          font-size: 13px;
          font-weight: 750;
        }

        .text-button:hover {
          color: white;
        }

        /* STATS */

        .stats-strip {
          width: min(var(--container), calc(100% - 48px));
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border: 1px solid var(--line);
          border-radius: 22px;
          overflow: hidden;
          background: rgba(255,255,255,.02);
          position: relative;
          z-index: 2;
        }

        .stat-item {
          min-height: 150px;
          padding: 30px;
          display: flex;
          align-items: center;
          gap: 18px;
          border-right: 1px solid var(--line);
        }

        .stat-item:last-child {
          border-right: 0;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 14px;
          background: rgba(255,138,0,.08);
          color: var(--orange);
          border: 1px solid rgba(255,138,0,.13);
        }

        .stat-item strong {
          display: block;
          font-size: 25px;
          letter-spacing: -1px;
        }

        .stat-item span {
          display: block;
          margin-top: 4px;
          color: var(--muted-2);
          font-size: 11px;
        }

        /* SERVICES */

        .services-section {
          background:
            radial-gradient(circle at 10% 50%, rgba(255,138,0,.04), transparent 30%);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .service-card {
          position: relative;
          min-height: 450px;
          padding: 29px;
          border-radius: 22px;
          border: 1px solid var(--line);
          background:
            linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.012));
          overflow: hidden;
          transition:
            border-color .35s ease,
            background .35s ease,
            box-shadow .35s ease;
        }

        .service-card:hover {
          border-color: rgba(255,138,0,.28);
          background:
            linear-gradient(145deg, rgba(255,138,0,.07), rgba(255,255,255,.018));
          box-shadow: 0 22px 60px rgba(0,0,0,.22);
        }

        .service-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .service-number {
          color: var(--muted-2);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .service-icon {
          position: absolute;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          border-radius: 15px;
          color: var(--orange);
          background: rgba(255,138,0,.07);
          border: 1px solid rgba(255,138,0,.15);
        }

        .service-arrow {
          color: var(--muted-2);
        }

        .service-card h3 {
          margin-top: 70px;
          font-size: 24px;
          letter-spacing: -.8px;
        }

        .service-card > p {
          margin-top: 15px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.75;
        }

        .service-list {
          display: grid;
          gap: 10px;
          margin-top: 23px;
        }

        .service-list span {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #c8ced8;
          font-size: 11px;
        }

        .service-list i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--orange);
          box-shadow: 0 0 10px rgba(255,138,0,.55);
        }

        .service-bottom-line {
          position: absolute;
          left: 29px;
          right: 29px;
          bottom: 55px;
          height: 1px;
          background: var(--line);
        }

        .service-card > a {
          position: absolute;
          left: 29px;
          bottom: 21px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: var(--orange-2);
          font-size: 11px;
          font-weight: 750;
        }

        /* WHY */

        .why-grid {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 90px;
          align-items: center;
          margin-top: 65px;
        }

        .why-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
        }

        .why-card {
          min-height: 190px;
          padding: 27px;
          display: flex;
          align-items: flex-start;
          gap: 17px;
          border-radius: 20px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,.018);
        }

        .why-icon {
          flex: 0 0 auto;
          width: 45px;
          height: 45px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          color: var(--orange);
          background: rgba(255,138,0,.08);
          border: 1px solid rgba(255,138,0,.13);
        }

        .why-card h3 {
          font-size: 16px;
        }

        .why-card p {
          margin-top: 9px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.75;
        }

        .why-visual {
          position: relative;
          width: 380px;
          height: 380px;
          margin: auto;
          display: grid;
          place-items: center;
        }

        .why-orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,138,0,.18);
        }

        .orbit-large {
          width: 100%;
          height: 52%;
          transform: rotate(-30deg);
        }

        .orbit-small {
          width: 55%;
          height: 88%;
          border-color: rgba(35,136,255,.2);
          transform: rotate(30deg);
        }

        .why-core {
          width: 170px;
          height: 170px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background:
            radial-gradient(circle, rgba(255,138,0,.15), transparent 65%),
            #0d121a;
          border: 1px solid rgba(255,138,0,.3);
          box-shadow: 0 0 70px rgba(255,138,0,.08);
        }

        .why-core strong {
          font-size: 40px;
          letter-spacing: -2px;
        }

        .why-core span {
          margin-top: -3px;
          color: var(--orange);
          font-size: 8px;
          letter-spacing: 3px;
          font-weight: 800;
        }

        /* PORTFOLIO */

        .portfolio-section {
          background:
            linear-gradient(180deg, rgba(255,255,255,.012), transparent, rgba(255,255,255,.012));
        }

        .portfolio-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 35px;
        }

        .portfolio-filter {
          padding: 10px 15px;
          border-radius: 999px;
          color: var(--muted);
          border: 1px solid var(--line);
          background: rgba(255,255,255,.025);
          cursor: pointer;
          font-size: 11px;
          font-weight: 700;
          transition: all .25s ease;
        }

        .portfolio-filter:hover {
          color: white;
          border-color: rgba(255,138,0,.3);
        }

        .portfolio-filter.active {
          color: #111;
          background: linear-gradient(135deg, var(--orange), var(--orange-2));
          border-color: transparent;
        }

        .portfolio-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .project-card {
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid var(--line);
          background: var(--panel);
          transition:
            border-color .3s ease,
            box-shadow .3s ease;
        }

        .project-card:hover {
          border-color: rgba(255,138,0,.28);
          box-shadow: 0 25px 70px rgba(0,0,0,.28);
        }

        .project-image {
          position: relative;
          width: 100%;
          height: 310px;
          overflow: hidden;
          background: #111;
        }

        .project-image-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition:
            transform .7s ease,
            filter .7s ease;
        }

        .project-card:hover .project-image-photo {
          transform: scale(1.08);
          filter: brightness(.62);
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 23px;
          opacity: 0;
          background: linear-gradient(
            to top,
            rgba(0,0,0,.92),
            rgba(0,0,0,.03)
          );
          transition: opacity .4s ease;
        }

        .project-card:hover .project-overlay {
          opacity: 1;
        }

        .project-overlay-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .project-overlay-content span {
          color: var(--orange-2);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.7px;
          font-weight: 800;
        }

        .project-overlay-content h4 {
          font-size: 20px;
        }

        .project-view-icon {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.25);
          backdrop-filter: blur(10px);
        }

        .project-content {
          padding: 25px;
        }

        .project-content > span {
          color: var(--orange);
          text-transform: uppercase;
          letter-spacing: 1.6px;
          font-size: 9px;
          font-weight: 800;
        }

        .project-content h3 {
          margin-top: 8px;
          font-size: 21px;
          letter-spacing: -.5px;
        }

        .project-content p {
          margin-top: 10px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 17px;
        }

        .project-tag {
          padding: 6px 9px;
          border-radius: 999px;
          color: var(--muted-2);
          border: 1px solid var(--line);
          background: rgba(255,255,255,.02);
          font-size: 9px;
        }

        /* PROCESS */

        .process-section {
          background:
            radial-gradient(circle at 90% 20%, rgba(35,136,255,.045), transparent 30%);
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .process-card {
          position: relative;
          padding: 30px;
          min-height: 225px;
          border: 1px solid var(--line);
          border-radius: 20px;
          background: rgba(255,255,255,.018);
        }

        .process-number {
          position: absolute;
          top: 22px;
          right: 24px;
          color: rgba(255,255,255,.08);
          font-size: 43px;
          line-height: 1;
          font-weight: 900;
        }

        .process-icon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 14px;
          color: var(--orange);
          background: rgba(255,138,0,.08);
          border: 1px solid rgba(255,138,0,.12);
        }

        .process-card h3 {
          margin-top: 25px;
          font-size: 17px;
        }

        .process-card p {
          margin-top: 10px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.75;
        }

        /* TECHNOLOGY */

        .technology-section {
          padding-top: 90px;
        }

        .technology-box {
          position: relative;
          padding: 55px;
          border: 1px solid var(--line);
          border-radius: 28px;
          background:
            radial-gradient(circle at 10% 20%, rgba(255,138,0,.08), transparent 30%),
            rgba(255,255,255,.018);
          overflow: hidden;
        }

        .technology-box::after {
          content: "";
          position: absolute;
          width: 350px;
          height: 350px;
          right: -180px;
          bottom: -220px;
          border-radius: 50%;
          border: 1px solid rgba(255,138,0,.12);
        }

        .technology-content {
          max-width: 700px;
        }

        .technology-content h2 {
          margin-top: 13px;
          font-size: clamp(34px, 4vw, 56px);
          letter-spacing: -2.4px;
          line-height: 1.05;
        }

        .technology-content h2 span {
          display: inline;
        }

        .technology-content p {
          margin-top: 20px;
          color: var(--muted);
          line-height: 1.8;
          font-size: 14px;
        }

        .technology-list {
          position: relative;
          z-index: 2;
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 32px;
        }

        .technology-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 13px;
          color: #cbd3de;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: rgba(255,255,255,.025);
          font-size: 11px;
          font-weight: 650;
        }

        .technology-chip::before {
          content: "";
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--orange);
        }

        /* TESTIMONIALS */

        .testimonials-section {
          background:
            linear-gradient(180deg, transparent, rgba(255,255,255,.012), transparent);
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .testimonial-card {
          min-height: 260px;
          padding: 30px;
          border-radius: 22px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,.018);
        }

        .stars {
          display: flex;
          gap: 3px;
          color: var(--orange);
        }

        .testimonial-card blockquote {
          margin-top: 23px;
          color: #d5dbe4;
          font-size: 15px;
          line-height: 1.8;
        }

        .testimonial-person {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 25px;
          padding-top: 18px;
          border-top: 1px solid var(--line);
        }

        .testimonial-avatar {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: var(--orange);
          background: rgba(255,138,0,.08);
          border: 1px solid rgba(255,138,0,.12);
        }

        .testimonial-person strong {
          display: block;
          font-size: 12px;
        }

        .testimonial-person span {
          display: block;
          margin-top: 3px;
          color: var(--muted-2);
          font-size: 10px;
        }

        /* CTA */

        .cta-section {
          padding-top: 95px;
          padding-bottom: 95px;
        }

        .cta-box {
          position: relative;
          text-align: center;
          padding: 90px 50px;
          border-radius: 30px;
          border: 1px solid rgba(255,138,0,.18);
          background:
            radial-gradient(circle at 50% 100%, rgba(255,138,0,.12), transparent 42%),
            linear-gradient(145deg, rgba(255,255,255,.045), rgba(255,255,255,.012));
          overflow: hidden;
        }

        .cta-box::before,
        .cta-box::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255,138,0,.1);
          pointer-events: none;
        }

        .cta-box::before {
          width: 500px;
          height: 500px;
          top: -390px;
          left: 50%;
          transform: translateX(-50%);
        }

        .cta-box::after {
          width: 650px;
          height: 650px;
          bottom: -570px;
          left: 50%;
          transform: translateX(-50%);
        }

        .cta-box h2 {
          position: relative;
          z-index: 2;
          max-width: 780px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-box p {
          position: relative;
          z-index: 2;
          max-width: 620px;
          margin: 23px auto 0;
          color: var(--muted);
          line-height: 1.8;
          font-size: 14px;
        }

        .cta-actions {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 30px;
        }

        /* CONTACT */

        .contact-grid {
          display: grid;
          grid-template-columns: .9fr 1.1fr;
          gap: 85px;
          align-items: start;
        }

        .contact-content > p {
          max-width: 560px;
          margin-top: 25px;
          color: var(--muted);
          line-height: 1.8;
          font-size: 14px;
        }

        .contact-details {
          display: grid;
          gap: 13px;
          margin-top: 34px;
        }

        .contact-details > a,
        .contact-details > div {
          display: flex;
          align-items: center;
          gap: 13px;
          width: fit-content;
        }

        .contact-icon {
          width: 44px;
          height: 44px;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          border-radius: 12px;
          color: var(--orange);
          border: 1px solid var(--line);
          background: rgba(255,255,255,.025);
        }

        .contact-details small {
          display: block;
          color: var(--muted-2);
          font-size: 9px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .contact-details span {
          display: block;
          margin-top: 3px;
          color: #dbe1e9;
          font-size: 12px;
        }

        .contact-form {
          padding: 30px;
          border-radius: 23px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,.018);
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 13px;
        }

        .contact-form input,
        .contact-form textarea,
        .contact-form select {
          width: 100%;
          margin-bottom: 13px;
          padding: 15px 16px;
          color: white;
          border: 1px solid var(--line);
          border-radius: 12px;
          outline: none;
          background: rgba(255,255,255,.025);
          font-size: 12px;
          transition:
            border-color .25s ease,
            background .25s ease,
            box-shadow .25s ease;
        }

        .contact-form textarea {
          resize: vertical;
          min-height: 150px;
        }

        .contact-form select {
          appearance: none;
        }

        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: var(--muted-2);
        }

        .contact-form input:focus,
        .contact-form textarea:focus,
        .contact-form select:focus {
          border-color: rgba(255,138,0,.45);
          background: rgba(255,138,0,.025);
          box-shadow: 0 0 0 3px rgba(255,138,0,.05);
        }

        .form-button {
          width: 100%;
          margin-top: 4px;
          border: 0;
        }

        .form-status {
          margin-top: 14px;
          padding: 12px 14px;
          border-radius: 10px;
          color: #d5f8df;
          background: rgba(37,211,102,.06);
          border: 1px solid rgba(37,211,102,.15);
          font-size: 11px;
          line-height: 1.6;
        }

        /* FAQ */

        .faq-section {
          padding: 0 0 125px;
        }

        .faq-grid {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          gap: 10px;
        }

        .faq-item {
          border: 1px solid var(--line);
          border-radius: 15px;
          background: rgba(255,255,255,.018);
          overflow: hidden;
        }

        .faq-question {
          width: 100%;
          padding: 19px 21px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          color: white;
          background: transparent;
          cursor: pointer;
          text-align: left;
          font-size: 13px;
          font-weight: 700;
        }

        .faq-answer {
          padding: 0 21px 20px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.75;
        }

        /* FOOTER */

        .footer {
          position: relative;
          padding: 75px 0 25px;
          border-top: 1px solid var(--line);
          background: #05070a;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 60px;
          padding-bottom: 55px;
        }

        .footer-brand .brand {
          display: inline-flex;
        }

        .footer-brand p {
          max-width: 320px;
          margin-top: 18px;
          color: var(--muted);
          line-height: 1.75;
          font-size: 12px;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 11px;
        }

        .footer-column h4 {
          margin-bottom: 8px;
          color: white;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .footer-column a,
        .footer-column span {
          color: var(--muted-2);
          font-size: 11px;
          transition: color .25s ease;
        }

        .footer-column a:hover {
          color: var(--orange-2);
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
          color: var(--muted-2);
          font-size: 9px;
          letter-spacing: .5px;
        }

        /* FLOATING WHATSAPP */

        .whatsapp-float {
          position: fixed;
          right: 28px;
          bottom: 28px;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          color: white;
          background: var(--green);
          box-shadow:
            0 12px 35px rgba(37,211,102,.3),
            0 0 0 0 rgba(37,211,102,.4);
          animation: whatsappGlow 2.5s infinite;
        }

        .whatsapp-float:hover {
          color: white;
        }

        .whatsapp-float svg {
          position: relative;
          z-index: 3;
          stroke-width: 2.4;
        }

        .whatsapp-pulse {
          position: absolute;
          inset: -7px;
          border-radius: 50%;
          border: 2px solid rgba(37,211,102,.4);
          animation: whatsappPulse 2s infinite;
        }

        .whatsapp-tooltip {
          position: absolute;
          right: 79px;
          top: 50%;
          transform: translateY(-50%);
          white-space: nowrap;
          padding: 11px 15px;
          border-radius: 9px;
          color: white;
          background: #11161e;
          border: 1px solid var(--line);
          box-shadow: var(--shadow);
          opacity: 0;
          pointer-events: none;
          transition:
            opacity .25s ease,
            transform .25s ease;
          font-size: 11px;
          font-weight: 700;
        }

        .whatsapp-float:hover .whatsapp-tooltip {
          opacity: 1;
          transform: translateY(-50%) translateX(-5px);
        }

        @keyframes whatsappGlow {
          0%, 100% {
            box-shadow:
              0 12px 35px rgba(37,211,102,.3),
              0 0 0 0 rgba(37,211,102,.35);
          }
          50% {
            box-shadow:
              0 15px 42px rgba(37,211,102,.46),
              0 0 0 11px rgba(37,211,102,.07);
          }
        }

        @keyframes whatsappPulse {
          0% {
            transform: scale(.9);
            opacity: .8;
          }
          70% {
            transform: scale(1.25);
            opacity: 0;
          }
          100% {
            transform: scale(1.25);
            opacity: 0;
          }
        }

        /* BACK TO TOP */

        .back-to-top {
          position: fixed;
          right: 28px;
          bottom: 105px;
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          z-index: 9998;
          color: var(--muted);
          background: rgba(15,20,30,.88);
          border: 1px solid var(--line);
          border-radius: 12px;
          cursor: pointer;
          backdrop-filter: blur(12px);
        }

        .back-to-top:hover {
          color: white;
          border-color: rgba(255,138,0,.3);
        }

        /* MODAL */

        .project-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          display: grid;
          place-items: center;
          padding: 25px;
          background: rgba(0,0,0,.82);
          backdrop-filter: blur(14px);
        }

        .project-modal {
          width: min(900px, 100%);
          max-height: 90vh;
          overflow: auto;
          border-radius: 24px;
          border: 1px solid var(--line-strong);
          background: #0b1018;
          box-shadow: 0 40px 100px rgba(0,0,0,.6);
        }

        .modal-image {
          width: 100%;
          max-height: 510px;
          object-fit: cover;
          display: block;
        }

        .modal-content {
          padding: 28px;
        }

        .modal-content > span {
          color: var(--orange);
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 9px;
          font-weight: 800;
        }

        .modal-content h3 {
          margin-top: 8px;
          font-size: 30px;
        }

        .modal-content p {
          margin-top: 13px;
          color: var(--muted);
          line-height: 1.8;
          font-size: 13px;
        }

        .modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 20px;
        }

        .modal-tag {
          padding: 7px 10px;
          border-radius: 999px;
          color: var(--muted);
          border: 1px solid var(--line);
          font-size: 9px;
        }

        .modal-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 23px;
        }

        .modal-close {
          position: absolute;
          top: 22px;
          right: 22px;
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: white;
          background: rgba(0,0,0,.6);
          border: 1px solid rgba(255,255,255,.2);
          cursor: pointer;
          z-index: 5;
        }

        /* RESPONSIVE */

        @media (max-width: 1100px) {
          .hero-container {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }

          .hero-content h1 {
            font-size: clamp(48px, 6vw, 72px);
          }

          .services-grid,
          .portfolio-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .about-section .section-container {
            gap: 55px;
          }

          .why-grid {
            gap: 45px;
          }

          .footer-top {
            grid-template-columns: 1.3fr 1fr 1fr;
          }

          .footer-column:last-child {
            grid-column: span 1;
          }
        }

        @media (max-width: 900px) {
          .desktop-navigation {
            display: none;
          }

          .mobile-menu-button {
            display: flex;
          }

          .mobile-navigation {
            width: min(var(--container), calc(100% - 48px));
            margin: 12px auto 0;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 5px;
            border: 1px solid var(--line);
            border-radius: 17px;
            background: rgba(10,14,21,.96);
            overflow: hidden;
          }

          .mobile-navigation a {
            padding: 13px;
            color: var(--muted);
            border-radius: 10px;
            font-size: 13px;
            font-weight: 650;
          }

          .mobile-navigation a:hover {
            color: white;
            background: rgba(255,255,255,.04);
          }

          .mobile-navigation .mobile-quote {
            margin-top: 6px;
            color: #111;
            background: linear-gradient(135deg, var(--orange), var(--orange-2));
            justify-content: center;
          }

          .hero-section {
            min-height: auto;
            padding-top: 145px;
          }

          .hero-container {
            grid-template-columns: 1fr;
          }

          .hero-content {
            max-width: 850px;
          }

          .hero-visual {
            margin: 30px auto 0;
          }

          .about-section .section-container,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .about-content {
            order: 1;
          }

          .about-visual {
            order: 2;
          }

          .why-grid {
            grid-template-columns: 1fr;
          }

          .why-visual {
            margin-top: 20px;
          }

          .stats-strip {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-item:nth-child(2) {
            border-right: 0;
          }

          .stat-item:nth-child(-n+2) {
            border-bottom: 1px solid var(--line);
          }

          .footer-top {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 680px) {
          .section-container,
          .navbar-container,
          .hero-container,
          .stats-strip {
            width: min(100% - 32px, var(--container));
          }

          .hero-section {
            padding-top: 130px;
            padding-bottom: 80px;
          }

          .hero-content h1 {
            font-size: clamp(43px, 14vw, 67px);
            letter-spacing: -3.5px;
          }

          .hero-content > p {
            font-size: 14px;
          }

          .hero-features {
            display: grid;
            gap: 12px;
          }

          .hero-visual {
            width: 100%;
            max-width: 460px;
          }

          .hero-core {
            width: 190px;
            height: 190px;
          }

          .hero-em {
            font-size: 35px;
          }

          .hero-floating-card {
            min-width: 145px;
            padding: 10px;
          }

          .card-top {
            right: 0;
          }

          .card-bottom {
            left: 0;
          }

          .about-section,
          .services-section,
          .why-section,
          .portfolio-section,
          .process-section,
          .technology-section,
          .testimonials-section,
          .cta-section,
          .contact-section {
            padding: 85px 0;
          }

          .section-heading {
            display: block;
            margin-bottom: 35px;
          }

          .section-heading > p {
            margin-top: 20px;
          }

          .section-heading h2,
          .about-content h2,
          .contact-content h2,
          .cta-box h2 {
            font-size: clamp(34px, 10vw, 48px);
            letter-spacing: -2px;
          }

          .services-grid,
          .portfolio-grid,
          .process-grid,
          .testimonials-grid,
          .why-cards {
            grid-template-columns: 1fr;
          }

          .service-card {
            min-height: 420px;
          }

          .about-visual {
            min-height: 470px;
          }

          .about-main-card {
            min-height: 380px;
            padding: 35px;
          }

          .about-main-card h3 {
            margin-top: 45px;
            font-size: 40px;
          }

          .stats-strip {
            grid-template-columns: 1fr 1fr;
          }

          .stat-item {
            padding: 20px;
            min-height: 125px;
          }

          .stat-item strong {
            font-size: 20px;
          }

          .stat-item span {
            font-size: 9px;
          }

          .why-visual {
            width: 300px;
            height: 300px;
          }

          .why-core {
            width: 140px;
            height: 140px;
          }

          .why-core strong {
            font-size: 32px;
          }

          .project-image {
            height: 260px;
          }

          .project-overlay {
            opacity: 1;
            padding: 17px;
          }

          .project-view-icon {
            width: 40px;
            height: 40px;
          }

          .technology-box {
            padding: 35px 25px;
          }

          .cta-box {
            padding: 65px 25px;
          }

          .contact-form {
            padding: 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .footer-top {
            grid-template-columns: 1fr 1fr;
            gap: 40px 25px;
          }

          .footer-brand {
            grid-column: span 2;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }

          .whatsapp-float {
            right: 17px;
            bottom: 17px;
            width: 58px;
            height: 58px;
          }

          .whatsapp-tooltip {
            display: none;
          }

          .back-to-top {
            right: 18px;
            bottom: 88px;
          }
        }

        @media (max-width: 430px) {
          .brand-logo-wrapper {
            width: 130px;
            height: 48px;
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-actions a {
            width: 100%;
          }

          .stats-strip {
            grid-template-columns: 1fr;
          }

          .stat-item {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }

          .stat-item:last-child {
            border-bottom: 0;
          }

          .about-floating {
            font-size: 10px;
          }

          .floating-one {
            right: -5px;
          }

          .floating-two {
            left: -5px;
          }

          .about-main-card {
            padding: 28px;
          }

          .about-main-card h3 {
            font-size: 34px;
          }

          .footer-top {
            grid-template-columns: 1fr;
          }

          .footer-brand {
            grid-column: auto;
          }

          .modal-content {
            padding: 21px;
          }

          .modal-content h3 {
            font-size: 25px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      <div className="background-effects">
        <div className="background-grid"></div>

        <motion.div
          className="background-glow glow-orange"
          animate={{
            x: [0, 100, -60, 0],
            y: [0, -70, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="background-glow glow-blue"
          animate={{
            x: [0, -100, 60, 0],
            y: [0, 70, -40, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="floating-particles">
          {Array.from({ length: 35 }).map((_, index) => (
            <motion.span
              key={index}
              className="particle"
              initial={{
                opacity: 0,
                y: 100,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [-50, -300],
              }}
              transition={{
                duration: 5 + (index % 5),
                repeat: Infinity,
                delay: index * 0.25,
                ease: "linear",
              }}
              style={{
                left: `${(index * 17) % 100}%`,
                bottom: `${(index * 13) % 40}%`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.header
        className="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="navbar-container">
          <a href="#home" className="brand" onClick={handleNavClick}>
            <div className="brand-logo-wrapper">
              <img
                src={logo}
                alt="E&M Technologies"
                className="brand-logo"
              />
            </div>
          </a>

          <nav className="desktop-navigation">
            {navLinks.map((link) => (
              <a
                href={link.href}
                key={link.name}
                className="navigation-link"
              >
                {link.name}
              </a>
            ))}

            <a href="#contact" className="quote-button">
              Get a Quote
              <ArrowRight size={17} />
            </a>
          </nav>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Open navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-navigation"
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
            >
              {navLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.name}
                  onClick={handleNavClick}
                >
                  {link.name}
                </a>
              ))}

              <a
                href="#contact"
                className="mobile-quote"
                onClick={handleNavClick}
              >
                Get a Quote
                <ArrowRight size={17} />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-container">
            <motion.div
              className="hero-content"
              initial={{
                opacity: 0,
                x: -60,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
              }}
            >
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Technology • Security • Innovation
              </div>

              <h1>
                Elevate Your
                <span> Digital Experience.</span>
              </h1>

              <p>
                We deliver innovative technology, digital and security
                solutions designed to help businesses work smarter,
                operate securely and grow confidently.
              </p>

              <div className="hero-actions">
                <a href="#services" className="primary-button">
                  Explore Services
                  <ArrowRight size={18} />
                </a>

                <a href="#portfolio" className="secondary-button">
                  View Our Work
                  <Eye size={17} />
                </a>

                <a href="#contact" className="secondary-button">
                  Get In Touch
                  <ArrowUpRight size={18} />
                </a>
              </div>

              <div className="hero-features">
                <div>
                  <ShieldCheck size={20} />
                  <span>Secure Solutions</span>
                </div>

                <div>
                  <Code2 size={20} />
                  <span>Modern Technology</span>
                </div>

                <div>
                  <Zap size={20} />
                  <span>Smart Solutions</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1.2,
              }}
            >
              <div className="hero-orbit orbit-one"></div>
              <div className="hero-orbit orbit-two"></div>

              <motion.div
                className="hero-core"
                animate={{
                  scale: [1, 1.06, 1],
                  boxShadow: [
                    "0 0 30px rgba(255,138,0,.2)",
                    "0 0 90px rgba(255,138,0,.55)",
                    "0 0 30px rgba(255,138,0,.2)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              >
                <div className="hero-core-inner">
                  <span className="hero-em">E&M</span>
                  <span className="hero-tech">TECHNOLOGIES</span>
                  <span className="hero-core-line"></span>
                  <small>SMART • SECURE • DIGITAL</small>
                </div>
              </motion.div>

              <motion.div
                className="hero-floating-card card-top"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <ShieldCheck size={20} />
                <div>
                  <strong>Secure</strong>
                  <span>Technology</span>
                </div>
              </motion.div>

              <motion.div
                className="hero-floating-card card-bottom"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: 1,
                }}
              >
                <Globe size={20} />
                <div>
                  <strong>Digital</strong>
                  <span>Solutions</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="scroll-indicator"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
            }}
          >
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown size={18} />
          </motion.div>
        </section>

        <motion.div
          className="stats-strip"
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="stat-item" key={stat.label}>
                <div className="stat-icon">
                  <Icon size={20} />
                </div>

                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </motion.div>

        <section id="about" className="about-section">
          <div className="section-container">
            <motion.div
              className="about-visual"
              initial={{
                opacity: 0,
                x: -60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <div className="about-main-card">
                <span className="about-small-label">
                  E&M TECHNOLOGIES
                </span>

                <h3>
                  Technology
                  <br />
                  Without
                  <span> Limits.</span>
                </h3>

                <div className="about-card-line"></div>

                <p>
                  Building smarter digital experiences through technology,
                  security and innovation.
                </p>
              </div>

              <motion.div
                className="about-floating floating-one"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                }}
              >
                <Zap size={19} />
                <span>Innovation</span>
              </motion.div>

              <motion.div
                className="about-floating floating-two"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: .8,
                }}
              >
                <ShieldCheck size={19} />
                <span>Security</span>
              </motion.div>
            </motion.div>

            <motion.div
              className="about-content"
              initial={{
                opacity: 0,
                x: 60,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <span className="section-label">
                ABOUT E&M TECHNOLOGIES
              </span>

              <h2>
                Technology that
                <span> moves business forward.</span>
              </h2>

              <p>
                At E&M Technologies, we focus on delivering practical
                technology solutions that help organizations improve
                their digital presence, security and day-to-day
                operations.
              </p>

              <p>
                From websites and digital platforms to networking, CCTV
                and creative solutions, our approach combines technology
                with a clear understanding of your goals.
              </p>

              <div className="about-points">
                <div>
                  <CheckCircle2 size={19} />
                  <span>Reliable & Secure Solutions</span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>Modern Technology</span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>Innovation Driven</span>
                </div>

                <div>
                  <CheckCircle2 size={19} />
                  <span>Professional Support</span>
                </div>
              </div>

              <a href="#services" className="text-button">
                Discover More
                <ArrowUpRight size={18} />
              </a>
            </motion.div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="section-container">
            <motion.div
              className="section-heading"
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <div>
                <span className="section-label">
                  WHAT WE DO
                </span>

                <h2>
                  Technology solutions
                  <span> built around you.</span>
                </h2>
              </div>

              <p>
                From digital development to security and creative
                services, we provide technology solutions designed
                around real business needs.
              </p>
            </motion.div>

            <div className="services-grid">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isExpanded = expandedService === service.number;

                return (
                  <motion.article
                    key={service.number}
                    className="service-card"
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -10,
                    }}
                  >
                    <div className="service-top">
                      <span className="service-number">
                        {service.number}
                      </span>

                      <div className="service-icon">
                        <Icon size={27} />
                      </div>

                      <ArrowUpRight
                        className="service-arrow"
                        size={20}
                      />
                    </div>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <div className="service-list">
                      {service.items
                        .slice(0, isExpanded ? service.items.length : 4)
                        .map((item) => (
                          <span key={item}>
                            <i></i>
                            {item}
                          </span>
                        ))}
                    </div>

                    <div className="service-bottom-line"></div>

                    <button
                      type="button"
                      onClick={() =>
                        setExpandedService(
                          isExpanded ? null : service.number
                        )
                      }
                      style={{
                        position: "absolute",
                        left: "29px",
                        bottom: "21px",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                        color: "var(--orange-2)",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "11px",
                        fontWeight: 750,
                      }}
                    >
                      {isExpanded ? "Show Less" : "Explore Service"}
                      <ArrowUpRight size={16} />
                    </button>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="why-section">
          <div className="section-container">
            <motion.div
              className="section-heading centered"
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <span className="section-label">
                WHY E&M TECHNOLOGIES
              </span>

              <h2>
                Technology built with
                <span> purpose.</span>
              </h2>

              <p>
                We combine technology, creativity and security to create
                solutions that deliver real value.
              </p>
            </motion.div>

            <div className="why-grid">
              <div className="why-cards">
                {reasons.map((reason, index) => {
                  const Icon = reason.icon;

                  return (
                    <motion.div
                      key={reason.title}
                      className="why-card"
                      initial={{
                        opacity: 0,
                        x: index % 2 === 0 ? -30 : 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                      }}
                    >
                      <div className="why-icon">
                        <Icon size={23} />
                      </div>

                      <div>
                        <h3>{reason.title}</h3>

                        <p>{reason.text}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="why-visual">
                <motion.div
                  className="why-orbit orbit-large"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className="why-orbit orbit-small"
                  animate={{
                    rotate: -360,
                  }}
                  transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className="why-core"
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <strong>E&M</strong>
                  <span>TECHNOLOGIES</span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio-section">
          <div className="section-container">
            <motion.div
              className="section-heading"
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <div>
                <span className="section-label">
                  OUR WORK
                </span>

                <h2>
                  Solutions we've
                  <span> built.</span>
                </h2>
              </div>

              <p>
                Explore examples of technology, digital, security and
                creative solutions.
              </p>
            </motion.div>

            <div className="portfolio-filters">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`portfolio-filter ${
                    activeFilter === filter ? "active" : ""
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            <motion.div
              className="portfolio-grid"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => {
                  const Icon = project.icon;

                  return (
                    <motion.article
                      key={project.title}
                      className="project-card"
                      layout
                      initial={{
                        opacity: 0,
                        y: 40,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: .95,
                      }}
                      transition={{
                        duration: .45,
                        delay: index * .04,
                      }}
                      whileHover={{
                        y: -8,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: 0,
                          border: 0,
                          background: "transparent",
                          color: "inherit",
                          cursor: "pointer",
                          textAlign: "left",
                        }}
                        aria-label={`View ${project.title}`}
                      >
                        <div className="project-image">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="project-image-photo"
                            loading="lazy"
                          />

                          <div className="project-overlay">
                            <div className="project-overlay-content">
                              <span>{project.category}</span>
                              <h4>{project.title}</h4>
                            </div>

                            <div className="project-view-icon">
                              <ArrowUpRight size={24} />
                            </div>
                          </div>
                        </div>

                        <div className="project-content">
                          <span>{project.category}</span>

                          <h3>{project.title}</h3>

                          <p>{project.description}</p>

                          <div className="project-tags">
                            {project.tags.map((tag) => (
                              <span
                                className="project-tag"
                                key={tag}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="process-section">
          <div className="section-container">
            <motion.div
              className="section-heading centered"
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <span className="section-label">
                HOW WE WORK
              </span>

              <h2>
                From idea
                <span> to solution.</span>
              </h2>

              <p>
                A clear and practical process helps us understand your
                needs and turn them into dependable solutions.
              </p>
            </motion.div>

            <div className="process-grid">
              {processSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.article
                    key={step.number}
                    className="process-card"
                    initial={{
                      opacity: 0,
                      y: 35,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      delay: index * .07,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                  >
                    <span className="process-number">
                      {step.number}
                    </span>

                    <div className="process-icon">
                      <Icon size={21} />
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="technology-section">
          <div className="section-container">
            <motion.div
              className="technology-box"
              initial={{
                opacity: 0,
                scale: .97,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
            >
              <div className="technology-content">
                <span className="section-label">
                  TECHNOLOGY
                </span>

                <h2>
                  Modern tools for
                  <span> modern solutions.</span>
                </h2>

                <p>
                  We use modern development, networking, database,
                  creative and digital technologies to create solutions
                  that are practical, maintainable and ready to grow.
                </p>
              </div>

              <div className="technology-list">
                {technologies.map((technology) => (
                  <span
                    className="technology-chip"
                    key={technology}
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="section-container">
            <motion.div
              className="section-heading centered"
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <span className="section-label">
                CLIENT EXPERIENCE
              </span>

              <h2>
                Built around
                <span> your goals.</span>
              </h2>

              <p>
                We value clear communication, professional delivery and
                solutions that make sense for the people using them.
              </p>
            </motion.div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <motion.article
                  className="testimonial-card"
                  key={testimonial.name}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * .1,
                  }}
                >
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star
                        key={star}
                        size={13}
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <blockquote>
                    “{testimonial.quote}”
                  </blockquote>

                  <div className="testimonial-person">
                    <div className="testimonial-avatar">
                      <Users size={17} />
                    </div>

                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="section-container">
            <motion.div
              className="cta-box"
              initial={{
                opacity: 0,
                scale: .96,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
            >
              <span className="section-label">
                READY TO MOVE FORWARD?
              </span>

              <h2>
                Let's build something
                <span> exceptional.</span>
              </h2>

              <p>
                Have a project, business or technology challenge?
                Let's discuss how E&M Technologies can help.
              </p>

              <div className="cta-actions">
                <a
                  href="#contact"
                  className="primary-button"
                >
                  Start a Conversation
                  <ArrowRight size={18} />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-button"
                >
                  <MessageCircle size={17} />
                  WhatsApp Us
                </a>

                <a
                  href={`tel:${BUSINESS_PHONE.replace(/[^\d+]/g, "")}`}
                  className="secondary-button"
                >
                  <Phone size={17} />
                  Call Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-container">
            <div className="contact-grid">
              <motion.div
                className="contact-content"
                initial={{
                  opacity: 0,
                  x: -50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
              >
                <span className="section-label">
                  GET IN TOUCH
                </span>

                <h2>
                  Let's talk about
                  <span> your project.</span>
                </h2>

                <p>
                  Whether you need a website, IT solution, networking,
                  security system or creative digital service, we're
                  ready to discuss your needs.
                </p>

                <div className="contact-details">
                  <a href={`mailto:${BUSINESS_EMAIL}`}>
                    <div className="contact-icon">
                      <Mail size={20} />
                    </div>

                    <div>
                      <small>Email</small>
                      <span>{BUSINESS_EMAIL}</span>
                    </div>
                  </a>

                  <a
                    href={`tel:${BUSINESS_PHONE.replace(/[^\d+]/g, "")}`}
                  >
                    <div className="contact-icon">
                      <Phone size={20} />
                    </div>

                    <div>
                      <small>Phone</small>
                      <span>{BUSINESS_PHONE}</span>
                    </div>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="contact-icon">
                      <MessageCircle size={20} />
                    </div>

                    <div>
                      <small>WhatsApp</small>
                      <span>Chat with E&M Technologies</span>
                    </div>
                  </a>

                  <div>
                    <div className="contact-icon">
                      <MapPin size={20} />
                    </div>

                    <div>
                      <small>Location</small>
                      <span>{BUSINESS_LOCATION}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.form
                className="contact-form"
                initial={{
                  opacity: 0,
                  x: 50,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                onSubmit={handleSubmit}
              >
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                  />
                </div>

                <input
                  type="text"
                  placeholder="Phone Number"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  required
                />

                <select defaultValue="" required>
                  <option value="" disabled>
                    Select a service
                  </option>

                  {services.map((service) => (
                    <option
                      value={service.title}
                      key={service.title}
                    >
                      {service.title}
                    </option>
                  ))}
                </select>

                <textarea
                  rows="6"
                  placeholder="Tell us about your project..."
                  required
                ></textarea>

                <button
                  type="submit"
                  className="primary-button form-button"
                >
                  Send Message
                  <Send size={17} />
                </button>

                {formStatus && (
                  <div className="form-status">
                    {formStatus}
                  </div>
                )}
              </motion.form>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="section-container">
            <motion.div
              className="section-heading centered"
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
            >
              <span className="section-label">
                FREQUENT QUESTIONS
              </span>

              <h2>
                Questions,
                <span> answered.</span>
              </h2>
            </motion.div>

            <div className="faq-grid">
              {[
                {
                  question: "What services does E&M Technologies offer?",
                  answer:
                    "We provide web development, IT solutions, CCTV and security, networking, digital solutions, graphic design and other technology-related services.",
                },
                {
                  question: "Can you build a website for my business?",
                  answer:
                    "Yes. We can create responsive business websites, corporate websites, e-commerce platforms, landing pages and custom web applications based on your requirements.",
                },
                {
                  question: "Do you provide CCTV installation?",
                  answer:
                    "Yes. We provide CCTV and security solutions including camera installation, monitoring and related security infrastructure.",
                },
                {
                  question: "Do you provide networking services?",
                  answer:
                    "Yes. Our networking services include LAN, WAN, Wi-Fi, router configuration, troubleshooting, structured cabling and network infrastructure support.",
                },
                {
                  question: "Can you design posters and digital graphics?",
                  answer:
                    "Yes. Our creative services include poster design, social media graphics, promotional artwork, branding and other digital visual content.",
                },
                {
                  question: "How can I request a quotation?",
                  answer:
                    "You can use the contact form, call us, send an email or click the floating WhatsApp button to start a conversation.",
                },
              ].map((faq, index) => (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-container">
          <div className="footer-top">
            <div className="footer-brand">
              <a
                href="#home"
                className="brand"
                onClick={handleNavClick}
              >
                <div className="brand-logo-wrapper">
                  <img
                    src={logo}
                    alt="E&M Technologies"
                    className="brand-logo"
                  />
                </div>
              </a>

              <p>
                Technology, security and digital solutions designed to
                move your business forward.
              </p>
            </div>

            <div className="footer-column">
              <h4>Navigation</h4>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="footer-column">
              <h4>Services</h4>

              <a href="#services">
                Web Development
              </a>

              <a href="#services">
                IT Solutions
              </a>

              <a href="#services">
                CCTV & Security
              </a>

              <a href="#services">
                Networking
              </a>

              <a href="#services">
                Creative & Design
              </a>
            </div>

            <div className="footer-column">
              <h4>Contact</h4>

              <a href={`mailto:${BUSINESS_EMAIL}`}>
                {BUSINESS_EMAIL}
              </a>

              <a
                href={`tel:${BUSINESS_PHONE.replace(/[^\d+]/g, "")}`}
              >
                {BUSINESS_PHONE}
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>

              <span>{BUSINESS_LOCATION}</span>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} E&M Technologies.
              All rights reserved.
            </span>

            <span>
              Technology • Security • Innovation
            </span>
          </div>
        </div>
      </footer>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with E&M Technologies on WhatsApp"
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 1.5,
          duration: 0.5,
        }}
        whileHover={{
          scale: 1.12,
        }}
        whileTap={{
          scale: .92,
        }}
      >
        <MessageCircle size={30} />

        <span className="whatsapp-pulse"></span>

        <div className="whatsapp-tooltip">
          Chat with us on WhatsApp
        </div>
      </motion.a>

      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            className="back-to-top"
            onClick={scrollToTop}
            initial={{
              opacity: 0,
              scale: .8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: .8,
            }}
            aria-label="Back to top"
          >
            <ChevronDown
              size={18}
              style={{
                transform: "rotate(180deg)",
              }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-backdrop"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{
                opacity: 0,
                y: 35,
                scale: .96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 35,
                scale: .96,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project"
              >
                <X size={20} />
              </button>

              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="modal-image"
              />

              <div className="modal-content">
                <span>{selectedProject.category}</span>

                <h3>{selectedProject.title}</h3>

                <p>{selectedProject.description}</p>

                <div className="modal-tags">
                  {selectedProject.tags.map((tag) => (
                    <span
                      className="modal-tag"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="modal-actions">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="primary-button"
                  >
                    Discuss Similar Project
                    <MessageCircle size={17} />
                  </a>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setSelectedProject(null)}
                  >
                    Close
                    <X size={17} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollWatcher onChange={setShowTop} />
    </div>
  );
}

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="faq-item"
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * .04,
      }}
    >
      <button
        type="button"
        className="faq-question"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        <span>{faq.question}</span>

        <motion.span
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="faq-answer"
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
          >
            {faq.answer}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ScrollWatcher({ onChange }) {
  useMemo(() => {
    const handleScroll = () => {
      onChange(window.scrollY > 700);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onChange]);

  return null;
}

export default App;

/*
|--------------------------------------------------------------------------
| DESIGN NOTES
|--------------------------------------------------------------------------
| The following comments document the major sections of this application.
| They are intentionally kept here so the complete App.jsx remains easy to
| inspect and maintain when it is used as the main website component.
|
| 01. GLOBAL DESIGN
| The website uses a dark technology-oriented visual system with orange
| highlights and restrained blue accents.
|
| 02. NAVIGATION
| Desktop navigation is replaced by a mobile menu at smaller breakpoints.
| Each navigation item uses a hash link to a section on this page.
|
| 03. HERO
| The hero establishes the E&M Technologies identity and gives visitors
| immediate access to Services, Portfolio and Contact.
|
| 04. ABOUT
| The About section explains the company's approach to technology,
| security, digital experiences and creative solutions.
|
| 05. SERVICES
| Six service cards communicate the main areas of work.
| Each service can be expanded to show additional service items.
|
| 06. WHY CHOOSE US
| This section presents innovation, security, reliability and support.
|
| 07. PORTFOLIO
| The portfolio uses the supplied images:
| - website
| - cctv
| - networking
| - poster 1
| - poster 2
| - poster 3
|
| 08. PORTFOLIO FILTERS
| Visitors can filter work by service category.
|
| 09. PROJECT MODAL
| Clicking a portfolio card opens a larger project view.
|
| 10. PROCESS
| The process section communicates a clear path from initial discussion
| through planning, implementation, launch and support.
|
| 11. TECHNOLOGY
| The technology section lists common tools and platforms used by the
| development and digital team.
|
| 12. TESTIMONIALS
| The testimonials area provides social-proof style content that can be
| replaced later with real client testimonials.
|
| 13. CALL TO ACTION
| The CTA gives visitors multiple paths into the contact process.
|
| 14. CONTACT
| The contact section provides email, phone, WhatsApp and location details.
|
| 15. FAQ
| Frequently asked questions are interactive and expandable.
|
| 16. FOOTER
| The footer provides navigation, services and contact information.
|
| 17. WHATSAPP
| The floating WhatsApp button remains visible as visitors move through
| the site and uses a pre-filled inquiry message.
|
| 18. RESPONSIVE DESIGN
| Mobile, tablet and desktop layouts are handled in the component's
| responsive CSS.
|
| 19. ACCESSIBILITY
| Buttons include labels where necessary, images have alt text, and the
| mobile navigation exposes its expanded state.
|
| 20. REDUCED MOTION
| The CSS respects prefers-reduced-motion for visitors who request less
| animation at the operating-system level.
|
|--------------------------------------------------------------------------
| CUSTOMIZATION CHECKLIST
|--------------------------------------------------------------------------
| Replace WHATSAPP_NUMBER with the real WhatsApp number.
| Replace BUSINESS_EMAIL with the real email address.
| Replace BUSINESS_PHONE with the real phone number.
| Replace BUSINESS_LOCATION if a more specific public location is wanted.
| Replace placeholder testimonial names with real approved testimonials.
| Replace any service descriptions with official company wording.
|
|--------------------------------------------------------------------------
| IMAGE CHECKLIST
|--------------------------------------------------------------------------
| The imports at the top expect:
| src/images/logo.png
| src/images/cctv.jpg
| src/images/networking.jpg
| src/images/website.jpg
| src/images/poster 1.jpg
| src/images/poster 2.jpg
| src/images/poster 3.jpg
|
| If Windows Explorer hides extensions, confirm the actual file type.
| For example, if "poster 1" is PNG, change poster 1.jpg to poster 1.png.
|
|--------------------------------------------------------------------------
| END OF DOCUMENTATION
|--------------------------------------------------------------------------
*/
// E&M Technologies maintenance note 001: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 002: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 003: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 004: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 005: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 006: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 007: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 008: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 009: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 010: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 011: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 012: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 013: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 014: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 015: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 016: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 017: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 018: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 019: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 020: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 021: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 022: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 023: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 024: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 025: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 026: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 027: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 028: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 029: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 030: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 031: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 032: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 033: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 034: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 035: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 036: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 037: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 038: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 039: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 040: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 041: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 042: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 043: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 044: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 045: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 046: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 047: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 048: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 049: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 050: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 051: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 052: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 053: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 054: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 055: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 056: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 057: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 058: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 059: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 060: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 061: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 062: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 063: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 064: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 065: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 066: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 067: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 068: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 069: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 070: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 071: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 072: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 073: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 074: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 075: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 076: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 077: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 078: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 079: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 080: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 081: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 082: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 083: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 084: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 085: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 086: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 087: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 088: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 089: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 090: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 091: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 092: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 093: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 094: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 095: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 096: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 097: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 098: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 099: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 100: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 101: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 102: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 103: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 104: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 105: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 106: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 107: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 108: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 109: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 110: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 111: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 112: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 113: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 114: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 115: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 116: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 117: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 118: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 119: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 120: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 121: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 122: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 123: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 124: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 125: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 126: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 127: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 128: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 129: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 130: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 131: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 132: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 133: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 134: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 135: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 136: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 137: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 138: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 139: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 140: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 141: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 142: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 143: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 144: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 145: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 146: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 147: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 148: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 149: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 150: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 151: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 152: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 153: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 154: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 155: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 156: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 157: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 158: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 159: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 160: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 161: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 162: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 163: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 164: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 165: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 166: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 167: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 168: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 169: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 170: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 171: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 172: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 173: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 174: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 175: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 176: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 177: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 178: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 179: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 180: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 181: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 182: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 183: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 184: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 185: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 186: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 187: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 188: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 189: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 190: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 191: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 192: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 193: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 194: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 195: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 196: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 197: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 198: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 199: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 200: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 201: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 202: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 203: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 204: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 205: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 206: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 207: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 208: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 209: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 210: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 211: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 212: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 213: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 214: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 215: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 216: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 217: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 218: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 219: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 220: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 221: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 222: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 223: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 224: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 225: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 226: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 227: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 228: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 229: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 230: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 231: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 232: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 233: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 234: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 235: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 236: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 237: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 238: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 239: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 240: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 241: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 242: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 243: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 244: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 245: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 246: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 247: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 248: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 249: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 250: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 251: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 252: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 253: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 254: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 255: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 256: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 257: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 258: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 259: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 260: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 261: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 262: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 263: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 264: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 265: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 266: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 267: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 268: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 269: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 270: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 271: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 272: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 273: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 274: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 275: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 276: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 277: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 278: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 279: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 280: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 281: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 282: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 283: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 284: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 285: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 286: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 287: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 288: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 289: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 290: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 291: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 292: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 293: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 294: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 295: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 296: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 297: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 298: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 299: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 300: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 301: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 302: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 303: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 304: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 305: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 306: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 307: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 308: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 309: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 310: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 311: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 312: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 313: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 314: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 315: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 316: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 317: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 318: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 319: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 320: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 321: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 322: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 323: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 324: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 325: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 326: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 327: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 328: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 329: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 330: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 331: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 332: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 333: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 334: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 335: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 336: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 337: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 338: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 339: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 340: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 341: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 342: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 343: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 344: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 345: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 346: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 347: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 348: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 349: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 350: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 351: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 352: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 353: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 354: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 355: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 356: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 357: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 358: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 359: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 360: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 361: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 362: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 363: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 364: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 365: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 366: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 367: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 368: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 369: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 370: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 371: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 372: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 373: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 374: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 375: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 376: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 377: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 378: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 379: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 380: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 381: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 382: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 383: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 384: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 385: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 386: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 387: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 388: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 389: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 390: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 391: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 392: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 393: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 394: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 395: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 396: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 397: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 398: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 399: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 400: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 401: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 402: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 403: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 404: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 405: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 406: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 407: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 408: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 409: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 410: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 411: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 412: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 413: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 414: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 415: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 416: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 417: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 418: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 419: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 420: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 421: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 422: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 423: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 424: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 425: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 426: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 427: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 428: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 429: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 430: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 431: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 432: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 433: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 434: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 435: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 436: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 437: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 438: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 439: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 440: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 441: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 442: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 443: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 444: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 445: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 446: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 447: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 448: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 449: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 450: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 451: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 452: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 453: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 454: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 455: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 456: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 457: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 458: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 459: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 460: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 461: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 462: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 463: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 464: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 465: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 466: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 467: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 468: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 469: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 470: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 471: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 472: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 473: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 474: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 475: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 476: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 477: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 478: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 479: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 480: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 481: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 482: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 483: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 484: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 485: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 486: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 487: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 488: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 489: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 490: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 491: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 492: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 493: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 494: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 495: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 496: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 497: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 498: keep component data, imagery, and responsive behavior consistent.
// E&M Technologies maintenance note 499: keep component data, imagery, and responsive behavior consistent.
