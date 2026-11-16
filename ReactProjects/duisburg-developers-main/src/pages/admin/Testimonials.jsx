
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Upload,
  Loader2,
  Star,
  Eye,
  EyeOff,
  RefreshCw,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import { uploadImage } from "../../utils/supabaseStorage";

const initialForm = {
  client_name: "",
  position: "",
  company: "",
  message: "",
  image_url: "",
  is_active: true,
};

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // LOAD TESTIMONIALS
  const fetchTestimonials = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      showMessage(error.message, "error");
    } else {
      setTestimonials(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // NOTIFICATIONS
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  // FORM INPUTS
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // IMAGE SELECTION
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      showMessage("Only JPG, PNG and WebP images are allowed.", "error");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showMessage("Image must not exceed 5MB.", "error");
      e.target.value = "";
      return;
    }

    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // RESET FORM
  const resetForm = () => {
    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setForm(initialForm);
    setSelectedImage(null);
    setPreview("");
    setEditingId(null);
    setShowForm(false);
  };

  // ADD TESTIMONIAL
  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    setMessage("");
  };

  // EDIT TESTIMONIAL
  const openEditForm = (item) => {
    setForm({
      client_name: item.client_name || "",
      position: item.position || "",
      company: item.company || "",
      message: item.message || "",
      image_url: item.image_url || "",
      is_active: item.is_active ?? true,
    });

    setEditingId(item.id);
    setSelectedImage(null);
    setPreview(item.image_url || "");
    setShowForm(true);
    setMessage("");
  };

  // SAVE TESTIMONIAL
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.client_name.trim() || !form.message.trim()) {
      showMessage("Client name and testimonial message are required.", "error");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      let imageUrl = form.image_url;

      if (selectedImage) {
        const uploaded = await uploadImage(selectedImage, "testimonials");
        imageUrl = uploaded.url;
      }

      const testimonialData = {
        client_name: form.client_name.trim(),
        position: form.position.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
        image_url: imageUrl || null,
        is_active: form.is_active,
      };

      let result;

      if (editingId) {
        result = await supabase
          .from("testimonials")
          .update(testimonialData)
          .eq("id", editingId)
          .select()
          .single();
      } else {
        result = await supabase
          .from("testimonials")
          .insert([testimonialData])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      showMessage(
        editingId
          ? "Testimonial updated successfully."
          : "Testimonial added successfully."
      );

      resetForm();
      await fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
      showMessage(error.message || "Could not save testimonial.", "error");
    } finally {
      setSaving(false);
    }
  };

  // DELETE TESTIMONIAL
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    setTestimonials((previous) =>
      previous.filter((item) => item.id !== id)
    );

    showMessage("Testimonial deleted successfully.");
  };

  // TOGGLE VISIBILITY
  const toggleVisibility = async (item) => {
    const { data, error } = await supabase
      .from("testimonials")
      .update({ is_active: !item.is_active })
      .eq("id", item.id)
      .select()
      .single();

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    setTestimonials((previous) =>
      previous.map((testimonial) =>
        testimonial.id === item.id ? data : testimonial
      )
    );

    showMessage(
      data.is_active
        ? "Testimonial is now visible."
        : "Testimonial has been hidden."
    );
  };

  // SEARCH
  const filteredTestimonials = testimonials.filter((item) => {
    const search = searchTerm.toLowerCase();

    return [
      item.client_name,
      item.position,
      item.company,
      item.message,
    ].some((value) =>
      String(value || "").toLowerCase().includes(search)
    );
  });

  const activeCount = testimonials.filter(
    (item) => item.is_active
  ).length;

  const inactiveCount = testimonials.length - activeCount;

  const styles = {
    page: {
      padding: "24px",
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "Arial, sans-serif",
      color: "#1e293b",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
      marginBottom: "24px",
    },
    heading: {
      margin: "0 0 8px",
      fontSize: "26px",
      color: "#0f172a",
    },
    subtitle: {
      margin: 0,
      fontSize: "14px",
      color: "#64748b",
    },
    primaryButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "11px 17px",
      border: "none",
      borderRadius: "6px",
      background: "#b91c1c",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "600",
    },
    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "15px",
      marginBottom: "22px",
    },
    statCard: {
      padding: "20px",
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "9px",
    },
    statLabel: {
      color: "#64748b",
      fontSize: "13px",
      marginBottom: "10px",
    },
    statNumber: {
      fontSize: "27px",
      fontWeight: "700",
      color: "#0f172a",
    },
    search: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "0 12px",
      background: "#fff",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      maxWidth: "450px",
      marginBottom: "20px",
    },
    searchInput: {
      border: "none",
      outline: "none",
      padding: "12px 0",
      width: "100%",
      fontSize: "14px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "18px",
    },
    card: {
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      overflow: "hidden",
    },
    cardBody: {
      padding: "18px",
    },
    actionButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      padding: "8px 10px",
      border: "1px solid #e2e8f0",
      background: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "12px",
    },
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(15,23,42,0.65)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px",
      zIndex: 1000,
    },
    modal: {
      width: "100%",
      maxWidth: "600px",
      maxHeight: "90vh",
      overflowY: "auto",
      background: "#fff",
      borderRadius: "10px",
      padding: "24px",
      boxSizing: "border-box",
    },
    field: {
      width: "100%",
      padding: "11px",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      boxSizing: "border-box",
      fontSize: "14px",
      marginBottom: "17px",
      fontFamily: "Arial, sans-serif",
    },
    label: {
      display: "block",
      fontSize: "13px",
      fontWeight: "600",
      marginBottom: "7px",
    },
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Testimonials</h1>
          <p style={styles.subtitle}>
            Manage client feedback and testimonials displayed on the website.
          </p>
        </div>

        <button style={styles.primaryButton} onClick={openAddForm}>
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* MESSAGE */}
      {message && (
        <div
          style={{
            padding: "12px 15px",
            borderRadius: "6px",
            marginBottom: "18px",
            background:
              messageType === "error" ? "#fee2e2" : "#dcfce7",
            color:
              messageType === "error" ? "#991b1b" : "#166534",
            fontSize: "14px",
          }}
        >
          {message}
        </div>
      )}

      {/* STATISTICS */}
      <div style={styles.stats}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Testimonials</div>
          <div style={styles.statNumber}>{testimonials.length}</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Visible on Website</div>
          <div style={styles.statNumber}>{activeCount}</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Hidden Testimonials</div>
          <div style={styles.statNumber}>{inactiveCount}</div>
        </div>
      </div>

      {/* SEARCH */}
      <div style={styles.search}>
        <Search size={18} color="#64748b" />
        <input
          type="text"
          placeholder="Search client name, company or message..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* TESTIMONIAL CARDS */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Loader2 size={30} />
          <p>Loading testimonials...</p>
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "50px 20px",
            textAlign: "center",
            color: "#64748b",
          }}
        >
          <Star size={35} />
          <h3>No testimonials found</h3>
          <p>Add your first client testimonial to get started.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredTestimonials.map((item) => (
            <div key={item.id} style={styles.card}>
              <div
                style={{
                  height: "190px",
                  background: "#f1f5f9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.client_name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <UserPlaceholder />
                )}
              </div>

              <div style={styles.cardBody}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      background: item.is_active ? "#dcfce7" : "#f1f5f9",
                      color: item.is_active ? "#166534" : "#475569",
                      padding: "5px 9px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "700",
                    }}
                  >
                    {item.is_active ? "Visible" : "Hidden"}
                  </span>

                  <Star size={17} color="#d97706" />
                </div>

                <h3 style={{ margin: "0 0 5px", fontSize: "17px" }}>
                  {item.client_name}
                </h3>

                <p
                  style={{
                    margin: "0 0 14px",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  {[item.position, item.company].filter(Boolean).join(" • ") ||
                    "Client"}
                </p>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#475569",
                    lineHeight: "1.7",
                    minHeight: "65px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {item.message.length > 150
                    ? `${item.message.slice(0, 150)}...`
                    : item.message}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "7px",
                    marginTop: "15px",
                    borderTop: "1px solid #e2e8f0",
                    paddingTop: "15px",
                  }}
                >
                  <button
                    style={styles.actionButton}
                    onClick={() => openEditForm(item)}
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    style={styles.actionButton}
                    onClick={() => toggleVisibility(item)}
                  >
                    {item.is_active ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                    {item.is_active ? "Hide" : "Show"}
                  </button>

                  <button
                    style={{
                      ...styles.actionButton,
                      color: "#dc2626",
                    }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showForm && (
        <div style={styles.overlay} onClick={resetForm}>
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "22px",
                borderBottom: "1px solid #e2e8f0",
                paddingBottom: "15px",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "20px" }}>
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h2>

              <button
                onClick={resetForm}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label style={styles.label}>Client Name *</label>
              <input
                name="client_name"
                value={form.client_name}
                onChange={handleChange}
                placeholder="Enter client name"
                required
                style={styles.field}
              />

              <label style={styles.label}>Position</label>
              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="e.g. Director"
                style={styles.field}
              />

              <label style={styles.label}>Company</label>
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="Enter company name"
                style={styles.field}
              />

              <label style={styles.label}>Testimonial Message *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Enter the client's feedback..."
                rows={5}
                required
                style={{
                  ...styles.field,
                  resize: "vertical",
                }}
              />

              <label style={styles.label}>Client Photo</label>

              <div
                style={{
                  border: "1px dashed #cbd5e1",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "18px",
                  textAlign: "center",
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Client preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      marginBottom: "12px",
                    }}
                  />
                ) : (
                  <Upload
                    size={28}
                    color="#64748b"
                    style={{ marginBottom: "10px" }}
                  />
                )}

                <div>
                  <label
                    style={{
                      ...styles.actionButton,
                      display: "inline-flex",
                      cursor: "pointer",
                    }}
                  >
                    <Upload size={15} />
                    Choose Photo
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>

                <p style={{ color: "#64748b", fontSize: "11px" }}>
                  JPG, PNG or WebP. Maximum size 5MB.
                </p>

                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      if (preview.startsWith("blob:")) {
                        URL.revokeObjectURL(preview);
                      }

                      setPreview("");
                      setSelectedImage(null);
                      setForm((previous) => ({
                        ...previous,
                        image_url: "",
                      }));
                    }}
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "#dc2626",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    Remove photo
                  </button>
                )}
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                />
                Show this testimonial on the website
              </label>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: "11px 17px",
                    border: "1px solid #cbd5e1",
                    borderRadius: "6px",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    ...styles.primaryButton,
                    opacity: saving ? 0.7 : 1,
                  }}
                >
                  {saving ? (
                    <Loader2 size={17} />
                  ) : (
                    <Plus size={17} />
                  )}
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Testimonial"
                    : "Save Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function UserPlaceholder() {
  return (
    <div
      style={{
        width: "75px",
        height: "75px",
        borderRadius: "50%",
        background: "#e2e8f0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#64748b",
        fontSize: "30px",
        fontWeight: "700",
      }}
    >
      ?
    </div>
  );
}

export default Testimonials;
