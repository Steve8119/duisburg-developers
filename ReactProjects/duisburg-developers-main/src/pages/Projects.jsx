
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  ArrowRight,
  MapPin,
  CalendarDays,
  X,
  ChevronLeft,
  ChevronRight,
  FolderKanban,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { supabase } from "../lib/supabase";
import "./Projects.css";

// ANIMATION SETTINGS
const fadeUp = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const cardAnimation = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  // LOAD PUBLIC PROJECTS
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setError("");

      try {
        const { data, error: projectError } = await supabase
          .from("projects")
          .select("*")
          .neq("status", "upcoming")
          .order("created_at", { ascending: false });

        if (projectError) throw projectError;

        const loadedProjects = data || [];
        setProjects(loadedProjects);

        if (loadedProjects.length > 0) {
          const projectIds = loadedProjects.map(
            (project) => project.id
          );

          const { data: images, error: imageError } =
            await supabase
              .from("project_images")
              .select("*")
              .in("project_id", projectIds)
              .order("display_order", { ascending: true });

          if (imageError) throw imageError;

          setProjectImages(images || []);
        } else {
          setProjectImages([]);
        }
      } catch (err) {
        setError(err.message || "Unable to load projects.");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // GET PROJECT PHOTOGRAPHS
  const getProjectImages = (projectId) => {
    return projectImages.filter(
      (image) => image.project_id === projectId
    );
  };

  // CATEGORY FILTERS
  const categories = [
    "All",
    ...new Set(
      projects
        .map((project) => project.category)
        .filter(Boolean)
    ),
  ];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter(
          (project) => project.category === activeCategory
        );

  // OPEN PROJECT DETAILS
  const openProject = (project) => {
    setSelectedProject(project);
    setActiveImage(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setActiveImage(0);
  };

  // NEXT IMAGE
  const showNextImage = () => {
    if (!selectedProject) return;

    const images = getProjectImages(selectedProject.id);

    if (images.length <= 1) return;

    setActiveImage((previous) =>
      previous >= images.length - 1 ? 0 : previous + 1
    );
  };

  // PREVIOUS IMAGE
  const showPreviousImage = () => {
    if (!selectedProject) return;

    const images = getProjectImages(selectedProject.id);

    if (images.length <= 1) return;

    setActiveImage((previous) =>
      previous <= 0 ? images.length - 1 : previous - 1
    );
  };

  // FORMAT DATE
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-KE", {
      month: "long",
      year: "numeric",
    });
  };

  // CLOSE MODAL WITH ESCAPE KEY
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeProject();
      }

      if (selectedProject && event.key === "ArrowRight") {
        showNextImage();
      }

      if (selectedProject && event.key === "ArrowLeft") {
        showPreviousImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, projectImages, activeImage]);

  // PREVENT BACKGROUND SCROLL WHEN MODAL IS OPEN
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <main className="public-projects-page">

      {/* HERO */}
      <section className="projects-hero">
        <motion.div
          className="projects-hero-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />

        <motion.div
          className="projects-hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span
            className="projects-eyebrow"
            variants={fadeUp}
          >
            DUISBURG DEVELOPERS LTD
          </motion.span>

          <motion.h1 variants={fadeUp}>
            Our Projects
          </motion.h1>

          <motion.p variants={fadeUp}>
            Discover the projects we have undertaken and the
            quality, commitment and professional approach
            behind our work.
          </motion.p>

          <motion.div
            className="projects-breadcrumb"
            variants={fadeUp}
          >
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Our Projects</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="projects-hero-bottom"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          BUILDING EXCELLENCE. DELIVERING QUALITY.
        </motion.div>
      </section>

      {/* INTRODUCTION */}
      <motion.section
        className="projects-intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="projects-intro-inner">
          <div>
            <span className="projects-eyebrow">
              OUR PORTFOLIO
            </span>

            <h2>
              Work that reflects our commitment to quality.
            </h2>
          </div>

          <p>
            Every project represents an opportunity to create
            lasting value. Explore our construction, engineering
            and development work across different project
            categories.
          </p>
        </div>
      </motion.section>

      {/* PROJECT GALLERY */}
      <section className="projects-gallery-section">

        <motion.div
          className="projects-section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.span
            className="projects-eyebrow"
            variants={fadeUp}
          >
            OUR WORK
          </motion.span>

          <motion.h2 variants={fadeUp}>
            Explore Our Projects
          </motion.h2>

          <motion.p variants={fadeUp}>
            Browse our portfolio and discover the work we do.
          </motion.p>
        </motion.div>

        {/* CATEGORY FILTERS */}
        {!loading && projects.length > 0 && (
          <motion.div
            className="projects-filters"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                className={
                  activeCategory === category ? "active" : ""
                }
                onClick={() => setActiveCategory(category)}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* LOADING */}
        {loading && (
          <motion.div
            className="projects-loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Loader2 className="projects-spinner" size={35} />
            <p>Loading our projects...</p>
          </motion.div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <motion.div
            className="projects-empty"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FolderKanban size={45} />
            <h3>Unable to load projects</h3>
            <p>{error}</p>
          </motion.div>
        )}

        {/* EMPTY */}
        {!loading && !error && filteredProjects.length === 0 && (
          <motion.div
            className="projects-empty"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FolderKanban size={45} />

            <h3>No projects available</h3>

            <p>
              Our project portfolio will be updated soon.
            </p>
          </motion.div>
        )}

        {/* ANIMATED PROJECT CARDS */}
        {!loading && !error && filteredProjects.length > 0 && (
          <motion.div
            className="public-projects-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const images = getProjectImages(project.id);
                const coverImage = images[0]?.image_url;

                return (
                  <motion.article
                    className="public-project-card"
                    key={project.id}
                    layout
                    variants={cardAnimation}
                    initial="hidden"
                    animate="visible"
                    exit={{
                      opacity: 0,
                      y: 30,
                      scale: 0.95,
                    }}
                    transition={{
                      layout: {
                        duration: 0.4,
                      },
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -12,
                      transition: { duration: 0.3 },
                    }}
                  >
                    {/* PROJECT IMAGE */}
                    <div className="public-project-image">
                      {coverImage ? (
                        <motion.img
                          src={coverImage}
                          alt={
                            images[0]?.alt_text || project.title
                          }
                          loading="lazy"
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            duration: 0.7,
                            ease: "easeOut",
                          }}
                        />
                      ) : (
                        <div className="project-image-placeholder">
                          <FolderKanban size={45} />
                        </div>
                      )}

                      <span className="project-category">
                        {project.category}
                      </span>

                      <span
                        className={`project-status ${project.status}`}
                      >
                        {project.status}
                      </span>

                      <motion.button
                        className="project-image-action"
                        onClick={() => openProject(project)}
                        aria-label={`View ${project.title}`}
                        whileHover={{
                          scale: 1.15,
                          rotate: -45,
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ArrowRight size={21} />
                      </motion.button>
                    </div>

                    {/* PROJECT INFORMATION */}
                    <div className="public-project-info">
                      <div className="public-project-location">
                        <MapPin size={15} />
                        <span>{project.location}</span>
                      </div>

                      <h3>{project.title}</h3>

                      <p>
                        {project.description?.length > 145
                          ? `${project.description.slice(0, 145)}...`
                          : project.description}
                      </p>

                      <div className="public-project-footer">
                        <span>
                          {images.length} Photograph
                          {images.length === 1 ? "" : "s"}
                        </span>

                        <motion.button
                          onClick={() => openProject(project)}
                          whileHover={{ x: 5 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          View Project
                          <ArrowRight size={16} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* OUR COMMITMENT */}
      <motion.section
        className="projects-commitment"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9 }}
      >
        <motion.div
          className="projects-commitment-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="projects-eyebrow">
            OUR COMMITMENT
          </span>

          <h2>
            Building with purpose. Delivering with excellence.
          </h2>

          <p>
            We approach every assignment with professionalism,
            responsibility and attention to detail. Our goal is
            to deliver practical solutions that meet our clients'
            needs.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{ display: "inline-block" }}
          >
            <Link
              to="/#contact"
              className="projects-cta-button"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* CONTACT CTA */}
      <motion.section
        className="projects-bottom-cta"
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <span>HAVE A PROJECT IN MIND?</span>

          <h2>Let's build something great together.</h2>

          <p>
            Contact Duisburg Developers Ltd to discuss your
            construction or development project.
          </p>
        </div>

        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            to="/#contact"
            className="projects-cta-button"
          >
            Contact Our Team
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.section>

      {/* ANIMATED PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-backdrop"
            onClick={closeProject}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="project-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{
                opacity: 0,
                scale: 0.88,
                y: 60,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 40,
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.button
                className="project-modal-close"
                onClick={closeProject}
                aria-label="Close project details"
                whileHover={{
                  rotate: 90,
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={24} />
              </motion.button>

              <div className="project-modal-content">
                {(() => {
                  const images = getProjectImages(
                    selectedProject.id
                  );

                  const currentImage = images[activeImage];

                  return (
                    <>
                      {/* MODAL IMAGE GALLERY */}
                      <div className="project-modal-gallery">
                        <AnimatePresence mode="wait">
                          {currentImage ? (
                            <motion.img
                              key={currentImage.id || activeImage}
                              src={currentImage.image_url}
                              alt={
                                currentImage.alt_text ||
                                selectedProject.title
                              }
                              initial={{
                                opacity: 0,
                                scale: 1.05,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              exit={{
                                opacity: 0,
                                scale: 0.98,
                              }}
                              transition={{ duration: 0.35 }}
                            />
                          ) : (
                            <div className="project-image-placeholder">
                              <FolderKanban size={55} />
                            </div>
                          )}
                        </AnimatePresence>

                        {images.length > 1 && (
                          <>
                            <motion.button
                              className="project-gallery-arrow previous"
                              onClick={showPreviousImage}
                              whileHover={{ scale: 1.15, x: -3 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label="Previous image"
                            >
                              <ChevronLeft size={25} />
                            </motion.button>

                            <motion.button
                              className="project-gallery-arrow next"
                              onClick={showNextImage}
                              whileHover={{ scale: 1.15, x: 3 }}
                              whileTap={{ scale: 0.9 }}
                              aria-label="Next image"
                            >
                              <ChevronRight size={25} />
                            </motion.button>

                            <span className="project-gallery-count">
                              {activeImage + 1} / {images.length}
                            </span>
                          </>
                        )}
                      </div>

                      {/* MODAL PROJECT DETAILS */}
                      <motion.div
                        className="project-modal-details"
                        initial={{ opacity: 0, y: 25 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.15,
                          duration: 0.5,
                        }}
                      >
                        <span className="projects-eyebrow">
                          {selectedProject.category}
                        </span>

                        <h2>{selectedProject.title}</h2>

                        <div className="project-modal-meta">
                          <span>
                            <MapPin size={16} />
                            {selectedProject.location}
                          </span>

                          <span>
                            <CheckCircle2 size={16} />
                            {selectedProject.status}
                          </span>

                          {selectedProject.start_date && (
                            <span>
                              <CalendarDays size={16} />
                              Started{" "}
                              {formatDate(
                                selectedProject.start_date
                              )}
                            </span>
                          )}
                        </div>

                        <h3>Project Overview</h3>

                        <p>{selectedProject.description}</p>

                        {selectedProject.completion_date && (
                          <p className="project-completion-date">
                            Completion:{" "}
                            {formatDate(
                              selectedProject.completion_date
                            )}
                          </p>
                        )}

                        {/* IMAGE THUMBNAILS */}
                        {images.length > 1 && (
                          <div className="project-modal-thumbnails">
                            {images.map((image, index) => (
                              <motion.button
                                key={image.id}
                                className={
                                  activeImage === index
                                    ? "selected"
                                    : ""
                                }
                                onClick={() =>
                                  setActiveImage(index)
                                }
                                whileHover={{ scale: 1.06 }}
                                whileTap={{ scale: 0.94 }}
                              >
                                <img
                                  src={image.image_url}
                                  alt={
                                    image.alt_text ||
                                    `Project image ${index + 1}`
                                  }
                                />
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

export default Projects;
