import { useState, useMemo } from "react";
import {
  Users, MessageSquare, Heart, Bookmark, Share2, MapPin, Search,
  PlusCircle, Filter, Star, Calendar, TrendingUp, Globe, ChevronRight,
  HelpCircle, BookOpen, Sparkles, Pin, MoreHorizontal, Bell
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import type { CommunityGroup, CommunityPost } from "@/types";

const COMMUNITY_GROUPS: CommunityGroup[] = [
  { id: "g1", name: "Berlin Expats", city: "Berlin", country: "Germany", category: "city", members: 12400, description: "Everything you need to know about living and working in Berlin.", tags: ["Housing", "Jobs", "Events", "Networking"], icon: "🇩🇪", color: "bg-navy-900", recentActivity: "2 min ago" },
  { id: "g2", name: "Amsterdam Internationals", city: "Amsterdam", country: "Netherlands", category: "city", members: 8900, description: "Expat community for Amsterdam residents and newcomers.", tags: ["Housing", "Visa", "Culture", "Meetups"], icon: "🇳🇱", color: "bg-royalblue-600", recentActivity: "5 min ago" },
  { id: "g3", name: "EU Tech Professionals", city: "EU-Wide", country: "EU", category: "profession", members: 31200, description: "Network of tech professionals working and relocating across Europe.", tags: ["Tech", "Careers", "Remote Work", "Startups"], icon: "💻", color: "bg-emerald-700", recentActivity: "1 min ago" },
  { id: "g4", name: "Lisbon Digital Nomads", city: "Lisbon", country: "Portugal", category: "city", members: 6700, description: "Remote workers and digital nomads based in Lisbon.", tags: ["Remote Work", "Coworking", "Events", "Visas"], icon: "🇵🇹", color: "bg-gold-600", recentActivity: "15 min ago" },
  { id: "g5", name: "Indian Professionals in Europe", city: "EU-Wide", country: "EU", category: "nationality", members: 28500, description: "Community for Indian expats working and studying across Europe.", tags: ["Visa", "Culture", "Jobs", "Housing", "Support"], icon: "🇮🇳", color: "bg-orange-600", recentActivity: "3 min ago" },
  { id: "g6", name: "EU Student Network", city: "EU-Wide", country: "EU", category: "profession", members: 45000, description: "Students studying abroad across European universities.", tags: ["Erasmus", "Scholarships", "Study Tips", "Accommodation"], icon: "🎓", color: "bg-purple-700", recentActivity: "8 min ago" },
  { id: "g7", name: "Europe Entrepreneurs", city: "EU-Wide", country: "EU", category: "profession", members: 9800, description: "Founders and entrepreneurs building companies in Europe.", tags: ["Startup", "Funding", "B2B", "Legal", "Tax"], icon: "🚀", color: "bg-navy-700", recentActivity: "20 min ago" },
  { id: "g8", name: "Stockholm Life", city: "Stockholm", country: "Sweden", category: "city", members: 4200, description: "Expats and newcomers enjoying Stockholm's amazing quality of life.", tags: ["Culture", "Nordic Life", "Housing", "Language"], icon: "🇸🇪", color: "bg-royalblue-800", recentActivity: "30 min ago" },
];

const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "p1", author: "Priya Sharma", authorInitials: "PS", authorCountry: "India → Germany",
    group: "Berlin Expats", city: "Berlin", type: "guide",
    title: "Complete Guide: Opening a Bank Account in Germany as a Newcomer (2026)",
    content: "After struggling for 3 weeks to open a bank account in Berlin, I finally figured it out. Here's everything you need: 1) Anmeldung (address registration) first. 2) N26 or DKB work without Anmeldung. 3) Traditional banks (Deutsche Bank, Sparkasse) require Anmeldung. The easiest option is N26 — open fully online in 10 minutes.",
    tags: ["Banking", "Berlin", "Newcomer Tips"], likes: 234, comments: 47, time: "2 hours ago", pinned: true
  },
  {
    id: "p2", author: "Carlos Mendoza", authorInitials: "CM", authorCountry: "Mexico → Netherlands",
    group: "Amsterdam Internationals", city: "Amsterdam", type: "question",
    title: "How long does the DigiD application take in Amsterdam? Mine is taking forever",
    content: "I applied for DigiD 3 weeks ago and still haven't received the letter. I need it for tax registration. Has anyone had this issue? Is there a faster way?",
    tags: ["DigiD", "Netherlands", "Tax"], likes: 67, comments: 23, time: "4 hours ago"
  },
  {
    id: "p3", author: "Aisha Okonkwo", authorInitials: "AO", authorCountry: "Nigeria → EU",
    group: "EU Tech Professionals", city: "Berlin", type: "post",
    title: "Just got my EU Blue Card approved! Here's my timeline and tips 🎉",
    content: "After 6 months of waiting, my EU Blue Card was finally approved! Timeline: Applied Jan 15 → Biometrics Feb 2 → Decision Apr 28. The key was having an employer who's dealt with immigration before. Make sure your salary meets the threshold (€43,992+ for 2026). Happy to answer questions!",
    tags: ["EU Blue Card", "Success Story", "Immigration"], likes: 512, comments: 89, time: "1 day ago"
  },
  {
    id: "p4", author: "Rohan Patel", authorInitials: "RP", authorCountry: "India → Netherlands",
    group: "Indian Professionals in Europe", city: "Amsterdam", type: "question",
    title: "Netherlands 30% tax ruling — does it apply to founders? My accountant is confused",
    content: "I'm moving to Netherlands to run my startup. My local accountant says the 30% ruling only applies to employees, not founders. Can any founder here confirm? This would significantly change my tax calculation.",
    tags: ["Tax", "Netherlands", "Founder", "30% Ruling"], likes: 156, comments: 34, time: "2 days ago"
  },
  {
    id: "p5", author: "Emma Johansson", authorInitials: "EJ", authorCountry: "Sweden",
    group: "EU Student Network", city: "Stockholm", type: "event",
    title: "📅 Monthly Erasmus+ Meetup — Berlin, September 28",
    content: "Join us for the monthly Erasmus+ Berlin meetup! Meet fellow Erasmus students, share experiences, and connect with people from 30+ countries. Location: Soho House Berlin, 7pm. RSVP below!",
    tags: ["Erasmus", "Events", "Berlin", "Networking"], likes: 87, comments: 15, time: "3 days ago"
  },
  {
    id: "p6", author: "Mihail Popescu", authorInitials: "MP", authorCountry: "Romania → Portugal",
    group: "Lisbon Digital Nomads", city: "Lisbon", type: "guide",
    title: "Best coworking spaces in Lisbon 2026 — ranked by a nomad who's tried them all",
    content: "After 18 months in Lisbon working remotely, I've tried virtually every coworking space. My top 3: 1) Second Home Lisbon — beautiful, great community. 2) IDEA Spaces — best value. 3) WeWork Marquês — most professional. Avoid tourist-area coworking spots — overpriced and noisy.",
    tags: ["Coworking", "Lisbon", "Remote Work"], likes: 298, comments: 52, time: "4 days ago"
  },
  {
    id: "p7", author: "Sophie Laurent", authorInitials: "SL", authorCountry: "France → EU",
    group: "Europe Entrepreneurs", city: "Paris", type: "post",
    title: "We just closed our €2M seed round in Berlin. Here's what investors actually look for in EU startups",
    content: "After pitching 40+ investors across Berlin, Amsterdam, and Paris, we closed our round. Key insight: European investors prioritize unit economics over growth. They want to see a path to profitability within 3–4 years. Be upfront about EU regulatory compliance from day one.",
    tags: ["Fundraising", "Startup", "Seed Round", "VC"], likes: 445, comments: 72, time: "5 days ago"
  },
];

