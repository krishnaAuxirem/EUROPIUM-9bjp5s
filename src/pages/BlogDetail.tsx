import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, Eye, Tag, ArrowLeft, ArrowRight, Share2, Bookmark } from "lucide-react";

const BLOG_POSTS: Record<string, {
  title: string; category: string; tags: string[]; author: string; publishedAt: string;
  readTime: number; views: number; coverColor: string; content: string; excerpt: string;
}> = {
  "top-tech-jobs-germany-2026": {
    title: "Top 10 Tech Jobs in Germany 2026",
    category: "Job Tips", tags: ["Germany", "Tech", "Jobs", "Salary"],
    author: "EUROPIUM Editorial", publishedAt: "Aug 15, 2026", readTime: 8, views: 12400,
    coverColor: "bg-navy-900", excerpt: "Discover the most in-demand tech roles in Germany with salaries, requirements, and application tips.",
    content: `Germany's tech sector is booming in 2026, with thousands of high-paying positions available across Berlin, Munich, Hamburg, and beyond. Here are the top roles to target:\n\n**1. Senior Software Engineer (€85K – €115K)**\nDemand for experienced software engineers remains exceptionally high, particularly in cloud infrastructure, microservices, and distributed systems. Companies like SAP, Siemens, and scores of Berlin startups are competing for top talent.\n\n**2. AI/ML Engineer (€95K – €130K)**\nArtificial intelligence roles have exploded in demand. From NLP to computer vision, ML engineers with production deployment experience command premium salaries.\n\n**3. DevOps / Platform Engineer (€80K – €110K)**\nWith cloud adoption accelerating, DevOps engineers managing Kubernetes, Terraform, and CI/CD pipelines are in high demand at companies of all sizes.\n\n**4. Product Manager – Tech (€85K – €120K)**\nTech-savvy product managers who can bridge engineering and business needs are among the highest paid and most sought-after roles in Germany.\n\n**5. Data Scientist (€75K – €105K)**\nFrom fintech to automotive, every industry in Germany needs data scientists who can translate data into business intelligence.\n\n**Key Requirements Across All Roles:**\n- German language skills: B2 or higher recommended, though many companies operate in English\n- EU Blue Card eligibility for non-EU nationals (salary threshold: €43,992)\n- Visa sponsorship increasingly offered by major employers\n\n**How EUROPIUM Can Help:**\nBrowse our curated database of 2,840+ German job listings and use our AI Career Advisor to optimize your application for the German market.`,
  },
  "eu-blue-card-guide": {
    title: "How to Get EU Blue Card: Complete Guide",
    category: "Visa & Immigration", tags: ["EU Blue Card", "Visa", "Immigration", "Work Permit"],
    author: "EUROPIUM Editorial", publishedAt: "Jul 20, 2026", readTime: 12, views: 8900,
    coverColor: "bg-royalblue-800", excerpt: "Step-by-step guide to obtaining the EU Blue Card for skilled workers relocating to Europe.",
    content: `The EU Blue Card is the most powerful work permit for highly skilled professionals wanting to live and work in Europe. Valid in 25+ EU member states, it offers unparalleled flexibility and a fast track to permanent residency.\n\n**Who Qualifies?**\n- University degree (or equivalent 5+ years professional experience)\n- Valid job offer from an EU employer\n- Salary above the minimum threshold (varies by country, typically €43,992/year in Germany)\n- Clean criminal record\n- Valid health insurance\n\n**Step-by-Step Application Process:**\n\n1. **Secure Your Job Offer** — Apply to positions on EUROPIUM's job board and ensure the role meets the salary requirements.\n\n2. **Gather Your Documents** — University degree (apostilled), job contract, passport, health insurance proof, and CV.\n\n3. **Apply at the Embassy** — Submit your application at the EU country's embassy or consulate in your home country.\n\n4. **Processing Time** — Typically 2–8 weeks depending on the country.\n\n5. **Move and Register** — Upon arrival, register your address within 14 days at the local Einwohnermeldeamt (Germany) or equivalent.\n\n**Country Comparison:**\n- **Germany**: Most popular, salary threshold €43,992, fastest processing\n- **Netherlands**: Highly Skilled Migrant Visa, excellent English environment\n- **France**: French Tech Visa, thriving startup ecosystem\n- **Sweden**: Work permit, easy English communication\n\n**Path to Permanent Residency:**\nAfter 2 years with EU Blue Card + B1 language certificate, you can apply for permanent residency in Germany. After 5 years, EU long-term resident status across all EU countries.`,
  },
};

