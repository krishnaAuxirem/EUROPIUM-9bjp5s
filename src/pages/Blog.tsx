import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, Tag, Calendar, User, ArrowRight, ChevronRight } from "lucide-react";

const BLOG_POSTS = [
  {
    id: "b1", title: "Top 10 Tech Jobs in Germany 2026", slug: "top-tech-jobs-germany-2026",
    excerpt: "Discover the most in-demand tech roles in Germany with salaries, requirements, and application tips.",
    category: "Job Tips", tags: ["Germany", "Tech", "Jobs"], author: "EUROPIUM Editorial",
    publishedAt: "Aug 15, 2026", readTime: 8, views: 12400, featured: true,
    coverColor: "bg-navy-900",
  },
  {
    id: "b2", title: "How to Get EU Blue Card: Complete Guide", slug: "eu-blue-card-guide",
    excerpt: "Step-by-step guide to obtaining the EU Blue Card for skilled workers relocating to Europe.",
    category: "Visa & Immigration", tags: ["EU Blue Card", "Visa", "Work Permit"], author: "EUROPIUM Editorial",
    publishedAt: "Jul 20, 2026", readTime: 12, views: 8900, featured: true,
    coverColor: "bg-royalblue-800",
  },
  {
    id: "b3", title: "Living in Lisbon: The Digital Nomad's Complete Guide", slug: "living-lisbon-digital-nomad",
    excerpt: "Everything you need to know about living and working remotely in Lisbon, Portugal.",
    category: "Lifestyle", tags: ["Lisbon", "Digital Nomad", "Portugal"], author: "EUROPIUM Editorial",
    publishedAt: "Jun 10, 2026", readTime: 10, views: 6200, featured: false,
    coverColor: "country-portugal",
  },
  {
    id: "b4", title: "Erasmus+ Scholarship: How to Apply & Win in 2027", slug: "erasmus-scholarship-guide",
    excerpt: "A comprehensive guide to the Erasmus+ program — eligibility, application tips, and what to expect.",
    category: "Education", tags: ["Erasmus+", "Scholarship", "Students"], author: "EUROPIUM Editorial",
    publishedAt: "Jun 5, 2026", readTime: 9, views: 5100, featured: false,
    coverColor: "bg-gold-600",
  },
  {
    id: "b5", title: "Best Cities for Expats in Europe 2026", slug: "best-expat-cities-europe-2026",
    excerpt: "Rankings based on cost of living, quality of life, expat community, and job opportunities.",
    category: "Lifestyle", tags: ["Expat", "Cities", "Quality of Life"], author: "EUROPIUM Editorial",
    publishedAt: "May 20, 2026", readTime: 7, views: 9800, featured: false,
    coverColor: "bg-emerald-700",
  },
  {
    id: "b6", title: "Starting a Business in the Netherlands: A Complete Guide", slug: "business-netherlands-guide",
    excerpt: "From company registration to banking and taxation — everything you need to launch in the Netherlands.",
    category: "Business", tags: ["Netherlands", "Startup", "Business"], author: "EUROPIUM Editorial",
    publishedAt: "May 1, 2026", readTime: 14, views: 4400, featured: false,
    coverColor: "country-netherlands",
  },
];

const CATEGORIES = ["All", "Job Tips", "Visa & Immigration", "Education", "Lifestyle", "Business", "Travel Guide", "Technology"];

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = BLOG_POSTS.filter(p => {
    const m = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    const c = category === "All" || p.category === category;
    return m && c;
  });

  const featured = BLOG_POSTS.filter(p => p.featured);

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 europium-pattern" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">EUROPIUM Blog</span>
            <h1 className="font-serif text-5xl font-bold text-white mb-4">Insights for European Living</h1>
            <p className="text-white/70 text-lg">Jobs, visas, education, housing, and lifestyle guides curated by Europe experts.</p>
            <div className="relative mt-8 max-w-xl mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-4 rounded-xl bg-white text-navy-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Featured Posts */}
        {!search && category === "All" && (
          <div className="mb-12">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">Featured Articles</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map(post => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                  <div className={`${post.coverColor} h-52 rounded-2xl relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 flex items-end p-6">
                      <div>
                        <span className="tag bg-white/20 text-white text-xs mb-2 inline-block">{post.category}</span>
                        <h2 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors leading-tight">
                          {post.title}
                        </h2>
                        <div className="flex items-center gap-3 mt-2 text-white/60 text-xs">
                          <span>{post.readTime} min read</span>
                          <span>·</span>
                          <span>{post.views.toLocaleString()} views</span>
                          <span>·</span>
                          <span>{post.publishedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                category === c ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="font-semibold text-gray-600 mb-2">No articles found</p>
            <p className="text-gray-400 text-sm">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group card-premium overflow-hidden block">
                <div className={`${post.coverColor} h-40 relative`}>
                  <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                    <span className="tag bg-white/20 text-white text-xs">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h2 className="font-serif text-lg font-bold text-navy-900 group-hover:text-royalblue-600 transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.slice(0, 3).map(t => (
                      <span key={t} className="tag tag-navy text-xs">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {post.publishedAt}</span>
                      <span>{post.readTime} min</span>
                    </div>
                    <span className="text-royalblue-600 group-hover:underline flex items-center gap-1">
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
