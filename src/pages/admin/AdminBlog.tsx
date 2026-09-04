import { useState } from "react";
import { Plus, Edit2, Trash2, Eye, Tag, Search, BookOpen, CheckCircle, XCircle, Image } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import type { BlogPost } from "@/types";

const CATEGORIES = ["News", "Travel Guide", "Job Tips", "Education", "Housing", "Business", "Visa & Immigration", "Lifestyle", "Technology"];

const INITIAL_POSTS: BlogPost[] = [
  {
    id: "b1", title: "Top 10 Tech Jobs in Germany 2026", slug: "top-tech-jobs-germany-2026",
    content: "Germany's tech sector is booming with thousands of high-paying positions...",
    excerpt: "Discover the most in-demand tech roles in Germany with salaries, requirements, and application tips.",
    category: "Job Tips", tags: ["Germany", "Tech", "Jobs", "Salary"], author: "Admin EUROPIUM",
    authorId: "admin_001", status: "published", featured: true,
    seoTitle: "Top Tech Jobs Germany 2026 | EUROPIUM", seoDescription: "Find the best tech jobs in Germany...",
    publishedAt: "2026-08-15", createdAt: "2026-08-10", updatedAt: "2026-08-15", readTime: 8, views: 12400,
  },
  {
    id: "b2", title: "How to Get EU Blue Card: Complete Guide", slug: "eu-blue-card-guide",
    content: "The EU Blue Card is the most comprehensive work permit for skilled professionals...",
    excerpt: "Step-by-step guide to obtaining the EU Blue Card for skilled workers relocating to Europe.",
    category: "Visa & Immigration", tags: ["EU Blue Card", "Visa", "Immigration", "Work Permit"], author: "Admin EUROPIUM",
    authorId: "admin_001", status: "published", featured: true,
    publishedAt: "2026-07-20", createdAt: "2026-07-15", updatedAt: "2026-07-20", readTime: 12, views: 8900,
  },
  {
    id: "b3", title: "Living in Lisbon: The Digital Nomad's Complete Guide", slug: "living-lisbon-digital-nomad",
    content: "Lisbon has emerged as Europe's top destination for digital nomads...",
    excerpt: "Everything you need to know about living and working remotely in Lisbon, Portugal.",
    category: "Lifestyle", tags: ["Lisbon", "Digital Nomad", "Portugal", "Remote Work"], author: "Admin EUROPIUM",
    authorId: "admin_001", status: "published", featured: false,
    publishedAt: "2026-06-10", createdAt: "2026-06-05", updatedAt: "2026-06-10", readTime: 10, views: 6200,
  },
  {
    id: "b4", title: "European University Rankings 2027", slug: "european-university-rankings-2027",
    content: "We've analyzed the latest global rankings to bring you the definitive guide...",
    excerpt: "A comprehensive analysis of the best universities in Europe for 2027 intake.",
    category: "Education", tags: ["University", "Rankings", "Europe", "Study Abroad"], author: "Admin EUROPIUM",
    authorId: "admin_001", status: "draft", featured: false,
    createdAt: "2026-09-01", updatedAt: "2026-09-02", readTime: 15,
  },
];