const RELATED_POSTS = [
  { slug: "top-tech-jobs-germany-2026", title: "Top 10 Tech Jobs in Germany 2026", category: "Job Tips", readTime: 8 },
  { slug: "eu-blue-card-guide", title: "EU Blue Card Complete Guide", category: "Visa & Immigration", readTime: 12 },
  { slug: "living-lisbon-digital-nomad", title: "Living in Lisbon: Digital Nomad Guide", category: "Lifestyle", readTime: 10 },
];

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? BLOG_POSTS[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-3">Article Not Found</h2>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <div className="page-container">
      {/* Cover */}
      <div className={`${post.coverColor} py-20 relative`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-[900px] mx-auto px-4 sm:px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <span className="tag bg-white/20 text-white text-sm mb-4 inline-block">{post.category}</span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} min read</span>
            <span className="flex items-center gap-1.5"><Eye size={14} /> {post.views.toLocaleString()} views</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.publishedAt}</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
          {/* Article Content */}
          <article>
            <p className="text-lg text-gray-700 leading-relaxed mb-8 font-medium border-l-4 border-gold-400 pl-4 italic">
              {post.excerpt}
            </p>

            <div className="prose prose-lg max-w-none">
              {paragraphs.map((para, i) => {
                if (para.startsWith("**") && para.endsWith("**")) {
                  return <h3 key={i} className="font-serif text-xl font-bold text-navy-900 mt-8 mb-3">{para.replace(/\*\*/g, "")}</h3>;
                }
                if (para.startsWith("- ")) {
                  const items = para.split("\n").filter(l => l.startsWith("- "));
                  return (
                    <ul key={i} className="space-y-2 mb-6 pl-4">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-700">
                          <span className="text-gold-500 mt-1.5 shrink-0">•</span>
                          <span>{item.replace("- ", "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                // Parse inline **bold**
                const parts = para.split(/(\*\*.*?\*\*)/g);
                return (
                  <p key={i} className="text-gray-700 leading-relaxed mb-5">
                    {parts.map((part, j) =>
                      part.startsWith("**") && part.endsWith("**")
                        ? <strong key={j} className="font-semibold text-navy-900">{part.replace(/\*\*/g, "")}</strong>
                        : <span key={j}>{part}</span>
                    )}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border/50">
              {post.tags.map(t => (
                <span key={t} className="tag tag-navy">{t}</span>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 mt-6">
              <p className="text-sm font-medium text-gray-600">Share:</p>
              <button className="tag tag-blue hover:bg-royalblue-200 cursor-pointer transition-colors text-sm">LinkedIn</button>
              <button className="tag bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors text-sm">Twitter/X</button>
              <button className="tag bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors text-sm">Copy Link</button>
            </div>

            {/* CTA */}
            <div className="mt-10 bg-navy-900 rounded-2xl p-8 text-white text-center">
              <h3 className="font-serif text-2xl font-bold mb-3">Ready to Take Action?</h3>
              <p className="text-white/70 mb-6">Browse {post.category === "Job Tips" ? "jobs" : post.category === "Visa & Immigration" ? "visa programs" : "opportunities"} across Europe on EUROPIUM</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to={post.category === "Job Tips" ? "/jobs" : post.category === "Visa & Immigration" ? "/opportunities" : "/explore"} className="btn-gold">
                  Explore Now <ArrowRight size={14} />
                </Link>
                <Link to="/ai-advisor" className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all">
                  Ask AI Advisor
                </Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-4">Related Articles</h3>
              <div className="space-y-3">
                {RELATED_POSTS.filter(r => r.slug !== slug).map(r => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-royalblue-100 flex items-center justify-center shrink-0">
                      <BookOpen size={14} className="text-royalblue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy-900 group-hover:text-royalblue-600 transition-colors line-clamp-2">{r.title}</p>
                      <p className="text-xs text-gray-400">{r.category} · {r.readTime} min</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <h3 className="font-semibold mb-2">Get AI Guidance</h3>
              <p className="text-white/70 text-xs mb-4">Ask our AI Advisor about {post.category.toLowerCase()} in Europe.</p>
              <Link to="/ai-advisor" className="btn-gold w-full justify-center text-sm">Ask AI Advisor</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