const UPCOMING_EVENTS = [
  { name: "Berlin Tech Expats Meetup", date: "Sep 28", city: "Berlin", attendees: 124, icon: "🇩🇪" },
  { name: "Amsterdam Newcomers Welcome", date: "Oct 2", city: "Amsterdam", attendees: 89, icon: "🇳🇱" },
  { name: "EU Startup Founders Mixer", date: "Oct 5", city: "Lisbon", attendees: 67, icon: "🚀" },
  { name: "Indian Expats Europe Diwali", date: "Oct 20", city: "Berlin", attendees: 312, icon: "🪔" },
];

const POST_TYPES = ["All", "Posts", "Questions", "Guides", "Events"];
const CATEGORY_FILTERS = ["All Groups", "City Groups", "Professional", "Nationality", "Interest"];

export default function CommunityPage() {
  const { user, isAuthenticated } = useAuth();
  const { info } = useToast();
  const [search, setSearch] = useState("");
  const [postType, setPostType] = useState("All");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [joinedGroups, setJoinedGroups] = useState<string[]>(["g3"]);
  const [activeView, setActiveView] = useState<"feed" | "groups" | "events">("feed");
  const [newPostOpen, setNewPostOpen] = useState(false);

  const toggleLike = (id: string) => {
    if (!isAuthenticated) { info("Please login to like posts"); return; }
    setLikedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSave = (id: string) => {
    if (!isAuthenticated) { info("Please login to save posts"); return; }
    setSavedPosts(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleJoin = (id: string) => {
    if (!isAuthenticated) { info("Please login to join groups"); return; }
    setJoinedGroups(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredPosts = useMemo(() => {
    return COMMUNITY_POSTS.filter(p => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.content.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
      const matchType = postType === "All" ||
        (postType === "Posts" && p.type === "post") ||
        (postType === "Questions" && p.type === "question") ||
        (postType === "Guides" && p.type === "guide") ||
        (postType === "Events" && p.type === "event");
      return matchSearch && matchType;
    });
  }, [search, postType]);

  const typeIcon: Record<string, string> = {
    post: "💬", question: "❓", guide: "📖", event: "📅"
  };
  const typeColor: Record<string, string> = {
    post: "bg-navy-100 text-navy-700",
    question: "bg-gold-100 text-gold-700",
    guide: "bg-emerald-100 text-emerald-700",
    event: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className="bg-navy-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #D4A72C 0%, transparent 50%), radial-gradient(circle at 80% 30%, #2563EB 0%, transparent 50%)" }} />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold-500 flex items-center justify-center shrink-0">
                <Users size={28} className="text-white" />
              </div>
              <div>
                <h1 className="font-serif text-4xl font-bold text-white mb-2">European Community</h1>
                <p className="text-white/70 text-lg">Connect with expats, students, professionals, and entrepreneurs across Europe.</p>
                <div className="flex items-center gap-4 mt-3 text-white/50 text-sm">
                  <span>👥 {(120400).toLocaleString()}+ members</span>
                  <span>💬 {(8).toLocaleString()}K+ posts this week</span>
                  <span>🌍 44 countries</span>
                </div>
              </div>
            </div>
            {isAuthenticated && (
              <button
                onClick={() => setNewPostOpen(true)}
                className="btn-gold flex items-center gap-2 shrink-0"
              >
                <PlusCircle size={16} /> New Post
              </button>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-8 w-fit">
          {[
            { id: "feed", label: "Community Feed", icon: MessageSquare },
            { id: "groups", label: "Groups", icon: Users },
            { id: "events", label: "Events", icon: Calendar },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as typeof activeView)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  activeView === tab.id ? "bg-white text-navy-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* FEED VIEW */}
        {activeView === "feed" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
            {/* Posts */}
            <div className="space-y-4">
              {/* Search & Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="input-premium pl-9 text-sm"
                  />
                </div>
                <div className="flex gap-1">
                  {POST_TYPES.map(t => (
                    <button
                      key={t}
                      onClick={() => setPostType(t)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        postType === t ? "bg-navy-900 text-white" : "bg-white border border-gray-200 text-gray-600 hover:border-navy-400"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {filteredPosts.map(post => (
                <div key={post.id} className="card-premium p-6">
                  {/* Post Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {post.authorInitials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-navy-900 text-sm">{post.author}</p>
                          <span className="text-gray-400 text-xs">{post.authorCountry}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span>{post.group}</span>
                          <span>·</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {post.pinned && <Pin size={13} className="text-gold-500" />}
                      <span className={`tag text-xs ${typeColor[post.type]}`}>
                        {typeIcon[post.type]} {post.type}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-navy-900 mb-2 leading-snug">{post.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-3">{post.content}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map(t => <span key={t} className="tag tag-gray text-xs">{t}</span>)}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 text-sm transition-colors ${
                          likedPosts.includes(post.id) ? "text-red-500" : "text-gray-400 hover:text-red-400"
                        }`}
                      >
                        <Heart size={14} fill={likedPosts.includes(post.id) ? "currentColor" : "none"} />
                        <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-navy-600 transition-colors">
                        <MessageSquare size={14} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-royalblue-600 transition-colors">
                        <Share2 size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleSave(post.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        savedPosts.includes(post.id) ? "text-gold-500" : "text-gray-400 hover:text-gold-500"
                      }`}
                    >
                      <Bookmark size={14} fill={savedPosts.includes(post.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Joined Groups */}
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-navy-900 mb-3 text-sm">Your Groups</h3>
                {joinedGroups.length > 0 ? (
                  <div className="space-y-2">
                    {COMMUNITY_GROUPS.filter(g => joinedGroups.includes(g.id)).map(g => (
                      <div key={g.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                        <span className="text-base">{g.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-navy-900 truncate">{g.name}</p>
                          <p className="text-xs text-gray-400">{g.recentActivity}</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">Join groups to see them here</p>
                )}
                <button onClick={() => setActiveView("groups")} className="w-full mt-3 text-xs text-royalblue-600 font-semibold hover:underline">
                  Browse all groups →
                </button>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-navy-900 mb-3 text-sm flex items-center gap-2">
                  <Calendar size={14} className="text-gold-500" /> Upcoming Events
                </h3>
                <div className="space-y-3">
                  {UPCOMING_EVENTS.map(e => (
                    <div key={e.name} className="flex items-start gap-2">
                      <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center text-lg shrink-0">
                        {e.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-900 leading-tight">{e.name}</p>
                        <p className="text-xs text-gray-400">{e.date} · {e.city} · {e.attendees} going</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Guides */}
              <div className="bg-navy-900 rounded-2xl p-5 text-white">
                <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                  <BookOpen size={14} className="text-gold-400" /> Popular Guides
                </h3>
                <div className="space-y-2">
                  {[
                    "Opening a bank account in Germany",
                    "Netherlands DigiD complete guide",
                    "EU Blue Card application tips",
                    "Finding housing in Berlin as an expat",
                  ].map(g => (
                    <button key={g} className="w-full text-left text-xs text-white/70 hover:text-white py-1.5 border-b border-white/10 last:border-0 transition-colors">
                      📖 {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GROUPS VIEW */}
        {activeView === "groups" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-navy-900">Community Groups</h2>
              <p className="text-gray-500 text-sm">{COMMUNITY_GROUPS.length} groups</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {COMMUNITY_GROUPS.map(group => {
                const isJoined = joinedGroups.includes(group.id);
                return (
                  <div key={group.id} className="card-premium p-5">
                    <div className={`w-12 h-12 ${group.color} rounded-2xl flex items-center justify-center text-2xl mb-3`}>
                      {group.icon}
                    </div>
                    <h3 className="font-semibold text-navy-900 mb-1">{group.name}</h3>
                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                      <MapPin size={10} /> {group.city}, {group.country}
                    </p>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">{group.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {group.tags.slice(0, 2).map(t => <span key={t} className="tag tag-gray text-xs">{t}</span>)}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-400"><Users size={11} className="inline mr-1" />{group.members.toLocaleString()} members</span>
                      <span className="text-xs text-emerald-600">● {group.recentActivity}</span>
                    </div>
                    <button
                      onClick={() => toggleJoin(group.id)}
                      className={`w-full py-2 rounded-xl text-sm font-semibold transition-all ${
                        isJoined
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-navy-900 text-white hover:bg-navy-800"
                      }`}
                    >
                      {isJoined ? "✓ Joined" : "Join Group"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* EVENTS VIEW */}
        {activeView === "events" && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-navy-900">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { name: "Berlin Tech Expats Meetup", date: "Sep 28, 2026", city: "Berlin", country: "Germany", attendees: 124, type: "Networking", icon: "🇩🇪", desc: "Monthly meetup for tech professionals in Berlin. Free entry, bring business cards!", free: true },
                { name: "Amsterdam Newcomers Welcome", date: "Oct 2, 2026", city: "Amsterdam", country: "Netherlands", attendees: 89, type: "Social", icon: "🇳🇱", desc: "A warm welcome event for people who recently moved to Amsterdam.", free: true },
                { name: "EU Startup Founders Mixer", date: "Oct 5, 2026", city: "Lisbon", country: "Portugal", attendees: 67, type: "Business", icon: "🚀", desc: "Meet fellow founders, share challenges, find co-founders and investors.", free: false },
                { name: "Indian Expats Europe Diwali", date: "Oct 20, 2026", city: "Berlin", country: "Germany", attendees: 312, type: "Cultural", icon: "🪔", desc: "Celebrate Diwali with hundreds of Indian expats across Europe. Food, music, traditions!", free: false },
                { name: "Erasmus Berlin Mixer", date: "Sep 30, 2026", city: "Berlin", country: "Germany", attendees: 178, type: "Student", icon: "🎓", desc: "Connect with Erasmus students from across Europe at this monthly mixer.", free: true },
                { name: "Nordic Business Breakfast", date: "Oct 8, 2026", city: "Stockholm", country: "Sweden", attendees: 43, type: "Business", icon: "🇸🇪", desc: "Early morning networking breakfast for business professionals in Stockholm.", free: false },
              ].map(ev => (
                <div key={ev.name} className="card-premium p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{ev.icon}</span>
                    <div className="flex gap-1.5">
                      {ev.free && <span className="tag bg-emerald-100 text-emerald-700 text-xs">Free</span>}
                      <span className="tag tag-blue text-xs">{ev.type}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-navy-900 mb-1">{ev.name}</h3>
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                    <Calendar size={11} /> {ev.date}
                    <MapPin size={11} /> {ev.city}, {ev.country}
                  </p>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">{ev.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{ev.attendees} attending</span>
                    <button
                      onClick={() => !isAuthenticated && info("Please login to RSVP")}
                      className="px-4 py-2 bg-navy-900 text-white text-xs font-semibold rounded-xl hover:bg-navy-800 transition-all"
                    >
                      RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
