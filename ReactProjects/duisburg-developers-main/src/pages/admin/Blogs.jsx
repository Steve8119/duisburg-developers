
import { useEffect, useState } from "react";

import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Upload,
  FileText,
  Loader2,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

import { supabase } from "../../lib/supabase";
import { uploadImage } from "../../utils/supabaseStorage";
import { useAuth } from "../../context/AuthContext";

const BUCKET_NAME = "duisburg-media";

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  excerpt: "",
  content: "",
  featured_image: "",
  storage_path: null,
  author: "",
  status: "draft",
  published_at: "",
};

function Blogs() {
  const { user, profile } = useAuth();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // LOAD BLOG POSTS
  const loadBlogs = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setBlogs(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // CREATE URL SLUG
  const createSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // HANDLE FORM INPUTS
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
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

  // OPEN NEW BLOG FORM
  const openNewForm = () => {
    clearImage();

    setEditingId(null);

    setForm({
      ...emptyForm,
      author: profile?.full_name || user?.email || "",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // OPEN EDIT BLOG FORM
  const openEditForm = (blog) => {
    clearImage();

    setEditingId(blog.id);

    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      featured_image: blog.featured_image || "",
      storage_path: blog.storage_path || null,
      author: blog.author || "",
      status: blog.status || "draft",
      published_at: blog.published_at
        ? blog.published_at.slice(0, 16)
        : "",
    });

    setImagePreview(blog.featured_image || "");
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // SELECT FEATURED IMAGE
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

  // REMOVE FEATURED IMAGE
  const removeImage = () => {
    clearImage();

    setForm((previous) => ({
      ...previous,
      featured_image: "",
      storage_path: null,
    }));
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

  // SAVE BLOG POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    let uploadedPath = null;

    try {
      if (!form.title.trim()) {
        throw new Error("Blog title is required.");
      }

      if (!form.category.trim()) {
        throw new Error("Blog category is required.");
      }

      if (!form.content.trim()) {
        throw new Error("Blog content is required.");
      }

      const slug = createSlug(form.title);

      if (!slug) {
        throw new Error("Please enter a valid blog title.");
      }

      let imageUrl = form.featured_image || null;
      let storagePath = form.storage_path || null;

      // UPLOAD NEW FEATURED IMAGE
      if (selectedImage) {
        const uploaded = await uploadImage(
          selectedImage,
          "blogs"
        );

        imageUrl = uploaded.url;
        storagePath = uploaded.path;
        uploadedPath = uploaded.path;
      }

      const isPublished = form.status === "published";

      const blogData = {
        title: form.title.trim(),
        slug,
        category: form.category.trim(),
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        featured_image: imageUrl,
        storage_path: storagePath,
        author:
          form.author.trim() ||
          profile?.full_name ||
          user?.email ||
          "",
        status: form.status,
        published_at: isPublished
          ? form.published_at
            ? new Date(form.published_at).toISOString()
            : new Date().toISOString()
          : null,
      };

      let result;

      if (editingId) {
        result = await supabase
          .from("blog_posts")
          .update(blogData)
          .eq("id", editingId);
      } else {
        result = await supabase
          .from("blog_posts")
          .insert([blogData]);
      }

      if (result.error) {
        throw result.error;
      }

      // REMOVE OLD IMAGE AFTER SUCCESSFUL SAVE
      const oldStoragePath = editingId
        ? blogs.find((blog) => blog.id === editingId)?.storage_path
        : null;

      if (
        oldStoragePath &&
        oldStoragePath !== storagePath
      ) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([oldStoragePath]);

        if (storageError) {
          console.warn(
            "Old blog image could not be removed:",
            storageError.message
          );
        }
      }

      setSuccess(
        editingId
          ? "Blog post updated successfully!"
          : "Blog post created successfully!"
      );

      clearImage();
      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);

      await loadBlogs();
    } catch (err) {
      // CLEAN UP NEW IMAGE IF DATABASE SAVE FAILED
      if (uploadedPath) {
        await supabase.storage
          .from(BUCKET_NAME)
          .remove([uploadedPath]);
      }

      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // DELETE BLOG POST
  const deleteBlog = async (blog) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blog.title}"?`
    );

    if (!confirmed) return;

    setDeletingId(blog.id);
    setError("");
    setSuccess("");

    try {
      const { error: deleteError } = await supabase
        .from("blog_posts")
        .delete()
        .eq("id", blog.id);

      if (deleteError) throw deleteError;

      if (blog.storage_path) {
        const { error: storageError } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([blog.storage_path]);

        if (storageError) {
          console.warn(
            "Blog image cleanup failed:",
            storageError.message
          );
        }
      }

      setSuccess("Blog post deleted successfully!");

      await loadBlogs();
    } catch (err) {
      setError(err.message || "Could not delete blog post.");
    } finally {
      setDeletingId(null);
    }
  };

  // FILTER BLOG POSTS
  const filteredBlogs = blogs.filter((blog) => {
    const query = search.toLowerCase();

    const matchesSearch =
      blog.title?.toLowerCase().includes(query) ||
      blog.category?.toLowerCase().includes(query) ||
      blog.author?.toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "all" ||
      blog.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #dce2ea",
    borderRadius: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "8px",
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
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
            Blog Management
          </h1>

          <p style={{ color: "#718096", margin: 0 }}>
            Create, edit and manage company blog posts.
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
          Add New Blog
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

      {/* SEARCH AND FILTERS */}
      <div
        style={{
          background: "white",
          padding: "15px",
          borderRadius: "9px",
          marginBottom: "22px",
          border: "1px solid #e8edf2",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <Search color="#718096" size={20} />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blog posts..."
          style={{
            ...inputStyle,
            flex: 1,
            minWidth: "180px",
            border: "none",
            outline: "none",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            ...inputStyle,
            width: "180px",
          }}
        >
          <option value="all">All Posts</option>
          <option value="published">Published</option>
          <option value="draft">Drafts</option>
        </select>
      </div>

      {/* BLOG FORM */}
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
              {editingId ? "Edit Blog Post" : "Create Blog Post"}
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
            {/* TITLE AND CATEGORY */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
              }}
            >
              <div>
                <label style={labelStyle}>
                  Blog Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter blog title"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Category *
                </label>

                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Construction"
                  style={inputStyle}
                />
              </div>
            </div>

            {/* EXCERPT */}
            <div style={{ marginTop: "20px" }}>
              <label style={labelStyle}>
                Short Excerpt
              </label>

              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="Write a short introduction to this article..."
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />
            </div>

            {/* FULL CONTENT */}
            <div style={{ marginTop: "20px" }}>
              <label style={labelStyle}>
                Blog Content *
              </label>

              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                rows={12}
                placeholder="Write your complete blog article here..."
                style={{
                  ...inputStyle,
                  resize: "vertical",
                  lineHeight: 1.7,
                }}
              />

              <p
                style={{
                  color: "#718096",
                  fontSize: "12px",
                }}
              >
                You can write your article using paragraphs and line breaks.
              </p>
            </div>

            {/* FEATURED IMAGE */}
            <div style={{ marginTop: "25px" }}>
              <label style={labelStyle}>
                Featured Image
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
                Choose Featured Image

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  hidden
                  onChange={handleImageSelection}
                />
              </label>

              <p
                style={{
                  color: "#718096",
                  fontSize: "12px",
                }}
              >
                JPG, PNG or WebP. Maximum 5MB.
              </p>

              {imagePreview && (
                <div
                  style={{
                    marginTop: "15px",
                    maxWidth: "350px",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Blog featured preview"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  <button
                    type="button"
                    onClick={removeImage}
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

            {/* AUTHOR AND STATUS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "18px",
                marginTop: "25px",
              }}
            >
              <div>
                <label style={labelStyle}>
                  Author
                </label>

                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="Author name"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Publication Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            {form.status === "published" && (
              <div style={{ marginTop: "20px" }}>
                <label style={labelStyle}>
                  Publication Date
                </label>

                <input
                  type="datetime-local"
                  name="published_at"
                  value={form.published_at}
                  onChange={handleChange}
                  style={inputStyle}
                />

                <p
                  style={{
                    color: "#718096",
                    fontSize: "12px",
                  }}
                >
                  Leave empty to use the current date and time.
                </p>
              </div>
            )}

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
                  "Update Blog Post"
                ) : (
                  "Save Blog Post"
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

      {/* BLOG POSTS LIST */}
      <h2 style={{ fontSize: "18px", marginBottom: "18px" }}>
        All Blog Posts ({blogs.length})
      </h2>

      {loading ? (
        <p>Loading blog posts...</p>
      ) : filteredBlogs.length === 0 ? (
        <div
          style={{
            background: "white",
            textAlign: "center",
            padding: "55px 20px",
            borderRadius: "10px",
            border: "1px solid #e8edf2",
          }}
        >
          <FileText size={42} color="#9aa8ba" />

          <h3>No blog posts found</h3>

          <p style={{ color: "#718096" }}>
            Create your first blog post to get started.
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
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              style={{
                background: "white",
                borderRadius: "10px",
                overflow: "hidden",
                border: "1px solid #e8edf2",
              }}
            >
              {blog.featured_image ? (
                <img
                  src={blog.featured_image}
                  alt={blog.title}
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
                <span
                  style={{
                    display: "inline-block",
                    background:
                      blog.status === "published"
                        ? "#eaf8ef"
                        : "#fff5e6",
                    color:
                      blog.status === "published"
                        ? "#18743a"
                        : "#a15c00",
                    padding: "5px 9px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {blog.status}
                </span>

                <h3 style={{ margin: "12px 0 8px" }}>
                  {blog.title}
                </h3>

                <p
                  style={{
                    color: "#bd3038",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  {blog.category}
                </p>

                <p
                  style={{
                    color: "#718096",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    minHeight: "55px",
                  }}
                >
                  {blog.excerpt || blog.content?.slice(0, 110)}
                </p>

                <p
                  style={{
                    color: "#8996a8",
                    fontSize: "12px",
                  }}
                >
                  By {blog.author || "Administrator"}
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
                    onClick={() => openEditForm(blog)}
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
                    onClick={() => deleteBlog(blog)}
                    disabled={deletingId === blog.id}
                    style={{
                      padding: "10px 13px",
                      border: "none",
                      borderRadius: "5px",
                      background: "#fff0f0",
                      color: "#bd3038",
                      cursor: "pointer",
                    }}
                  >
                    {deletingId === blog.id ? (
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

export default Blogs;