export default function AdminBlog() {
  const { success, error: toastError } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_POSTS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showEditor, setShowEditor] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: "", category: "News", excerpt: "", content: "",
    tags: "", status: "draft" as "draft" | "published" | "unpublished",
    featured: false, seoTitle: "", seoDescription: "",
  });

  const filtered = posts.filter(p => {
    const m = p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const s = filterStatus === "all" || p.status === filterStatus;
    return m && s;
  });

  const resetForm = () => setForm({ title: "", category: "News", excerpt: "", content: "", tags: "", status: "draft", featured: false, seoTitle: "", seoDescription: "" });

  const openEditor = (post?: BlogPost) => {
    if (post) {
      setEditPost(post);
      setForm({
        title: post.title, category: post.category, excerpt: post.excerpt,
        content: post.content, tags: post.tags.join(", "),
        status: post.status, featured: post.featured,
        seoTitle: post.seoTitle || "", seoDescription: post.seoDescription || "",
      });
    } else {
      setEditPost(null);
      resetForm();
    }
    setShowEditor(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) { toastError("Title is required."); return; }
    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    const now = new Date().toISOString().split("T")[0];

    if (editPost) {
      setPosts(prev => prev.map(p => p.id === editPost.id ? {
        ...p, ...form, tags, slug, updatedAt: now,
        publishedAt: form.status === "published" ? (p.publishedAt || now) : p.publishedAt,
      } : p));
      success("Post updated.");
    } else {
      const newPost: BlogPost = {
        id: "b" + Date.now(),
        slug, tags, author: "Admin EUROPIUM", authorId: "admin_001",
        createdAt: now, updatedAt: now,
        publishedAt: form.status === "published" ? now : undefined,
        readTime: Math.ceil(form.content.split(" ").length / 200) || 5,
        views: 0,
        ...form,
      };
      setPosts(prev => [newPost, ...prev]);
      success("Post created.");
    }
    setShowEditor(false);
    setEditPost(null);
    resetForm();
  };

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
    success("Post deleted.");
  };

  const handlePublish = (id: string) => {
    const now = new Date().toISOString().split("T")[0];
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: "published", publishedAt: now } : p));
    success("Post published.");
  };

  const handleUnpublish = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status: "unpublished" } : p));
    success("Post unpublished.");
  };

  if (showEditor) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-navy-900">{editPost ? "Edit Post" : "New Blog Post"}</h2>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setShowEditor(false); resetForm(); }} className="btn-secondary">Cancel</button>
            <button onClick={handleSave} className="btn-primary">
              {form.status === "published" ? "Publish" : "Save Draft"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="card-premium p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="input-premium text-lg font-serif" placeholder="Enter blog post title..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt / Summary *</label>
                <textarea value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} rows={3} className="input-premium resize-none" placeholder="Brief description of the post..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={12} className="input-premium resize-none font-mono text-sm" placeholder="Write your blog post content here..." />
                <p className="text-xs text-gray-400 mt-1">{form.content.split(" ").filter(Boolean).length} words · ~{Math.ceil(form.content.split(" ").filter(Boolean).length / 200)} min read</p>
              </div>
            </div>

            <div className="card-premium p-6 space-y-4">
              <h3 className="font-semibold text-navy-900">SEO Settings</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
                <input value={form.seoTitle} onChange={e => setForm(p => ({ ...p, seoTitle: e.target.value }))} className="input-premium" placeholder="SEO optimized title..." />
                <p className={`text-xs mt-1 ${form.seoTitle.length > 60 ? "text-red-500" : "text-gray-400"}`}>{form.seoTitle.length}/60</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea value={form.seoDescription} onChange={e => setForm(p => ({ ...p, seoDescription: e.target.value }))} rows={2} className="input-premium resize-none" placeholder="Meta description for search engines..." />
                <p className={`text-xs mt-1 ${form.seoDescription.length > 160 ? "text-red-500" : "text-gray-400"}`}>{form.seoDescription.length}/160</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card-premium p-5 space-y-4">
              <h3 className="font-semibold text-navy-900">Publish</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as any }))} className="input-premium">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 accent-navy-900" />
                <span className="text-sm text-gray-700">Featured Post</span>
              </label>
              <button onClick={handleSave} className={`w-full justify-center ${form.status === "published" ? "btn-primary" : "btn-secondary"}`}>
                {form.status === "published" ? "Publish Now" : "Save Draft"}
              </button>
            </div>

            <div className="card-premium p-5 space-y-3">
              <h3 className="font-semibold text-navy-900">Category & Tags</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="input-premium">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} className="input-premium" placeholder="Tag1, Tag2, Tag3..." />
                <p className="text-xs text-gray-400 mt-1">Separate with commas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy-900">Blog Management</h2>
          <p className="text-gray-500 text-sm">{posts.length} posts · {posts.filter(p => p.status === "published").length} published</p>
        </div>
        <button onClick={() => openEditor()} className="btn-primary text-sm">
          <Plus size={14} /> New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { l: "Total Posts", v: posts.length, icon: "📝" },
          { l: "Published", v: posts.filter(p => p.status === "published").length, icon: "✅" },
          { l: "Drafts", v: posts.filter(p => p.status === "draft").length, icon: "📄" },
          { l: "Total Views", v: posts.reduce((s, p) => s + (p.views || 0), 0).toLocaleString(), icon: "👁️" },
        ].map(s => (
          <div key={s.l} className="card-premium p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="font-bold text-xl text-navy-900 font-serif">{s.v}</p>
            <p className="text-xs text-gray-500">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search posts..." className="input-premium pl-9 text-sm" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input-premium text-sm">
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="unpublished">Unpublished</option>
        </select>
      </div>

      {/* Posts Table */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Title</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Views</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Date</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(post => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {post.featured && <span className="tag bg-gold-100 text-gold-700 text-xs">Featured</span>}
                      <div>
                        <p className="font-semibold text-navy-900 text-sm line-clamp-1 max-w-[250px]">{post.title}</p>
                        <p className="text-xs text-gray-400">{post.readTime} min read</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="tag tag-blue text-xs">{post.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`tag text-xs ${post.status === "published" ? "tag-green" : post.status === "draft" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-navy-900">
                    {post.views ? post.views.toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {post.publishedAt || post.createdAt}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEditor(post)} className="p-1.5 hover:bg-royalblue-100 rounded-lg text-royalblue-600 transition-colors" title="Edit">
                        <Edit2 size={13} />
                      </button>
                      {post.status !== "published" && (
                        <button onClick={() => handlePublish(post.id)} className="p-1.5 hover:bg-emerald-100 rounded-lg text-emerald-600 transition-colors" title="Publish">
                          <CheckCircle size={13} />
                        </button>
                      )}
                      {post.status === "published" && (
                        <button onClick={() => handleUnpublish(post.id)} className="p-1.5 hover:bg-amber-100 rounded-lg text-amber-600 transition-colors" title="Unpublish">
                          <XCircle size={13} />
                        </button>
                      )}
                      <button onClick={() => setDeleteId(post.id)} className="p-1.5 hover:bg-red-100 rounded-lg text-red-500 transition-colors" title="Delete">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10">
              <BookOpen size={32} className="text-gray-200 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">No posts found</p>
            </div>
          )}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-premium-xl text-center">
            <h3 className="font-semibold text-navy-900 mb-2">Delete this post?</h3>
            <p className="text-gray-500 text-sm mb-4">This cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
