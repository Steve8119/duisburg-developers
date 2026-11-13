
import { useEffect, useState } from "react";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Upload,
  FolderKanban,
  MapPin,
  Loader2,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import { uploadImage } from "../../utils/supabaseStorage";

const BUCKET_NAME = "duisburg-media";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectImages, setProjectImages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emptyForm = {
    title: "",
    category: "Residential",
    location: "",
    description: "",
    status: "ongoing",
    featured: false,
    start_date: "",
    completion_date: "",
  };

  const [form, setForm] = useState(emptyForm);

  // LOAD PROJECTS AND THEIR IMAGES
  const loadProjects = async () => {
    setLoading(true);
    setError("");

    const { data, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (projectError) {
      setError(projectError.message);
      setLoading(false);
      return;
    }

    setProjects(data || []);

    if (data?.length) {
      const ids = data.map((project) => project.id);

      const { data: images, error: imageError } = await supabase
        .from("project_images")
        .select("*")
        .in("project_id", ids)
        .order("display_order");

      if (imageError) {
        setError(imageError.message);
      } else {
        setProjectImages(images || []);
      }
    } else {
      setProjectImages([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // HANDLE FORM INPUTS
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // CREATE URL-FRIENDLY SLUG
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // OPEN NEW PROJECT FORM
  const openNewForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setSelectedImages([]);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // OPEN EDIT FORM
  const openEditForm = (project) => {
    setEditingId(project.id);

    setForm({
      title: project.title || "",
      category: project.category || "Residential",
      location: project.location || "",
      description: project.description || "",
      status: project.status || "ongoing",
      featured: project.featured || false,
      start_date: project.start_date || "",
      completion_date: project.completion_date || "",
    });

    setSelectedImages([]);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // SAVE PROJECT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!form.title.trim()) {
        throw new Error("Project title is required.");
      }

      const projectData = {
        ...form,
        title: form.title.trim(),
        slug: createSlug(form.title),
        start_date: form.start_date || null,
        completion_date: form.completion_date || null,
      };

      let projectId = editingId;

      // UPDATE EXISTING PROJECT
      if (editingId) {
        const { error } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingId);

        if (error) throw error;
      } else {
        // CREATE NEW PROJECT
        const { data, error } = await supabase
          .from("projects")
          .insert([projectData])
          .select()
          .single();

        if (error) throw error;

        projectId = data.id;
      }

      // UPLOAD IMAGES TO SUPABASE STORAGE
      if (selectedImages.length > 0) {
        const uploadedImages = await Promise.all(
          selectedImages.map((file) =>
            uploadImage(file, "projects")
          )
        );

        const imageRecords = uploadedImages.map((image, index) => ({
          project_id: projectId,
          image_url: image.url,
          storage_path: image.path,
          alt_text: form.title,
          display_order: index,
        }));

        const { error: imageError } = await supabase
          .from("project_images")
          .insert(imageRecords);

        if (imageError) {
          throw imageError;
        }
      }

      setSuccess(
        editingId
          ? "Project updated successfully!"
          : "Project added successfully!"
      );

      setShowForm(false);
      setForm(emptyForm);
      setSelectedImages([]);
      setEditingId(null);

      await loadProjects();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // DELETE PROJECT AND ITS STORAGE IMAGES
  const deleteProject = async (project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}" and all its photographs?`
    );

    if (!confirmed) return;

    setDeletingId(project.id);
    setError("");
    setSuccess("");

    try {
      const images = projectImages.filter(
        (image) => image.project_id === project.id
      );

      const storagePaths = images
        .map((image) => image.storage_path)
        .filter(Boolean);

      // Remove actual image files from Supabase Storage
      if (storagePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove(storagePaths);

        if (storageError) throw storageError;
      }

      // Remove image records from database
      const { error: imageError } = await supabase
        .from("project_images")
        .delete()
        .eq("project_id", project.id);

      if (imageError) throw imageError;

      // Remove project record
      const { error: projectError } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (projectError) throw projectError;

      setSuccess("Project and its photographs deleted successfully!");

      await loadProjects();
    } catch (err) {
      setError(err.message || "Could not delete project.");
    } finally {
      setDeletingId(null);
    }
  };

  // SEARCH PROJECTS
  const filteredProjects = projects.filter((project) => {
    const query = search.toLowerCase();

    return (
      project.title?.toLowerCase().includes(query) ||
      project.category?.toLowerCase().includes(query) ||
      project.location?.toLowerCase().includes(query)
    );
  });

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #dce2ea",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "8px",
  };

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>

      {/* PAGE HEADER */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "15px",
        flexWrap: "wrap",
        marginBottom: "25px",
      }}>
        <div>
          <h1 style={{ margin: "0 0 8px" }}>Projects Management</h1>
          <p style={{ color: "#718096", margin: 0 }}>
            Add, edit and manage construction projects.
          </p>
        </div>

        <button
          onClick={openNewForm}
          style={{
            background: "#bd3038",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
        >
          <Plus size={18} />
          Add New Project
        </button>
      </div>

      {/* NOTIFICATIONS */}
      {error && (
        <div style={{
          background: "#fff0f0",
          color: "#b42318",
          padding: "13px",
          borderRadius: "6px",
          marginBottom: "18px",
        }}>
          {error}
        </div>
      )}

      {success && (
        <div style={{
          background: "#eaf8ef",
          color: "#18743a",
          padding: "13px",
          borderRadius: "6px",
          marginBottom: "18px",
        }}>
          {success}
        </div>
      )}

      {/* SEARCH */}
      <div style={{
        background: "white",
        padding: "15px",
        borderRadius: "9px",
        marginBottom: "22px",
        border: "1px solid #e8edf2",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <Search color="#718096" size={20} />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, category or location..."
            style={{
              ...inputStyle,
              border: "none",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* PROJECT FORM */}
      {showForm && (
        <div style={{
          background: "white",
          padding: "25px",
          borderRadius: "10px",
          border: "1px solid #e3e8ef",
          marginBottom: "25px",
        }}>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}>
            <h2 style={{ margin: 0, fontSize: "20px" }}>
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <X size={22} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
            }}>

              <div>
                <label style={labelStyle}>Project Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter project title"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Category *</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                  <option>Roads</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Location *</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Nairobi, Kenya"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Project Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={form.start_date}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Completion Date</label>
                <input
                  type="date"
                  name="completion_date"
                  value={form.completion_date}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={labelStyle}>Project Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe the project..."
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div style={{ marginTop: "20px" }}>
              <label style={labelStyle}>Project Photographs</label>

              <label style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                border: "2px dashed #cbd5e0",
                borderRadius: "8px",
                padding: "25px",
                cursor: "pointer",
                color: "#52657d",
              }}>
                <Upload size={22} />
                Select project images (maximum 8)

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  hidden
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const validFiles = files.filter(
                      (file) =>
                        ["image/jpeg", "image/png", "image/webp"].includes(file.type) &&
                        file.size <= 5 * 1024 * 1024
                    );

                    if (validFiles.length !== files.length) {
                      setError(
                        "Some images were skipped. Use JPG, PNG or WebP files under 5MB each."
                      );
                    } else {
                      setError("");
                    }

                    setSelectedImages((previous) =>
                      [...previous, ...validFiles].slice(0, 8)
                    );

                    e.target.value = "";
                  }}
                />
              </label>

              <p style={{ color: "#718096", fontSize: "12px" }}>
                JPG, PNG or WebP. Maximum 5MB per image and 8 images per project.
              </p>

              {selectedImages.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    fontSize: "13px",
                  }}
                >
                  <span>{file.name}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedImages((previous) =>
                        previous.filter((_, i) => i !== index)
                      )
                    }
                    style={{
                      color: "#bd3038",
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
                fontSize: "14px",
              }}>
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />
                Feature this project on the homepage
              </label>
            </div>

            <div style={{
              display: "flex",
              gap: "12px",
              marginTop: "25px",
            }}>
              <button
                type="submit"
                disabled={saving}
                style={{
                  background: "#bd3038",
                  color: "white",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "6px",
                  cursor: saving ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                }}
              >
                {saving ? (
                  <>
                    <Loader2 size={16} />
                    Saving...
                  </>
                ) : editingId ? "Update Project" : "Save Project"}
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  background: "#edf1f5",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* PROJECT LIST */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "18px",
      }}>
        <h2 style={{ fontSize: "18px" }}>
          All Projects ({projects.length})
        </h2>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <div style={{
          background: "white",
          textAlign: "center",
          padding: "55px 20px",
          borderRadius: "10px",
          border: "1px solid #e8edf2",
        }}>
          <FolderKanban size={42} color="#9aa8ba" />
          <h3>No projects found</h3>
          <p style={{ color: "#718096" }}>
            Add your first project to get started.
          </p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
        }}>
          {filteredProjects.map((project) => {
            const images = projectImages.filter(
              (image) => image.project_id === project.id
            );

            return (
              <div
                key={project.id}
                style={{
                  background: "white",
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid #e8edf2",
                }}
              >
                {images[0] ? (
                  <img
                    src={images[0].image_url}
                    alt={images[0].alt_text || project.title}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div style={{
                    height: "180px",
                    background: "#e9edf2",
                    display: "grid",
                    placeItems: "center",
                    color: "#8996a8",
                  }}>
                    <FolderKanban size={38} />
                  </div>
                )}

                <div style={{ padding: "18px" }}>
                  <span style={{
                    fontSize: "11px",
                    color: "#bd3038",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}>
                    {project.category}
                  </span>

                  <h3 style={{ margin: "8px 0" }}>
                    {project.title}
                  </h3>

                  <p style={{
                    color: "#718096",
                    fontSize: "13px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}>
                    <MapPin size={14} />
                    {project.location}
                  </p>

                  <p style={{
                    fontSize: "12px",
                    color: "#52657d",
                  }}>
                    Status: {project.status}
                  </p>

                  <p style={{
                    fontSize: "12px",
                    color: "#718096",
                  }}>
                    {images.length} photograph(s)
                  </p>

                  <div style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "15px",
                  }}>
                    <button
                      onClick={() => openEditForm(project)}
                      style={{
                        flex: 1,
                        padding: "10px",
                        border: "1px solid #dce2ea",
                        borderRadius: "5px",
                        background: "white",
                        cursor: "pointer",
                      }}
                    >
                      <Pencil size={14} />
                      {" "}Edit
                    </button>

                    <button
                      onClick={() => deleteProject(project)}
                      disabled={deletingId === project.id}
                      style={{
                        padding: "10px 13px",
                        border: "none",
                        borderRadius: "5px",
                        background: "#fff0f0",
                        color: "#bd3038",
                        cursor: "pointer",
                      }}
                    >
                      {deletingId === project.id ? (
                        <Loader2 size={15} />
                      ) : (
                        <Trash2 size={15} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Projects;
