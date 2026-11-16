
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  X,
  RefreshCw,
  Loader2,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  User,
  Globe,
  MessageSquare,
  Save,
  Wallet,
  Building2,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

const STATUS_OPTIONS = [
  "new",
  "in_progress",
  "responded",
  "closed",
];

const STATUS_LABELS = {
  new: "New",
  in_progress: "In Progress",
  responded: "Responded",
  closed: "Closed",
};

function formatDate(date) {
  if (!date) return "N/A";

  return new Date(date).toLocaleString("en-KE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function DiasporaEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [editStatus, setEditStatus] = useState("new");
  const [adminNotes, setAdminNotes] = useState("");

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  // LOAD DIASPORA ENQUIRIES
  const fetchEnquiries = async (showRefresh = false) => {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    const { data, error } = await supabase
      .from("diaspora_enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading diaspora enquiries:", error);
      showMessage(error.message, "error");
    } else {
      setEnquiries(data || []);
    }

    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // NOTIFICATIONS
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  // FILTER ENQUIRIES
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enquiry) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch = [
        enquiry.full_name,
        enquiry.country,
        enquiry.email,
        enquiry.whatsapp,
        enquiry.project_type,
        enquiry.project_location,
        enquiry.budget,
        enquiry.message,
      ].some((value) =>
        String(value || "").toLowerCase().includes(search)
      );

      const matchesStatus =
        statusFilter === "all" ||
        enquiry.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchTerm, statusFilter]);

  // STATISTICS
  const totalEnquiries = enquiries.length;

  const newEnquiries = enquiries.filter(
    (item) => item.status === "new"
  ).length;

  const inProgressEnquiries = enquiries.filter(
    (item) => item.status === "in_progress"
  ).length;

  const closedEnquiries = enquiries.filter(
    (item) => item.status === "closed"
  ).length;

  // OPEN DETAILS
  const openEnquiry = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setEditStatus(enquiry.status || "new");
    setAdminNotes(enquiry.admin_notes || "");
    setMessage("");
  };

  // UPDATE ENQUIRY
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!selectedEnquiry) return;

    setSaving(true);
    setMessage("");

    const { data, error } = await supabase
      .from("diaspora_enquiries")
      .update({
        status: editStatus,
        admin_notes: adminNotes,
      })
      .eq("id", selectedEnquiry.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating diaspora enquiry:", error);
      showMessage(error.message, "error");
      setSaving(false);
      return;
    }

    setEnquiries((previous) =>
      previous.map((item) =>
        item.id === selectedEnquiry.id ? data : item
      )
    );

    setSelectedEnquiry(data);
    setEditStatus(data.status);
    setAdminNotes(data.admin_notes || "");

    showMessage("Diaspora enquiry updated successfully.");
    setSaving(false);
  };

  // DELETE ENQUIRY
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this diaspora enquiry? This action cannot be undone."
    );

    if (!confirmed) return;

    setDeletingId(id);

    const { error } = await supabase
      .from("diaspora_enquiries")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting diaspora enquiry:", error);
      showMessage(error.message, "error");
      setDeletingId(null);
      return;
    }

    setEnquiries((previous) =>
      previous.filter((item) => item.id !== id)
    );

    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry(null);
    }

    showMessage("Diaspora enquiry deleted successfully.");
    setDeletingId(null);
  };

  // STATUS BADGE
  const getStatusStyle = (status) => {
    const styles = {
      new: {
        background: "#fee2e2",
        color: "#b91c1c",
      },
      in_progress: {
        background: "#fef3c7",
        color: "#92400e",
      },
      responded: {
        background: "#dbeafe",
        color: "#1d4ed8",
      },
      closed: {
        background: "#dcfce7",
        color: "#166534",
      },
    };

    return styles[status] || styles.new;
  };

  const styles = {
    page: {
      padding: "24px",
      color: "#1e293b",
      fontFamily: "Arial, sans-serif",
      width: "100%",
      boxSizing: "border-box",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "16px",
      marginBottom: "24px",
    },
    heading: {
      fontSize: "26px",
      fontWeight: "700",
      margin: "0 0 8px",
      color: "#0f172a",
    },
    subtitle: {
      color: "#64748b",
      fontSize: "14px",
      margin: 0,
    },
    refreshButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 16px",
      background: "#0f172a",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
    },
    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "16px",
      marginBottom: "24px",
    },
    statCard: {
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      padding: "20px",
    },
    statLabel: {
      color: "#64748b",
      fontSize: "13px",
      marginBottom: "10px",
    },
    statNumber: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#0f172a",
    },
    toolbar: {
      display: "flex",
      gap: "12px",
      flexWrap: "wrap",
      marginBottom: "20px",
    },
    searchBox: {
      flex: "1 1 250px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "#fff",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      padding: "0 12px",
    },
    searchInput: {
      width: "100%",
      padding: "12px 0",
      border: "none",
      outline: "none",
      fontSize: "14px",
    },
    filterSelect: {
      minWidth: "170px",
      padding: "12px",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      background: "#fff",
      fontSize: "14px",
    },
    tableContainer: {
      background: "#fff",
      border: "1px solid #e2e8f0",
      borderRadius: "10px",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "900px",
    },
    th: {
      textAlign: "left",
      padding: "15px",
      background: "#f8fafc",
      color: "#475569",
      fontSize: "12px",
      textTransform: "uppercase",
      borderBottom: "1px solid #e2e8f0",
    },
    td: {
      padding: "15px",
      borderBottom: "1px solid #e2e8f0",
      fontSize: "13px",
      color: "#334155",
    },
    actionButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "8px",
      border: "1px solid #e2e8f0",
      borderRadius: "5px",
      background: "#fff",
      cursor: "pointer",
      color: "#334155",
      marginRight: "6px",
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(15, 23, 42, 0.65)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px",
      zIndex: 1000,
    },
    modal: {
      width: "100%",
      maxWidth: "650px",
      maxHeight: "90vh",
      overflowY: "auto",
      background: "#fff",
      borderRadius: "10px",
      padding: "24px",
      boxSizing: "border-box",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #e2e8f0",
      paddingBottom: "15px",
      marginBottom: "20px",
    },
    closeButton: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "#64748b",
    },
    detailRow: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      marginBottom: "16px",
      fontSize: "14px",
      color: "#475569",
    },
    fieldLabel: {
      display: "block",
      fontWeight: "600",
      fontSize: "13px",
      marginBottom: "8px",
      color: "#334155",
    },
    field: {
      width: "100%",
      padding: "11px",
      border: "1px solid #cbd5e1",
      borderRadius: "6px",
      boxSizing: "border-box",
      fontSize: "14px",
      marginBottom: "18px",
    },
    saveButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "12px 18px",
      background: "#b91c1c",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Diaspora Enquiries</h1>
          <p style={styles.subtitle}>
            Manage project enquiries from clients living abroad.
          </p>
        </div>

        <button
          style={styles.refreshButton}
          onClick={() => fetchEnquiries(true)}
          disabled={refreshing}
        >
          <RefreshCw size={16} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* NOTIFICATION */}
      {message && (
        <div
          style={{
            padding: "12px 15px",
            marginBottom: "18px",
            borderRadius: "6px",
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
          <div style={styles.statLabel}>Total Enquiries</div>
          <div style={styles.statNumber}>{totalEnquiries}</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>New Enquiries</div>
          <div style={styles.statNumber}>{newEnquiries}</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>In Progress</div>
          <div style={styles.statNumber}>{inProgressEnquiries}</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Closed Enquiries</div>
          <div style={styles.statNumber}>{closedEnquiries}</div>
        </div>
      </div>

      {/* SEARCH AND FILTER */}
      <div style={styles.toolbar}>
        <div style={styles.searchBox}>
          <Search size={18} color="#64748b" />

          <input
            type="text"
            placeholder="Search name, country, email, WhatsApp or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="all">All Statuses</option>

          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>

      {/* ENQUIRIES TABLE */}
      <div style={styles.tableContainer}>
        {loading ? (
          <div style={{ padding: "50px", textAlign: "center" }}>
            <Loader2 size={28} color="#b91c1c" />
            <p>Loading diaspora enquiries...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div
            style={{
              padding: "50px 20px",
              textAlign: "center",
              color: "#64748b",
            }}
          >
            <Globe size={35} />
            <h3>No diaspora enquiries found</h3>
            <p>
              Enquiries submitted through the diaspora form will appear here.
            </p>
          </div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Client</th>
                <th style={styles.th}>Country</th>
                <th style={styles.th}>Project Type</th>
                <th style={styles.th}>Budget</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td style={styles.td}>
                    <strong>{enquiry.full_name || "Unknown"}</strong>

                    <div
                      style={{
                        color: "#64748b",
                        fontSize: "12px",
                        marginTop: "5px",
                      }}
                    >
                      {enquiry.email || "No email"}
                    </div>
                  </td>

                  <td style={styles.td}>
                    {enquiry.country || "N/A"}
                  </td>

                  <td style={styles.td}>
                    {enquiry.project_type || "N/A"}
                  </td>

                  <td style={styles.td}>
                    {enquiry.budget || "Not specified"}
                  </td>

                  <td style={styles.td}>
                    {formatDate(enquiry.created_at)}
                  </td>

                  <td style={styles.td}>
                    <span
                      style={{
                        ...getStatusStyle(enquiry.status),
                        padding: "6px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "700",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {STATUS_LABELS[enquiry.status] || "New"}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <button
                      style={styles.actionButton}
                      title="View enquiry"
                      onClick={() => openEnquiry(enquiry)}
                    >
                      <Eye size={17} />
                    </button>

                    <button
                      style={{
                        ...styles.actionButton,
                        color: "#dc2626",
                      }}
                      title="Delete enquiry"
                      onClick={() => handleDelete(enquiry.id)}
                      disabled={deletingId === enquiry.id}
                    >
                      {deletingId === enquiry.id ? (
                        <Loader2 size={17} />
                      ) : (
                        <Trash2 size={17} />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p
        style={{
          color: "#64748b",
          fontSize: "13px",
          marginTop: "15px",
        }}
      >
        Showing {filteredEnquiries.length} of {totalEnquiries} diaspora enquiries
      </p>

      {/* DETAILS MODAL */}
      {selectedEnquiry && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedEnquiry(null)}
        >
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.modalHeader}>
              <div>
                <h2 style={{ margin: 0, fontSize: "20px" }}>
                  Diaspora Enquiry Details
                </h2>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#64748b",
                    fontSize: "12px",
                  }}
                >
                  Received {formatDate(selectedEnquiry.created_at)}
                </p>
              </div>

              <button
                style={styles.closeButton}
                onClick={() => setSelectedEnquiry(null)}
              >
                <X size={23} />
              </button>
            </div>

            {/* CLIENT DETAILS */}
            <div style={styles.detailRow}>
              <User size={18} />
              <div>
                <strong>Client Name</strong>
                <div>{selectedEnquiry.full_name || "N/A"}</div>
              </div>
            </div>

            <div style={styles.detailRow}>
              <Globe size={18} />
              <div>
                <strong>Country</strong>
                <div>{selectedEnquiry.country || "N/A"}</div>
              </div>
            </div>

            <div style={styles.detailRow}>
              <Mail size={18} />
              <div>
                <strong>Email</strong>
                <div>{selectedEnquiry.email || "N/A"}</div>
              </div>
            </div>

            <div style={styles.detailRow}>
              <Phone size={18} />
              <div>
                <strong>WhatsApp</strong>
                <div>{selectedEnquiry.whatsapp || "N/A"}</div>
              </div>
            </div>

            <div style={styles.detailRow}>
              <Building2 size={18} />
              <div>
                <strong>Project Type</strong>
                <div>{selectedEnquiry.project_type || "N/A"}</div>
              </div>
            </div>

            <div style={styles.detailRow}>
              <MapPin size={18} />
              <div>
                <strong>Project Location</strong>
                <div>{selectedEnquiry.project_location || "N/A"}</div>
              </div>
            </div>

            <div style={styles.detailRow}>
              <Wallet size={18} />
              <div>
                <strong>Budget</strong>
                <div>{selectedEnquiry.budget || "Not specified"}</div>
              </div>
            </div>

            <hr
              style={{
                border: 0,
                borderTop: "1px solid #e2e8f0",
                margin: "20px 0",
              }}
            />

            {/* CLIENT MESSAGE */}
            <div style={{ marginBottom: "22px" }}>
              <strong style={{ fontSize: "14px" }}>Message</strong>

              <div
                style={{
                  background: "#f8fafc",
                  padding: "15px",
                  borderRadius: "6px",
                  marginTop: "10px",
                  lineHeight: "1.7",
                  fontSize: "14px",
                  color: "#475569",
                  whiteSpace: "pre-wrap",
                }}
              >
                {selectedEnquiry.message || "No message provided."}
              </div>
            </div>

            <hr
              style={{
                border: 0,
                borderTop: "1px solid #e2e8f0",
                margin: "20px 0",
              }}
            />

            {/* STATUS AND ADMIN NOTES */}
            <form onSubmit={handleUpdate}>
              <label style={styles.fieldLabel}>
                Enquiry Status
              </label>

              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                style={styles.field}
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>

              <label style={styles.fieldLabel}>
                Internal Admin Notes
              </label>

              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add internal notes about this client or project..."
                rows={4}
                style={{
                  ...styles.field,
                  resize: "vertical",
                  fontFamily: "Arial, sans-serif",
                }}
              />

              <button
                type="submit"
                style={{
                  ...styles.saveButton,
                  opacity: saving ? 0.7 : 1,
                }}
                disabled={saving}
              >
                {saving ? (
                  <Loader2 size={17} />
                ) : (
                  <Save size={17} />
                )}

                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>

            {message && (
              <p
                style={{
                  color:
                    messageType === "error" ? "#b91c1c" : "#15803d",
                  fontSize: "13px",
                  marginTop: "15px",
                }}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DiasporaEnquiries;
