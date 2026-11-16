
import { useEffect, useState } from "react";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Upload,
  Wrench,
  Loader2,
  Eye,
  EyeOff,
  Image as ImageIcon,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import { uploadImage } from "../../utils/supabaseStorage";

const BUCKET_NAME = "duisburg-media";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  image_url: "",
  cloudinary_public_id: "",
  is_active: true,
  display_order: 0,
};

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // LOAD SERVICES
  const loadServices = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setServices(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  // CREATE SLUG
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // HANDLE FORM INPUTS
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // CLEAR IMAGE PREVIEW
  const clearImage = () => {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);
    setImagePreview("");
  };

  // OPEN NEW SERVICE FORM
  const openNewForm = () => {
    clearImage();

    setEditingId(null);
    setForm({
      ...emptyForm,
      display_order: services.length,
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // OPEN EDIT FORM
  const openEditForm = (service) => {
    clearImage();

    setEditingId(service.id);

    setForm({
      title: service.title || "",
      slug: service.slug || "",
      description: service.description || "",
      image_url: service.image_url || "",
      cloudinary_public_id: service.cloudinary_public_id || "",
      is_active: service.is_active ?? true,
      display_order: service.display_order ?? 0,
    });

    setImagePreview(service.image_url || "");
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // SELECT SERVICE IMAGE
  const handleImageSelection = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG and WebP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must not exceed 5MB.");
      e.target.value = "";
      return;
    }

    clearImage();

    const preview = URL.createObjectURL(file);

    setSelectedImage(file);
    setImagePreview(preview);
    setError("");

    e.target.value = "";
  };

  // CLOSE FORM
  const closeForm = () => {
    if (saving) return;

    clearImage();

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  // SAVE SERVICE
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      if (!form.title.trim()) {
        throw new Error("Service title is required.");
      }

      let imageUrl = form.image_url;
      let storagePath = form.storage_path || null;

      // UPLOAD NEW IMAGE
      if (selectedImage) {
        const uploaded = await uploadImage(
          selectedImage,
          "services"
        );

        imageUrl = uploaded.url;
        storagePath = uploaded.path;
      }

      const serviceData = {
        title: form.title.trim(),
        slug: createSlug(form.title),
        description: form.description.trim(),
        image_url: imageUrl || null,
        is_active: form.is_active,
        display_order: Number(form.display_order) || 0,
      };

      let result;

      if (editingId) {
        result = await supabase
          .from("services")
          .update(serviceData)
          .eq("id", editingId);
      } else {
        result = await supabase
          .from("services")
          .insert([serviceData]);
      }

      if (result.error) throw result.error;

      // REMOVE OLD STORAGE IMAGE AFTER SUCCESSFUL UPDATE
      if (
        editingId &&
        selectedImage &&
        form.storage_path
      ) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([form.storage_path]);

        if (storageError) {
          console.warn(
            "Old service image could not be removed:",
            storageError.message
          );
        }
      }

      // STORE NEW STORAGE PATH
      if (selectedImage && storagePath) {
        const { error: pathError } = await supabase
          .from("services")
          .update({
            storage_path: storagePath,
          })
          .eq(
            "slug",
            serviceData.slug
          );

        if (pathError) {
          console.warn(
            "Image path was not saved:",
            pathError.message
          );
        }
      }

      setSuccess(
        editingId
          ? "Service updated successfully!"
          : "Service added successfully!"
      );

      clearImage();
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);

      await loadServices();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // DELETE SERVICE
  const deleteService = async (service) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${service.title}"?`
    );

    if (!confirmed) return;

    setDeletingId(service.id);
    setError("");
    setSuccess("");

    try {
      const { error: deleteError } = await supabase
        .from("services")
        .delete()
        .eq("id", service.id);

      if (deleteError) throw deleteError;

      if (service.storage_path) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([service.storage_path]);

        if (storageError) {
          console.warn(
            "Service image cleanup failed:",
            storageError.message
          );
        }
      }

      setSuccess("Service deleted successfully!");

      await loadServices();
    } catch (err) {
      setError(err.message || "Could not delete service.");
    } finally {
      setDeletingId(null);
    }
  };

  // TOGGLE SERVICE VISIBILITY
  const toggleStatus = async (service) => {
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("services")
      .update({
        is_active: !service.is_active,
      })
      .eq("id", service.id);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(
      service.is_active
        ? "Service deactivated."
        : "Service activated."
    );

    await loadServices();
  };

  // FILTER SERVICES
  const filteredServices = services.filter((service) => {
    const query = search.toLowerCase();

    return (
      service.title?.toLowerCase().includes(query) ||
      service.description?.toLowerCase().includes(query)
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

      {/* HEADER */}
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
            Services Management
          </h1>

          <p style={{ color: "#718096", margin: 0 }}>
            Add, edit and manage company services.
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
          Add New Service
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
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Search color="#718096" size={20} />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services..."
          style={{
            ...inputStyle,
            border: "none",
            outline: "none",
          }}
        />
      </div>

      {/* SERVICE FORM */}
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
              {editingId ? "Edit Service" : "Add New Service"}
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
              }}
            >
              <div>
                <label style={labelStyle}>
                  Service Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Building Construction"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Display Order
                </label>

                <input
                  type="number"
                  name="display_order"
                  value={form.display_order}
                  onChange={handleChange}
                  min="0"
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={labelStyle}>
                Service Description *
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe this service..."
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />
            </div>

            {/* IMAGE UPLOAD */}
            <div style={{ marginTop: "25px" }}>
              <label style={labelStyle}>
                Service Photograph
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  border: "2px dashed #cbd5e0",
                  borderRadius: "8px",
                  padding: "22px",
                  cursor: "pointer",
                  color: "#52657d",
                  background: "#fafbfd",
                }}
              >
                <Upload size={22} />
                Choose Service Photograph

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={handleImageSelection}
                />
              </label>

              <p style={{ color: "#718096", fontSize: "12px" }}>
                JPG, PNG or WebP. Maximum 5MB.
              </p>

              {imagePreview && (
                <div style={{ marginTop: "15px", maxWidth: "320px" }}>
                  <img
                    src={imagePreview}
                    alt="Service preview"
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      clearImage();
                      setForm((previous) => ({
                        ...previous,
                        image_url: "",
                        storage_path: null,
                      }));
                    }}
                    style={{
                      marginTop: "8px",
                      background: "#fff0f0",
                      color: "#bd3038",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px 12px",
                      cursor: "pointer",
                    }}
                  >
                    <X size={14} /> Remove Image
                  </button>
                </div>
              )}
            </div>

            {/* ACTIVE STATUS */}
            <div style={{ marginTop: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "14px",
                }}
              >
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                />

                Make this service visible on the website
              </label>
            </div>

            {/* BUTTONS */}
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
                  "Update Service"
                ) : (
                  "Save Service"
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

      {/* SERVICES LIST */}
      <h2 style={{ fontSize: "18px", marginBottom: "18px" }}>
        All Services ({services.length})
      </h2>

      {loading ? (
        <p>Loading services...</p>
      ) : filteredServices.length === 0 ? (
        <div
          style={{
            background: "white",
            textAlign: "center",
            padding: "55px 20px",
            borderRadius: "10px",
            border: "1px solid #e8edf2",
          }}
        >
          <Wrench size={42} color="#9aa8ba" />

          <h3>No services found</h3>

          <p style={{ color: "#718096" }}>
            Add your first service to get started.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredServices.map((service) => (
            <div
              key={service.id}
              style={{
                background: "white",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #e8edf2",
              }}
            >
              {service.image_url ? (
                <img
                  src={service.image_url}
                  alt={service.title}
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
                  <ImageIcon size={38} />
                </div>
              )}

              <div style={{ padding: "18px" }}>
                <h3 style={{ margin: "0 0 10px" }}>
                  {service.title}
                </h3>

                <p
                  style={{
                    color: "#718096",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    minHeight: "55px",
                  }}
                >
                  {service.description}
                </p>

                <p
                  style={{
                    fontSize: "12px",
                    color: service.is_active ? "#18743a" : "#bd3038",
                    fontWeight: "bold",
                  }}
                >
                  {service.is_active ? "Active" : "Inactive"}
                </p>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "15px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={() => openEditForm(service)}
                    style={{
                      flex: 1,
                      padding: "10px",
                      border: "1px solid #dce2ea",
                      borderRadius: "5px",
                      background: "white",
                      cursor: "pointer",
                    }}
                  >
                    <Pencil size={14} /> Edit
                  </button>

                  <button
                    onClick={() => toggleStatus(service)}
                    title={service.is_active ? "Deactivate" : "Activate"}
                    style={{
                      padding: "10px",
                      border: "none",
                      borderRadius: "5px",
                      background: "#edf1f5",
                      cursor: "pointer",
                    }}
                  >
                    {service.is_active ? (
                      <EyeOff size={15} />
                    ) : (
                      <Eye size={15} />
                    )}
                  </button>

                  <button
                    onClick={() => deleteService(service)}
                    disabled={deletingId === service.id}
                    style={{
                      padding: "10px 13px",
                      border: "none",
                      borderRadius: "5px",
                      background: "#fff0f0",
                      color: "#bd3038",
                      cursor: "pointer",
                    }}
                  >
                    {deletingId === service.id ? (
                      <Loader2 size={15} />
                    ) : (
                      <Trash2 size={15} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;
