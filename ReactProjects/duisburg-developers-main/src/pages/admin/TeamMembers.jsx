
import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Upload,
  Loader2,
  Eye,
  EyeOff,
  RefreshCw,
  Users,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import { uploadImage } from "../../utils/supabaseStorage";

const initialForm = {
  full_name: "",
  position: "",
  biography: "",
  image_url: "",
  display_order: 0,
  is_active: true,
};

function TeamMembers() {
  const [members, setMembers] = useState([]);
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

  // LOAD TEAM MEMBERS
  const fetchMembers = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading team members:", error);
      showMessage(error.message, "error");
    } else {
      setMembers(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // NOTIFICATIONS
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  // INPUT HANDLING
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : name === "display_order"
          ? Number(value)
          : value,
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

    if (preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
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

  // OPEN ADD FORM
  const openAddForm = () => {
    resetForm();
    setShowForm(true);
    setMessage("");
  };

  // OPEN EDIT FORM
  const openEditForm = (member) => {
    setForm({
      full_name: member.full_name || "",
      position: member.position || "",
      biography: member.biography || "",
      image_url: member.image_url || "",
      display_order: member.display_order ?? 0,
      is_active: member.is_active ?? true,
    });

    setEditingId(member.id);
    setSelectedImage(null);
    setPreview(member.image_url || "");
    setShowForm(true);
    setMessage("");
  };

  // SAVE TEAM MEMBER
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.full_name.trim() || !form.position.trim()) {
      showMessage("Full name and position are required.", "error");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      let imageUrl = form.image_url;

      if (selectedImage) {
        const uploaded = await uploadImage(selectedImage, "team");
        imageUrl = uploaded.url;
      }

      const memberData = {
        full_name: form.full_name.trim(),
        position: form.position.trim(),
        biography: form.biography.trim(),
        image_url: imageUrl || null,
        display_order: Number(form.display_order) || 0,
        is_active: form.is_active,
      };

      let result;

      if (editingId) {
        result = await supabase
          .from("team_members")
          .update(memberData)
          .eq("id", editingId)
          .select()
          .single();
      } else {
        result = await supabase
          .from("team_members")
          .insert([memberData])
          .select()
          .single();
      }

      if (result.error) throw result.error;

      showMessage(
        editingId
          ? "Team member updated successfully."
          : "Team member added successfully."
      );

      resetForm();
      await fetchMembers();
    } catch (error) {
      console.error("Error saving team member:", error);
      showMessage(error.message || "Could not save team member.", "error");
    } finally {
      setSaving(false);
    }
  };

  // DELETE TEAM MEMBER
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team member?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("team_members")
      .delete()
      .eq("id", id);

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    setMembers((previous) =>
      previous.filter((member) => member.id !== id)
    );

    showMessage("Team member deleted successfully.");
  };

  // TOGGLE VISIBILITY
  const toggleVisibility = async (member) => {
    const { data, error } = await supabase
      .from("team_members")
      .update({ is_active: !member.is_active })
      .eq("id", member.id)
      .select()
      .single();

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    setMembers((previous) =>
      previous.map((item) =>
        item.id === member.id ? data : item
      )
    );

    showMessage(
      data.is_active
        ? "Team member is now visible."
        : "Team member has been hidden."
    );
  };

  // SEARCH
  const filteredMembers = members.filter((member) => {
    const search = searchTerm.toLowerCase();

    return [
      member.full_name,
      member.position,
      member.biography,
    ].some((value) =>
      String(value || "").toLowerCase().includes(search)
    );
  });

  const activeCount = members.filter(
    (member) => member.is_active
  ).length;

  const inactiveCount = members.length - activeCount;

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
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
          <h1 style={styles.heading}>Team Members</h1>
          <p style={styles.subtitle}>
            Manage the people featured on the Duisburg Developers website.
          </p>
        </div>

        <button
          style={styles.primaryButton}
          onClick={openAddForm}
        >
          <Plus size={18} />
          Add Team Member
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
          <div style={styles.statLabel}>Total Team Members</div>
          <div style={styles.statNumber}>{members.length}</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Visible on Website</div>
          <div style={styles.statNumber}>{activeCount}</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Hidden Members</div>
          <div style={styles.statNumber}>{inactiveCount}</div>
        </div>
      </div>

      {/* SEARCH */}
      <div style={styles.search}>
        <Search size={18} color="#64748b" />
        <input
          type="text"
          placeholder="Search name, position or biography..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* TEAM MEMBER CARDS */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Loader2 size={30} />
          <p>Loading team members...</p>
        </div>
      ) : filteredMembers.length === 0 ? (
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
          <Users size={35} />
          <h3>No team members found</h3>
          <p>Add your first team member to get started.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredMembers.map((member) => (
            <div key={member.id} style={styles.card}>
              <div
                style={{
                  height: "210px",
                  background: "#f1f5f9",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                {member.image_url ? (
                  <img
                    src={member.image_url}
                    alt={member.full_name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "85px",
                      height: "85px",
                      borderRadius: "50%",
                      background: "#e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#64748b",
                    }}
                  >
                    <Users size={35} />
                  </div>
                )}
              </div>

              <div style={styles.cardBody}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      background: member.is_active ? "#dcfce7" : "#f1f5f9",
                      color: member.is_active ? "#166534" : "#475569",
                      padding: "5px 9px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "700",
                    }}
                  >
                    {member.is_active ? "Visible" : "Hidden"}
                  </span>

                  <span style={{ fontSize: "12px", color: "#64748b" }}>
                    Order: {member.display_order ?? 0}
                  </span>
                </div>

                <h3 style={{ margin: "0 0 6px", fontSize: "17px" }}>
                  {member.full_name}
                </h3>

                <p
                  style={{
                    margin: "0 0 12px",
                    color: "#b91c1c",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {member.position}
                </p>

                <p
                  style={{
                    fontSize: "13px",
                    color: "#64748b",
                    lineHeight: "1.7",
                    minHeight: "65px",
                  }}
                >
                  {member.biography
                    ? member.biography.length > 130
                      ? `${member.biography.slice(0, 130)}...`
                      : member.biography
                    : "No biography added."}
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
                    onClick={() => openEditForm(member)}
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    style={styles.actionButton}
                    onClick={() => toggleVisibility(member)}
                  >
                    {member.is_active ? (
                      <EyeOff size={14} />
                    ) : (
                      <Eye size={14} />
                    )}
                    {member.is_active ? "Hide" : "Show"}
                  </button>

                  <button
                    style={{
                      ...styles.actionButton,
                      color: "#dc2626",
                    }}
                    onClick={() => handleDelete(member.id)}
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
                {editingId ? "Edit Team Member" : "Add Team Member"}
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
              <label style={styles.label}>Full Name *</label>
              <input
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                style={styles.field}
              />

              <label style={styles.label}>Position *</label>
              <input
                name="position"
                value={form.position}
                onChange={handleChange}
                placeholder="e.g. Managing Director"
                required
                style={styles.field}
              />

              <label style={styles.label}>Biography</label>
              <textarea
                name="biography"
                value={form.biography}
                onChange={handleChange}
                placeholder="Write a short biography..."
                rows={5}
                style={{
                  ...styles.field,
                  resize: "vertical",
                }}
              />

              <label style={styles.label}>Display Order</label>
              <input
                type="number"
                name="display_order"
                value={form.display_order}
                onChange={handleChange}
                min="0"
                style={styles.field}
              />

              <label style={styles.label}>Profile Photo</label>

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
                    alt="Team member preview"
                    style={{
                      width: "110px",
                      height: "110px",
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
                Show this team member on the website
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
                    ? "Update Team Member"
                    : "Save Team Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeamMembers;
