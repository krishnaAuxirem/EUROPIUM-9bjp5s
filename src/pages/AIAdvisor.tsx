import { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles, Send, User, Bot, Briefcase, GraduationCap, Home, Plane,
  Building2, MapPin, TrendingUp, ChevronRight, Star, DollarSign,
  Clock, Globe, BookOpen, ArrowRight, RotateCcw, Copy, CheckCheck,
  Lightbulb, MessageSquare, PlusCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { AIMessage, AICard } from "@/types";

const PERSONAS = [
  { id: "relocator", label: "Relocating", icon: MapPin, color: "bg-royalblue-100 text-royalblue-700" },
  { id: "jobseeker", label: "Job Seeker", icon: Briefcase, color: "bg-navy-100 text-navy-700" },
  { id: "student", label: "Student", icon: GraduationCap, color: "bg-gold-100 text-gold-700" },
  { id: "traveler", label: "Traveler", icon: Plane, color: "bg-emerald-100 text-emerald-700" },
  { id: "entrepreneur", label: "Entrepreneur", icon: Building2, color: "bg-purple-100 text-purple-700" },
];

const SUGGESTED_PROMPTS: Record<string, { prompt: string; label: string; icon: string }[]> = {
  relocator: [
    { prompt: "Create a complete Germany relocation checklist for a software engineer", label: "Germany Checklist", icon: "📋" },
    { prompt: "Compare Germany vs Netherlands for relocation — costs, visa, lifestyle", label: "DE vs NL Compare", icon: "⚖️" },
    { prompt: "What is the cost of living in Berlin vs Amsterdam for a family?", label: "Cost Comparison", icon: "💶" },
    { prompt: "How do I get an EU Blue Card as a software engineer?", label: "EU Blue Card Guide", icon: "🛂" },
  ],
  jobseeker: [
    { prompt: "Find the best European countries for software engineering jobs", label: "Top Tech Countries", icon: "💻" },
    { prompt: "Compare software engineer salaries in Germany, Netherlands, and Switzerland", label: "Salary Comparison", icon: "💰" },
    { prompt: "What are the top companies hiring expats in Berlin right now?", label: "Top Employers", icon: "🏢" },
    { prompt: "How do I write a CV for the German job market?", label: "CV Tips Germany", icon: "📄" },
  ],
  student: [
    { prompt: "Which European countries offer free tuition for international students?", label: "Free Tuition", icon: "🆓" },
    { prompt: "Compare Computer Science masters programs in Germany and Netherlands", label: "CS Programs", icon: "🎓" },
    { prompt: "What scholarships are available for Indian students in Europe?", label: "Scholarships", icon: "🏆" },
    { prompt: "Plan my path from Erasmus+ application to studying in Berlin", label: "Erasmus Guide", icon: "🌍" },
  ],
  traveler: [
    { prompt: "Plan a perfect 7-day Italy trip — Amalfi and Rome with budget", label: "Italy 7-Day Plan", icon: "🇮🇹" },
    { prompt: "Budget travel route: 2 weeks across 4 European countries", label: "Budget Euro Trip", icon: "🎒" },
    { prompt: "Best European cities to visit in spring for first-time travelers", label: "Spring Picks", icon: "🌸" },
    { prompt: "Compare Santorini vs Amalfi Coast for a honeymoon trip", label: "Romantic Escape", icon: "💑" },
  ],
  entrepreneur: [
    { prompt: "Compare Germany vs Netherlands for launching a SaaS startup", label: "SaaS Markets", icon: "🚀" },
    { prompt: "What is the startup ecosystem like in Lisbon vs Berlin?", label: "Ecosystem Compare", icon: "🌱" },
    { prompt: "How do I register a company in the Netherlands as a non-EU founder?", label: "NL Company Setup", icon: "🏛️" },
    { prompt: "What EU grants and funding are available for tech startups?", label: "EU Startup Funding", icon: "💶" },
  ],
};

const AI_KNOWLEDGE_BASE: Record<string, { text: string; cards?: AICard[] }> = {
  "germany relocation checklist": {
    text: "Here's your personalized Germany relocation checklist as a software engineer. I've broken it into priority phases:",
    cards: [
      {
        type: "checklist",
        title: "Phase 1: Before You Move",
        badge: "HIGH PRIORITY",
        color: "red",
        metrics: [
          { label: "Secure job offer", value: "8 weeks before" },
          { label: "Apply for EU Blue Card", value: "6 weeks before" },
          { label: "Find temporary housing", value: "4 weeks before" },
          { label: "Open German bank (N26/DKB)", value: "2 weeks before" },
        ],
        action: { label: "View Relocation Planner", link: "/relocation-planner" }
      },
      {
        type: "country",
        title: "Germany",
        subtitle: "Central Europe · EUR",
        badge: "Recommended",
        color: "navy",
        metrics: [
          { label: "Corporate Tax", value: "30%", highlight: false },
          { label: "Avg Engineer Salary", value: "€75,000–€95,000", highlight: true },
          { label: "Setup Time", value: "4–8 weeks" },
          { label: "Visa Friendly", value: "Yes — EU Blue Card" },
        ],
        action: { label: "Explore Germany", link: "/explore/de" }
      },
    ]
  },
  "germany vs netherlands": {
    text: "Germany and Netherlands are both excellent for tech professionals. Here's a detailed comparison to help you decide:",
    cards: [
      {
        type: "country",
        title: "Germany 🇩🇪",
        subtitle: "Central Europe · World's 4th largest economy",
        badge: "Most Jobs",
        color: "navy",
        metrics: [
          { label: "Avg Tech Salary", value: "€75,000", highlight: true },
          { label: "Income Tax", value: "30–45%", highlight: false },
          { label: "Rent (Berlin)", value: "€1,600–2,200/mo" },
          { label: "Visa", value: "EU Blue Card" },
          { label: "Language", value: "German (English OK)" },
        ],
        action: { label: "Explore Germany", link: "/explore/de" }
      },
      {
        type: "country",
        title: "Netherlands 🇳🇱",
        subtitle: "Western Europe · English-friendly hub",
        badge: "Best for Expats",
        color: "royalblue",
        metrics: [
          { label: "Avg Tech Salary", value: "€80,000", highlight: true },
          { label: "Income Tax (30% ruling)", value: "Effective ~25%", highlight: false },
          { label: "Rent (Amsterdam)", value: "€1,900–2,600/mo" },
          { label: "Visa", value: "Highly Skilled Migrant" },
          { label: "Language", value: "English widely spoken" },
        ],
        action: { label: "Explore Netherlands", link: "/explore/nl" }
      },
    ]
  },
  "saas startup germany netherlands": {
    text: "Both are strong for SaaS, but they suit different business profiles. Here's my analysis:",
    cards: [
      {
        type: "country",
        title: "Germany for SaaS 🇩🇪",
        subtitle: "Largest EU market · Enterprise focus",
        badge: "Best Market Size",
        color: "navy",
        metrics: [
          { label: "Market Size", value: "€84B digital economy" },
          { label: "Corporate Tax", value: "30%", highlight: false },
          { label: "Setup Cost", value: "€25,000 (GmbH)", highlight: false },
          { label: "Startup Funding", value: "€7B+ VC ecosystem", highlight: true },
          { label: "Best For", value: "B2B, Enterprise SaaS" },
        ],
        action: { label: "Business in Germany", link: "/business" }
      },
      {
        type: "country",
        title: "Netherlands for SaaS 🇳🇱",
        subtitle: "Gateway to EU · 30% Tax Ruling",
        badge: "Best Tax Benefits",
        color: "royalblue",
        metrics: [
          { label: "Corporate Tax", value: "19–25%", highlight: true },
          { label: "Setup Cost", value: "€0.01 (BV)", highlight: false },
          { label: "30% Ruling", value: "Tax benefit for founders" },
          { label: "Startup Funding", value: "€2.5B+ ecosystem" },
          { label: "Best For", value: "Intl. SaaS, Scale-ups" },
        ],
        action: { label: "Business in Netherlands", link: "/business" }
      },
    ]
  },
  "free tuition europe": {
    text: "Great news! Several European countries offer free or very low tuition for international students. Here are your best options:",
    cards: [
      {
        type: "university",
        title: "Germany 🇩🇪 — Free Tuition",
        subtitle: "Public universities: €0–€500/semester",
        badge: "Best Value",
        color: "navy",
        metrics: [
          { label: "Top University", value: "TU Munich (#37)" },
          { label: "Tuition", value: "€0 / year", highlight: true },
          { label: "Living Costs", value: "€800–1,200/month" },
          { label: "Language", value: "English programs available" },
        ],
        action: { label: "Browse German Universities", link: "/education" }
      },
      {
        type: "university",
        title: "Norway 🇳🇴 — Free Tuition",
        subtitle: "No tuition at public universities",
        badge: "Nordic Option",
        color: "emerald",
        metrics: [
          { label: "Top University", value: "Oslo University" },
          { label: "Tuition", value: "Free for all", highlight: true },
          { label: "Living Costs", value: "€1,200–1,800/month" },
          { label: "Language", value: "English programs" },
        ],
        action: { label: "Browse Education", link: "/education" }
      },
    ]
  },
  "software engineer salary": {
    text: "Software engineer salaries vary significantly across Europe. Here's a comprehensive breakdown with purchasing power context:",
    cards: [
      {
        type: "cost",
        title: "Software Engineer Salaries 2026",
        subtitle: "Gross annual salary in EUR equivalent",
        badge: "Updated 2026",
        color: "gold",
        metrics: [
          { label: "🇨🇭 Switzerland", value: "€95,000–€140,000", highlight: true },
          { label: "🇩🇰 Denmark", value: "€70,000–€95,000" },
          { label: "🇳🇱 Netherlands", value: "€68,000–€95,000" },
          { label: "🇩🇪 Germany", value: "€65,000–€95,000" },
          { label: "🇸🇪 Sweden", value: "€55,000–€80,000" },
          { label: "🇵🇹 Portugal", value: "€35,000–€60,000" },
        ],
        action: { label: "Browse Tech Jobs", link: "/jobs" }
      },
    ]
  },
  "7-day italy trip": {
    text: "Excellent choice! Here's your perfect 7-day Italy itinerary combining the Amalfi Coast and Rome:",
    cards: [
      {
        type: "checklist",
        title: "7-Day Italy Itinerary",
        badge: "CURATED",
        color: "gold",
        metrics: [
          { label: "Days 1–3: Rome", value: "Colosseum, Vatican, Trastevere" },
          { label: "Day 4: Travel to Amalfi", value: "Naples train + ferry" },
          { label: "Days 5–6: Amalfi Coast", value: "Positano, Ravello, Praiano" },
          { label: "Day 7: Pompeii & Depart", value: "Day trip then flight home" },
          { label: "Budget (mid-range)", value: "€150–250/day" },
        ],
        action: { label: "Plan Full Trip", link: "/trip-planner" }
      },
    ]
  },
};

function getAIResponse(message: string): { text: string; cards?: AICard[] } {
  const lower = message.toLowerCase();
  for (const [key, response] of Object.entries(AI_KNOWLEDGE_BASE)) {
    const keywords = key.split(" ");
    if (keywords.some(kw => lower.includes(kw)) && keywords.filter(kw => lower.includes(kw)).length >= 2) {
      return response;
    }
  }
  if (lower.includes("germany") && lower.includes("checklist")) return AI_KNOWLEDGE_BASE["germany relocation checklist"];
  if (lower.includes("germany") && (lower.includes("netherlands") || lower.includes("dutch"))) return AI_KNOWLEDGE_BASE["germany vs netherlands"];
  if (lower.includes("saas") || (lower.includes("startup") && (lower.includes("germany") || lower.includes("netherlands")))) return AI_KNOWLEDGE_BASE["saas startup germany netherlands"];
  if (lower.includes("free tuition") || (lower.includes("free") && lower.includes("university"))) return AI_KNOWLEDGE_BASE["free tuition europe"];
  if (lower.includes("salary") && (lower.includes("engineer") || lower.includes("software") || lower.includes("developer"))) return AI_KNOWLEDGE_BASE["software engineer salary"];
  if (lower.includes("italy") && (lower.includes("trip") || lower.includes("plan") || lower.includes("itinerary"))) return AI_KNOWLEDGE_BASE["7-day italy trip"];

  if (lower.includes("relocation") || lower.includes("move to") || lower.includes("relocate")) {
    return {
      text: "Relocating to Europe is an exciting step! I can help you create a personalized checklist, compare countries, and understand visa requirements. Which country are you considering, and what's your relocation purpose (work, study, family, or business)?",
    };
  }
  if (lower.includes("job") || lower.includes("work") || lower.includes("career") || lower.includes("employ")) {
    return {
      text: "Europe has thousands of opportunities for international professionals. Germany, Netherlands, and Sweden are top destinations for tech talent. What's your field of expertise and preferred country? I can match you with the best opportunities.",
      cards: [{
        type: "job",
        title: "Quick Job Snapshot",
        subtitle: "Top hiring countries 2026",
        badge: "LIVE DATA",
        color: "navy",
        metrics: [
          { label: "🇩🇪 Germany", value: "2,840+ open roles" },
          { label: "🇳🇱 Netherlands", value: "1,560+ open roles" },
          { label: "🇸🇪 Sweden", value: "980+ open roles" },
        ],
        action: { label: "Browse Jobs", link: "/jobs" }
      }]
    };
  }
  if (lower.includes("study") || lower.includes("university") || lower.includes("education") || lower.includes("master")) {
    return {
      text: "Europe has world-class universities, many with free or affordable tuition. Germany offers free tuition at public universities, while Switzerland has ETH Zurich (#7 globally). What field do you want to study, and do you have a budget in mind?",
    };
  }
  if (lower.includes("cost") || lower.includes("budget") || lower.includes("expensive") || lower.includes("afford")) {
    return {
      text: "Cost of living varies greatly across Europe. Lisbon and Warsaw are budget-friendly (€1,200–1,500/month all-in), while Amsterdam and Zurich are premium (€2,500–3,500/month). Want me to calculate your personal cost estimate for a specific city?",
      cards: [{
        type: "cost",
        title: "Monthly Cost of Living",
        subtitle: "Single professional, all-in",
        badge: "2026 ESTIMATE",
        color: "emerald",
        metrics: [
          { label: "🇵🇹 Lisbon", value: "€1,400–1,800", highlight: true },
          { label: "🇩🇪 Berlin", value: "€2,000–2,600" },
          { label: "🇳🇱 Amsterdam", value: "€2,500–3,200" },
          { label: "🇨🇭 Zurich", value: "€3,500–4,800" },
        ],
        action: { label: "Full Cost Calculator", link: "/cost-calculator" }
      }]
    };
  }
  if (lower.includes("visa") || lower.includes("permit") || lower.includes("blue card")) {
    return {
      text: "For non-EU professionals, the EU Blue Card is the most powerful work permit — valid across 25 EU countries. Requirements: degree + job offer with €43,992+ salary. Portugal's Digital Nomad Visa and Germany's Opportunity Card are also great options. Which visa interests you?",
    };
  }
  if (lower.includes("travel") || lower.includes("trip") || lower.includes("visit") || lower.includes("tourist")) {
    return {
      text: "Europe is a dream destination! From the fjords of Norway to the beaches of Santorini, there's something for everyone. What's your travel style — culture, adventure, beaches, or city breaks? And how long do you have?",
    };
  }
  if (lower.includes("business") || lower.includes("company") || lower.includes("entrepreneur") || lower.includes("startup")) {
    return {
      text: "Europe's startup ecosystem is booming! Germany leads with €7B+ in VC funding, Netherlands offers the 30% tax ruling, and Portugal has affordable costs for early-stage startups. What type of business are you building?",
    };
  }

  return {
    text: "I'm your EUROPIUM AI Advisor — your expert guide for everything Europe. I can help with:\n\n• **Relocation planning** — visa, housing, checklists\n• **Career advice** — jobs, salary benchmarks, companies\n• **Education** — universities, scholarships, applications\n• **Travel planning** — itineraries, budgets, destinations\n• **Business** — startup ecosystems, market entry, funding\n\nWhat would you like to explore today?",
  };
}

function AIResponseCard({ card }: { card: AICard }) {
  const colorMap: Record<string, string> = {
    navy: "bg-navy-50 border-navy-200",
    royalblue: "bg-royalblue-50 border-royalblue-200",
    gold: "bg-gold-50 border-gold-200",
    emerald: "bg-emerald-50 border-emerald-200",
    red: "bg-red-50 border-red-200",
    purple: "bg-purple-50 border-purple-200",
  };
  const badgeColorMap: Record<string, string> = {
    navy: "bg-navy-900 text-white",
    royalblue: "bg-royalblue-600 text-white",
    gold: "bg-gold-500 text-white",
    emerald: "bg-emerald-600 text-white",
    red: "bg-red-600 text-white",
    purple: "bg-purple-600 text-white",
  };
  const color = card.color ?? "navy";

  return (
    <div className={`rounded-2xl border p-4 mt-3 ${colorMap[color] ?? colorMap.navy}`}>
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <p className="font-bold text-navy-900 text-sm">{card.title}</p>
          {card.subtitle && <p className="text-xs text-gray-500 mt-0.5">{card.subtitle}</p>}
        </div>
        {card.badge && (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full shrink-0 ${badgeColorMap[color] ?? badgeColorMap.navy}`}>
            {card.badge}
          </span>
        )}
      </div>
      {card.metrics && (
        <div className="space-y-1.5 mb-3">
          {card.metrics.map((m, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{m.label}</span>
              <span className={`font-semibold ${m.highlight ? "text-emerald-600" : "text-navy-900"}`}>{m.value}</span>
            </div>
          ))}
        </div>
      )}
      {card.action && (
        <Link
          to={card.action.link}
          className="flex items-center gap-1.5 text-xs font-semibold text-royalblue-600 hover:text-royalblue-800 transition-colors"
        >
          {card.action.label} <ArrowRight size={11} />
        </Link>
      )}
    </div>
  );
}

function formatMessageContent(content: string) {
  return content.split("\n").map((line, i) => {
    const boldFormatted = line.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
    return <p key={i} className={line === "" ? "mt-2" : ""}>{boldFormatted}</p>;
  });
}

export default function AIAdvisorPage() {
  const { user } = useAuth();
  const [persona, setPersona] = useState("relocator");
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to EUROPIUM AI Advisor! I'm your expert guide for jobs, relocation, education, travel, and business across Europe. Select your role below or type your question to get started.",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<{ id: string; title: string; time: string; persona: string }[]>([
    { id: "current", title: "New Conversation", time: "Now", persona: "relocator" },
  ]);
  const [activeConvId, setActiveConvId] = useState("current");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 800;
    await new Promise(r => setTimeout(r, delay));

    const { text: responseText, cards } = getAIResponse(text);
    const assistantMsg: AIMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseText,
      timestamp: new Date().toISOString(),
      cards,
    };
    setMessages(prev => [...prev, assistantMsg]);
    setIsTyping(false);

    // Update conversation title
    setConversations(prev => prev.map(c =>
      c.id === activeConvId ? { ...c, title: text.slice(0, 40) + (text.length > 40 ? "..." : "") } : c
    ));
  }, [activeConvId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const copyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const newConversation = () => {
    const newId = Date.now().toString();
    setConversations(prev => [
      { id: newId, title: "New Conversation", time: "Now", persona },
      ...prev,
    ]);
    setActiveConvId(newId);
    setMessages([{
      id: "welcome-" + newId,
      role: "assistant",
      content: "Welcome to EUROPIUM AI Advisor! I'm your expert guide for jobs, relocation, education, travel, and business across Europe. How can I help you today?",
      timestamp: new Date().toISOString(),
    }]);
  };

  const currentPrompts = SUGGESTED_PROMPTS[persona] ?? SUGGESTED_PROMPTS.relocator;

  return (
    <div className="page-container bg-gray-50">
      {/* Header */}
      <section className="bg-navy-900 border-b border-navy-800 py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500 flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h1 className="font-serif text-xl font-bold text-white">EUROPIUM AI Advisor</h1>
                <p className="text-white/50 text-xs">Powered by Europe intelligence · Always available</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {PERSONAS.map(p => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      persona === p.id ? "bg-gold-500 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    <Icon size={12} /> {p.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-6 h-[calc(100vh-200px)] min-h-[600px]">

          {/* Left: Conversation History */}
          <div className="hidden lg:flex flex-col bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-navy-900 text-sm">Conversations</h3>
              <button onClick={newConversation} className="w-8 h-8 rounded-lg bg-navy-900 text-gold-400 hover:bg-navy-800 flex items-center justify-center transition-all">
                <PlusCircle size={15} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              {conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full text-left p-3 rounded-xl transition-all group ${
                    activeConvId === conv.id ? "bg-navy-900 text-white" : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <MessageSquare size={13} className={`mt-0.5 shrink-0 ${activeConvId === conv.id ? "text-gold-400" : "text-gray-400"}`} />
                    <div className="min-w-0">
                      <p className={`text-xs font-medium truncate ${activeConvId === conv.id ? "text-white" : ""}`}>{conv.title}</p>
                      <p className={`text-xs mt-0.5 ${activeConvId === conv.id ? "text-white/50" : "text-gray-400"}`}>{conv.time}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-border">
              <div className="bg-navy-50 rounded-xl p-3 text-xs text-navy-700">
                <div className="flex items-center gap-1.5 font-semibold mb-1"><Sparkles size={11} /> AI Powered</div>
                <p className="text-navy-600">Responses use EUROPIUM's European knowledge base.</p>
              </div>
            </div>
          </div>

          {/* Center: Chat */}
          <div className="flex flex-col bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            {/* Persona selector (mobile) */}
            <div className="flex gap-1.5 p-3 border-b border-border overflow-x-auto scrollbar-hide lg:hidden">
              {PERSONAS.map(p => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPersona(p.id)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      persona === p.id ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Icon size={11} /> {p.label}
                  </button>
                );
              })}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "assistant" ? "bg-navy-900" : "bg-gold-500"
                  }`}>
                    {msg.role === "assistant"
                      ? <Bot size={15} className="text-gold-400" />
                      : <User size={15} className="text-white" />
                    }
                  </div>
                  <div className={`max-w-[80%] group ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                    <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-navy-900 text-white rounded-tr-sm"
                        : "bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-100"
                    }`}>
                      {formatMessageContent(msg.content)}
                    </div>
                    {msg.cards && (
                      <div className="w-full space-y-2">
                        {msg.cards.map((card, i) => (
                          <AIResponseCard key={i} card={card} />
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-gray-400">
                        {new Date(msg.timestamp).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      {msg.role === "assistant" && (
                        <button onClick={() => copyMessage(msg.id, msg.content)} className="p-1 hover:bg-gray-100 rounded">
                          {copiedId === msg.id
                            ? <CheckCheck size={11} className="text-emerald-500" />
                            : <Copy size={11} className="text-gray-400" />
                          }
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center shrink-0">
                    <Bot size={15} className="text-gold-400" />
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-gray-400 mb-2 font-medium flex items-center gap-1.5"><Lightbulb size={11} /> Suggested prompts</p>
                <div className="flex flex-wrap gap-2">
                  {currentPrompts.slice(0, 3).map(p => (
                    <button
                      key={p.prompt}
                      onClick={() => sendMessage(p.prompt)}
                      className="text-xs px-3 py-1.5 bg-navy-50 border border-navy-200 text-navy-700 rounded-xl hover:bg-navy-100 transition-all font-medium"
                    >
                      {p.icon} {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form onSubmit={handleSubmit} className="flex gap-3 items-end">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about jobs, relocation, universities, travel, or business in Europe..."
                  rows={1}
                  className="flex-1 input-premium resize-none min-h-[44px] max-h-[120px] text-sm"
                  style={{ height: "auto" }}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-11 h-11 rounded-xl bg-navy-900 hover:bg-navy-800 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-2 text-center">Press Enter to send · Shift+Enter for new line</p>
            </div>
          </div>

          {/* Right: Recommendations */}
          <div className="hidden lg:flex flex-col gap-4 overflow-y-auto">
            {/* Persona card */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <h3 className="font-semibold text-navy-900 text-sm mb-3">Your Mode</h3>
              <div className="grid grid-cols-2 gap-2">
                {PERSONAS.map(p => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPersona(p.id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                        persona === p.id ? "bg-navy-900 border-navy-900 text-white" : "border-gray-200 hover:border-navy-300 text-gray-600"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="text-xs font-semibold">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Suggested prompts for persona */}
            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <h3 className="font-semibold text-navy-900 text-sm mb-3 flex items-center gap-2">
                <Lightbulb size={14} className="text-gold-500" /> Try These Prompts
              </h3>
              <div className="space-y-2">
                {currentPrompts.map(p => (
                  <button
                    key={p.prompt}
                    onClick={() => sendMessage(p.prompt)}
                    className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-navy-50 border border-transparent hover:border-navy-200 transition-all group"
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-base shrink-0">{p.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-navy-900 group-hover:text-royalblue-700">{p.label}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{p.prompt}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Access */}
            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <h3 className="font-semibold mb-3 text-sm flex items-center gap-2">
                <Globe size={14} className="text-gold-400" /> Quick Access
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Browse Jobs", path: "/jobs", icon: "💼" },
                  { label: "Find Universities", path: "/education", icon: "🎓" },
                  { label: "Housing Search", path: "/housing", icon: "🏠" },
                  { label: "Relocation Planner", path: "/relocation-planner", icon: "📋" },
                  { label: "Cost Calculator", path: "/cost-calculator", icon: "💶" },
                  { label: "Opportunities", path: "/opportunities", icon: "🏆" },
                ].map(l => (
                  <Link
                    key={l.path}
                    to={l.path}
                    className="flex items-center justify-between py-2 text-xs text-white/80 hover:text-white border-b border-white/10 last:border-0 transition-colors"
                  >
                    <span>{l.icon} {l.label}</span>
                    <ArrowRight size={11} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-5 shadow-sm">
              <button onClick={newConversation} className="w-full flex items-center gap-2 py-2.5 px-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-navy-900 rounded-xl text-sm font-semibold transition-all">
                <RotateCcw size={14} /> New Conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
