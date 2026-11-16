
import { useEffect, useRef, useState } from "react";

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
  Image as ImageIcon,
  RotateCcw,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import { uploadImage } from "../../utils/supabaseStorage";

const BUCKET_NAME = "duisburg-media";
const MAX_IMAGES = 8;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

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
  const [existingImages, setExistingImages] = useState([]);
  const [removedImageIds, setRemovedImageIds] = useState([]);

  const previewUrlsRef = useRef(new Set());

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

  // CLEAN UP IMAGE PREVIEWS WHEN COMPONENT UNMOUNTS
  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      previewUrlsRef.current.clear();
    };
  }, []);

  // REMOVE PREVIEW URLS
  const clearSelectedImages = () => {
    selectedImages.forEach((image) => {
      URL.revokeObjectURL(image.preview);
      previewUrlsRef.current.delete(image.preview);
    });

    setSelectedImages([]);
  };

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
    clearSelectedImages();

    setEditingId(null);
    setForm(emptyForm);
    setExistingImages([]);
    setRemovedImageIds([]);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // OPEN EDIT FORM
  const openEditForm = (project) => {
    clearSelectedImages();

    const images = projectImages.filter(
      (image) => image.project_id === project.id
    );

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

    setExistingImages(images);
    setRemovedImageIds([]);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // ADD SELECTED IMAGE FILES
  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files || []);

    const availableSlots =
      MAX_IMAGES -
      existingImages.filter(
        (image) => !removedImageIds.includes(image.id)
      ).length -
      selectedImages.length;

    const validFiles = [];
    const invalidFiles = [];

    files.forEach((file) => {
      const validType = [
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(file.type);

      if (!validType || file.size > MAX_FILE_SIZE) {
        invalidFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      setError(
        "Some files were skipped. Only JPG, PNG and WebP images under 5MB are allowed."
      );
    } else {
      setError("");
    }

    if (validFiles.length > availableSlots) {
      setError(
        `You can add only ${availableSlots} more image(s). Maximum is ${MAX_IMAGES} images per project.`
      );
    }

    const filesToAdd = validFiles.slice(0, Math.max(0, availableSlots));

    const newImages = filesToAdd.map((file) => {
      const preview = URL.createObjectURL(file);

      previewUrlsRef.current.add(preview);

      return {
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview,
      };
    });

    setSelectedImages((previous) => [...previous, ...newImages]);

    e.target.value = "";
  };

  // REMOVE A NEWLY SELECTED IMAGE
  const removeSelectedImage = (imageId) => {
    const image = selectedImages.find(
      (item) => item.id === imageId
    );

    if (image) {
      URL.revokeObjectURL(image.preview);
      previewUrlsRef.current.delete(image.preview);
    }

    setSelectedImages((previous) =>
      previous.filter((item) => item.id !== imageId)
    );
  };

  // MARK AN EXISTING IMAGE FOR REMOVAL
  const markImageForRemoval = (imageId) => {
    setRemovedImageIds((previous) => [...previous, imageId]);
  };

  // RESTORE AN IMAGE MARKED FOR REMOVAL
  const restoreImage = (imageId) => {
    setRemovedImageIds((previous) =>
      previous.filter((id) => id !== imageId)
    );
  };

  // CLOSE FORM WITHOUT SAVING
  const closeForm = () => {
    if (saving) return;

    clearSelectedImages();

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setExistingImages([]);
    setRemovedImageIds([]);
    setError("");
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

      const remainingImages = existingImages.filter(
        (image) => !removedImageIds.includes(image.id)
      );

      if (remainingImages.length + selectedImages.length > MAX_IMAGES) {
        throw new Error(
          `A project can have a maximum of ${MAX_IMAGES} photographs.`
        );
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
        const { error: updateError } = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", editingId);

        if (updateError) throw updateError;
      } else {
        // CREATE NEW PROJECT
        const { data, error: insertError } = await supabase
          .from("projects")
          .insert([projectData])
          .select()
          .single();

        if (insertError) throw insertError;

        projectId = data.id;
      }

      // UPLOAD NEW PHOTOGRAPHS
      if (selectedImages.length > 0) {
        const uploadedImages = await Promise.all(
          selectedImages.map((image) =>
            uploadImage(image.file, "projects")
          )
        );

        const nextOrder = remainingImages.length;

        const imageRecords = uploadedImages.map((image, index) => ({
          project_id: projectId,
          image_url: image.url,
          storage_path: image.path,
          alt_text: form.title,
          display_order: nextOrder + index,
        }));

        const { error: imageError } = await supabase
          .from("project_images")
          .insert(imageRecords);

        if (imageError) throw imageError;
      }

      // DELETE DATABASE RECORDS FOR REMOVED PHOTOGRAPHS
      if (removedImageIds.length > 0) {
        const imagesToRemove = existingImages.filter(
          (image) => removedImageIds.includes(image.id)
        );

        const { error: deleteError } = await supabase
          .from("project_images")
          .delete()
          .in("id", removedImageIds);

        if (deleteError) throw deleteError;

        // REMOVE ACTUAL FILES FROM SUPABASE STORAGE
        const storagePaths = imagesToRemove
          .map((image) => image.storage_path)
          .filter(Boolean);

        if (storagePaths.length > 0) {
          const { error: storageError } = await supabase.storage
            .from(BUCKET_NAME)
            .remove(storagePaths);

          if (storageError) {
            setError(
              "The image records were removed, but some Storage files could not be deleted: " +
                storageError.message
            );
          }
        }
      }

      setSuccess(
        editingId
          ? "Project updated successfully!"
          : "Project added successfully!"
      );

      clearSelectedImages();

      setShowForm(false);
      setForm(emptyForm);
      setExistingImages([]);
      setRemovedImageIds([]);
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

      // DELETE IMAGE RECORDS FIRST
      const { error: imageError } = await supabase
        .from("project_images")
        .delete()
        .eq("project_id", project.id);

      if (imageError) throw imageError;

      // REMOVE IMAGE FILES FROM SUPABASE STORAGE
      const storagePaths = images
        .map((image) => image.storage_path)
        .filter(Boolean);

      if (storagePaths.length > 0) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove(storagePaths);

        if (storageError) {
          throw new Error(
            "Image records were deleted, but Storage cleanup failed: " +
              storageError.message
          );
        }
      }

      // DELETE PROJECT RECORD
      const { error: projectError } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (projectError) throw projectError;

      setSuccess(
        "Project and its photographs deleted successfully!"
      );

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

  const activeExistingImages = existingImages.filter(
    (image) => !removedImageIds.includes(image.id)
  );

  const totalImageCount =
    activeExistingImages.length + selectedImages.length;

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>
      {/* PAGE HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "25px",
        }}
      >
        <div>
          <h1 style={{ margin: "0 0 8px" }}>
            Projects Management
          </h1>

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
        <div
          style={{
            background: "#fff0f0",
            color: "#b42318",
            padding: "13px",
            borderRadius: "6px",
            marginBottom: "18px",
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          style={{
            background: "#eaf8ef",
            color: "#18743a",
            padding: "13px",
            borderRadius: "6px",
            marginBottom: "18px",
          }}
        >
          {success}
        </div>
      )}

      {/* SEARCH */}
      <div
        style={{
          background: "white",
          padding: "15px",
          borderRadius: "9px",
          marginBottom: "22px",
          border: "1px solid #e8edf2",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
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
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            border: "1px solid #e3e8ef",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "25px",
            }}
          >
            <h2 style={{ margin: 0, fontSize: "20px" }}>
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>

            <button
              type="button"
              onClick={closeForm}
              disabled={saving}
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
            {/* PROJECT DETAILS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
              }}
            >
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

            {/* DESCRIPTION */}
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

            {/* EXISTING PROJECT PHOTOGRAPHS */}
            {editingId && (
              <div style={{ marginTop: "25px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <label style={{ ...labelStyle, margin: 0 }}>
                    Existing Project Photographs
                  </label>

                  <span
                    style={{
                      fontSize: "12px",
                      color: "#718096",
                    }}
                  >
                    {activeExistingImages.length} existing image(s)
                  </span>
                </div>

                {existingImages.length === 0 ? (
                  <p
                    style={{
                      color: "#718096",
                      fontSize: "13px",
                    }}
                  >
                    This project has no existing photographs.
                  </p>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(145px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {existingImages.map((image) => {
                      const isRemoved = removedImageIds.includes(
                        image.id
                      );

                      return (
                        <div
                          key={image.id}
                          style={{
                            border: "1px solid #e3e8ef",
                            borderRadius: "8px",
                            overflow: "hidden",
                            opacity: isRemoved ? 0.5 : 1,
                            background: "#f8fafc",
                          }}
                        >
                          <img
                            src={image.image_url}
                            alt={image.alt_text || form.title}
                            style={{
                              width: "100%",
                              height: "115px",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />

                          <div style={{ padding: "9px" }}>
                            {isRemoved ? (
                              <>
                                <p
                                  style={{
                                    color: "#bd3038",
                                    fontSize: "11px",
                                    margin: "0 0 7px",
                                  }}
                                >
                                  Marked for removal
                                </p>

                                <button
                                  type="button"
                                  onClick={() =>
                                    restoreImage(image.id)
                                  }
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    background: "#edf1f5",
                                    border: "none",
                                    borderRadius: "5px",
                                    padding: "7px",
                                    cursor: "pointer",
                                    fontSize: "12px",
                                  }}
                                >
                                  <RotateCcw size={13} />
                                  Undo
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  markImageForRemoval(image.id)
                                }
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "5px",
                                  color: "#bd3038",
                                  background: "#fff0f0",
                                  border: "none",
                                  borderRadius: "5px",
                                  padding: "7px",
                                  cursor: "pointer",
                                  fontSize: "12px",
                                }}
                              >
                                <Trash2 size={13} />
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* NEW IMAGE UPLOAD */}
            <div style={{ marginTop: "25px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "12px",
                }}
              >
                <label style={{ ...labelStyle, margin: 0 }}>
                  Add New Project Photographs
                </label>

                <span
                  style={{
                    fontSize: "12px",
                    color: "#718096",
                  }}
                >
                  {totalImageCount}/{MAX_IMAGES} photographs
                </span>
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  border: "2px dashed #cbd5e0",
                  borderRadius: "8px",
                  padding: "25px",
                  cursor:
                    totalImageCount >= MAX_IMAGES
                      ? "not-allowed"
                      : "pointer",
                  color: "#52657d",
                  background: "#fafbfd",
                }}
              >
                <Upload size={22} />

                {totalImageCount >= MAX_IMAGES
                  ? "Maximum photographs reached"
                  : "Select project images"}

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  hidden
                  disabled={totalImageCount >= MAX_IMAGES}
                  onChange={handleImageSelection}
                />
              </label>

              <p
                style={{
                  color: "#718096",
                  fontSize: "12px",
                }}
              >
                JPG, PNG or WebP. Maximum 5MB per image and 8 images
                per project.
              </p>

              {/* NEW IMAGE PREVIEWS */}
              {selectedImages.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                  <h4
                    style={{
                      fontSize: "14px",
                      marginBottom: "12px",
                    }}
                  >
                    New Images Preview
                  </h4>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(145px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {selectedImages.map((image) => (
                      <div
                        key={image.id}
                        style={{
                          border: "1px solid #e3e8ef",
                          borderRadius: "8px",
                          overflow: "hidden",
                          background: "#f8fafc",
                        }}
                      >
                        <img
                          src={image.preview}
                          alt={image.file.name}
                          style={{
                            width: "100%",
                            height: "115px",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />

                        <div style={{ padding: "9px" }}>
                          <p
                            style={{
                              fontSize: "11px",
                              color: "#52657d",
                              overflowWrap: "anywhere",
                              margin: "0 0 8px",
                            }}
                          >
                            {image.file.name}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              removeSelectedImage(image.id)
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              color: "#bd3038",
                              background: "#fff0f0",
                              border: "none",
                              borderRadius: "5px",
                              padding: "7px",
                              cursor: "pointer",
                              fontSize: "12px",
                            }}
                          >
                            <X size={13} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* FEATURED PROJECT */}
            <div style={{ marginTop: "20px" }}>
              <label
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  fontSize: "14px",
                }}
              >
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />

                Feature this project on the homepage
              </label>
            </div>

            {/* FORM BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "25px",
                flexWrap: "wrap",
              }}
            >
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
                ) : editingId ? (
                  "Update Project"
                ) : (
                  "Save Project"
                )}
              </button>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "18px",
        }}
      >
        <h2 style={{ fontSize: "18px" }}>
          All Projects ({projects.length})
        </h2>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : filteredProjects.length === 0 ? (
        <div
          style={{
            background: "white",
            textAlign: "center",
            padding: "55px 20px",
            borderRadius: "10px",
            border: "1px solid #e8edf2",
          }}
        >
          <FolderKanban size={42} color="#9aa8ba" />

          <h3>No projects found</h3>

          <p style={{ color: "#718096" }}>
            Add your first project to get started.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
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
                  <div
                    style={{
                      height: "180px",
                      background: "#e9edf2",
                      display: "grid",
                      placeItems: "center",
                      color: "#8996a8",
                    }}
                  >
                    <FolderKanban size={38} />
                  </div>
                )}

                <div style={{ padding: "18px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#bd3038",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.category}
                  </span>

                  <h3 style={{ margin: "8px 0" }}>
                    {project.title}
                  </h3>

                  <p
                    style={{
                      color: "#718096",
                      fontSize: "13px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <MapPin size={14} />
                    {project.location}
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#52657d",
                    }}
                  >
                    Status: {project.status}
                  </p>

                  <p
                    style={{
                      fontSize: "12px",
                      color: "#718096",
                    }}
                  >
                    {images.length} photograph(s)
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginTop: "15px",
                    }}
                  >
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
