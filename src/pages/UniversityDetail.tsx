import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft, MapPin, Star, GraduationCap, Users, Calendar,
  CheckCircle, Bookmark, Globe, BookOpen, Award, Clock,
  ChevronDown, ChevronUp, Sparkles, BadgeCheck,
} from "lucide-react";
import { universities, programs, studentReviews } from "@/lib/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/useToast";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import type { UniversityApplication } from "@/types";

const EUR_TO_INR = 90;
const CHF_TO_INR = 100;

function toINR(amountStr: string): string {
  if (!amountStr || amountStr === "Free") return "Free";
  const match = amountStr.match(/[\d,]+/);
  if (!match) return amountStr;
  const num = parseInt(match[0].replace(/,/g, ""));
  if (isNaN(num)) return amountStr;
  const isCHF = amountStr.includes("CHF");
  const inr = num * (isCHF ? CHF_TO_INR : EUR_TO_INR);
  if (inr >= 100000) return `₹${(inr / 100000).toFixed(1)}L`;
  return `₹${inr.toLocaleString("en-IN")}`;
}

export default function UniversityDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();
  const { success, info } = useToast();

  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [appStatus, setAppStatus] = useState<"idle" | "form" | "submitted">("idle");
  const [selectedProgram, setSelectedProgram] = useState("");

  const university = universities.find(u => u.id === id);
  const uniPrograms = programs.filter(p => p.universityId === id);
  const reviews = studentReviews.slice(0, 3);
  const isSaved = user?.savedUniversities.includes(id ?? "") ?? false;
  const hasApplied = user?.universityApplications?.some(a => a.universityId === id) ?? false;

  if (!university) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">University Not Found</h2>
          <button onClick={() => navigate("/education")} className="btn-primary mt-4">Browse Education</button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!isAuthenticated) { info("Please login to save"); return; }
    const savedUniversities = isSaved
      ? (user?.savedUniversities ?? []).filter(x => x !== university.id)
      : [...(user?.savedUniversities ?? []), university.id];
    updateUser({ savedUniversities });
    success(isSaved ? "Removed from saved" : "University saved!");
  };

  const handleApply = (programName?: string) => {
    if (!isAuthenticated) { info("Please login to apply"); navigate("/login"); return; }
    setSelectedProgram(programName ?? uniPrograms[0]?.name ?? "General Application");
    setAppStatus("form");
  };

  const handleSubmitApp = async () => {
    await new Promise(r => setTimeout(r, 1000));
    const application: UniversityApplication = {
      id: Date.now().toString(),
      universityId: university.id,
      universityName: university.name,
      program: selectedProgram,
      country: university.country,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "submitted",
    };
    const universityApplications = [...(user?.universityApplications ?? []), application];
    updateUser({ universityApplications });
    setAppStatus("submitted");
    success("Application submitted successfully!");
  };

  return (
    <div className="page-container">
      {/* Hero */}
      <section className={`${university.colorClass} relative py-20 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm transition-colors">
            <ArrowLeft size={16} /> Back to Education
          </button>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="tag bg-white/20 text-white text-xs">#{university.ranking} Globally</span>
                <span className="tag bg-white/20 text-white text-xs capitalize">{university.type}</span>
                {university.scholarships && university.scholarships.length > 0 && (
                  <span className="tag bg-gold-500/80 text-white text-xs"><Award size={10} /> Scholarships</span>
                )}
              </div>
              <h1 className="font-serif text-4xl font-bold text-white mb-2">{university.name}</h1>
              <div className="flex items-center gap-3 text-white/80 text-sm">
                <span className="flex items-center gap-1"><MapPin size={12} />{university.city}, {university.country}</span>
                <span className="flex items-center gap-1"><Star size={12} className="fill-gold-400 text-gold-400" />{university.rating}</span>
                <span className="flex items-center gap-1"><Users size={12} />{university.students.toLocaleString()} students</span>
                <span className="flex items-center gap-1"><Globe size={12} />{university.language}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={handleSave} className={`p-3 rounded-xl border transition-all ${isSaved ? "bg-gold-500 border-gold-500 text-white" : "bg-white/10 border-white/20 text-white hover:bg-white/20"}`}>
                <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
              </button>
              {!hasApplied ? (
                <button onClick={() => handleApply()} className="btn-gold px-5 py-2.5">Apply Now</button>
              ) : (
                <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 px-4 py-2.5 rounded-xl text-sm font-semibold">
                  <CheckCircle size={16} /> Applied
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />

        {/* Application Form */}
        {appStatus === "form" && (
          <div className="card-premium p-6 mb-8 border-2 border-royalblue-200 animate-fade-in">
            <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">Apply to {university.name}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Program</label>
                <select value={selectedProgram} onChange={e => setSelectedProgram(e.target.value)} className="input-premium">
                  {uniPrograms.map(p => <option key={p.id}>{p.name}</option>)}
                  {uniPrograms.length === 0 && <option>General Application</option>}
                </select>
              </div>
              <div className="bg-royalblue-50 border border-royalblue-100 rounded-xl p-4 text-sm text-royalblue-800">
                <p className="font-semibold mb-1">Next Steps</p>
                <p>After submitting, you will receive an email with instructions to upload your documents and pay the application fee (if applicable).</p>
              </div>
              <div className="flex gap-3">
                <button onClick={handleSubmitApp} className="btn-primary flex-1 justify-center">
                  <CheckCircle size={16} /> Submit Application
                </button>
                <button onClick={() => setAppStatus("idle")} className="btn-secondary px-4">Cancel</button>
              </div>
            </div>
          </div>
        )}

        {appStatus === "submitted" && (
          <div className="card-premium p-8 text-center bg-emerald-50 border-emerald-200 mb-8 animate-fade-in">
            <CheckCircle size={40} className="text-emerald-500 mx-auto mb-3" />
            <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-4">Your application to <strong>{university.name}</strong> for <strong>{selectedProgram}</strong> has been received.</p>
            <Link to="/dashboard" className="btn-primary">Track Application</Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-3">About {university.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-4">{university.description}</p>
              <div className="flex flex-wrap gap-2">
                {university.tags.map(t => <span key={t} className="tag tag-navy">{t}</span>)}
              </div>
            </div>

            {/* Programs */}
            {uniPrograms.length > 0 && (
              <div className="card-premium p-6">
                <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">Programs</h2>
                <div className="space-y-3">
                  {uniPrograms.map(prog => (
                    <div key={prog.id} className="border border-border/50 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setExpandedProgram(expandedProgram === prog.id ? null : prog.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                      >
                        <div>
                          <p className="font-semibold text-navy-900">{prog.name}</p>
                          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                            <span className="tag tag-blue">{prog.degree}</span>
                            <span className="flex items-center gap-1"><Clock size={11} />{prog.duration}</span>
                            <span className="flex items-center gap-1"><Globe size={11} />{prog.language}</span>
                          </div>
                        </div>
                        {expandedProgram === prog.id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                      </button>
                      {expandedProgram === prog.id && (
                        <div className="p-4 border-t border-border/50 bg-gray-50 space-y-4 animate-fade-in">
                          <p className="text-gray-600 text-sm leading-relaxed">{prog.description}</p>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="bg-white rounded-xl p-3 border border-border/50">
                              <p className="text-xs text-gray-500 mb-0.5">Tuition (EU)</p>
                              <p className="font-semibold text-navy-900">{prog.tuitionEU}</p>
                              <p className="text-xs text-emerald-600 font-medium">{toINR(prog.tuitionEU)}/year</p>
                            </div>
                            <div className="bg-white rounded-xl p-3 border border-border/50">
                              <p className="text-xs text-gray-500 mb-0.5">Tuition (Non-EU)</p>
                              <p className="font-semibold text-navy-900">{prog.tuitionNonEU}</p>
                              <p className="text-xs text-emerald-600 font-medium">{toINR(prog.tuitionNonEU)}/year</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-2">ELIGIBILITY</p>
                            <div className="space-y-1">
                              {prog.eligibility.map((e, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  <CheckCircle size={12} className="text-emerald-500" />
                                  <span className="text-gray-700">{e}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-500 mb-2">CAREER OUTCOMES</p>
                            <div className="flex flex-wrap gap-1.5">
                              {prog.careerOutcomes.map(c => <span key={c} className="tag tag-green text-xs">{c}</span>)}
                            </div>
                          </div>
                          {prog.scholarships.length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-500 mb-2">SCHOLARSHIPS</p>
                              <div className="flex flex-wrap gap-1.5">
                                {prog.scholarships.map(s => <span key={s} className="tag tag-gold text-xs"><Award size={9} />{s}</span>)}
                              </div>
                            </div>
                          )}
                          <div className="flex items-center gap-3 text-xs text-gray-500 border-t pt-3">
                            <span className="flex items-center gap-1"><Calendar size={11} />Deadline: {prog.deadline}</span>
                            <span className="flex items-center gap-1"><BookOpen size={11} />Intake: {prog.intake.join(", ")}</span>
                          </div>
                          <button onClick={() => handleApply(prog.name)} className="btn-primary w-full justify-center text-sm py-2.5">
                            Apply for {prog.name}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Programs List */}
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">All Programs Offered</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {university.programs.map(p => (
                  <div key={p} className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl text-sm">
                    <BookOpen size={13} className="text-royalblue-500" />
                    <span className="text-gray-700">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Life */}
            {university.campusLife && (
              <div className="card-premium p-6">
                <h2 className="font-serif text-xl font-bold text-navy-900 mb-4">Campus Life</h2>
                <div className="grid grid-cols-2 gap-3">
                  {university.campusLife.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-royalblue-50 border border-royalblue-100 rounded-xl">
                      <Star size={12} className="text-royalblue-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-navy-800">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Student Reviews */}
            <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-xl font-bold text-navy-900">Student Reviews</h2>
                <span className="text-sm text-gray-500">{university.reviewCount?.toLocaleString()} reviews</span>
              </div>
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-xl border border-border/50">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {review.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-navy-900 text-sm">{review.name}</p>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map(s => (
                              <Star key={s} size={11} className={s <= review.rating ? "fill-gold-500 text-gold-500" : "text-gray-300"} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{review.program} · {review.country} · Class of {review.year}</p>
                        <p className="text-gray-600 text-sm mt-2 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Key Info */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-4">Key Information</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Founded", value: university.founded },
                  { label: "Type", value: university.type },
                  { label: "Students", value: university.students.toLocaleString() },
                  { label: "Acceptance Rate", value: university.acceptanceRate },
                  { label: "Language", value: university.language },
                  { label: "Website", value: university.website },
                ].map(d => (
                  <div key={d.label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-gray-500">{d.label}</span>
                    <span className="font-semibold text-navy-900 capitalize">{String(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tuition */}
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-4">Tuition Fees</h3>
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-xs text-emerald-600 font-semibold">EU STUDENTS</p>
                  <p className="text-lg font-bold text-navy-900 mt-0.5">{university.tuitionEU}</p>
                  <p className="text-xs text-emerald-700 mt-0.5">{toINR(university.tuitionEU)}/year</p>
                </div>
                <div className="p-3 bg-royalblue-50 border border-royalblue-100 rounded-xl">
                  <p className="text-xs text-royalblue-600 font-semibold">NON-EU STUDENTS</p>
                  <p className="text-lg font-bold text-navy-900 mt-0.5">{university.tuitionNonEU}</p>
                  <p className="text-xs text-royalblue-700 mt-0.5">{toINR(university.tuitionNonEU)}/year</p>
                </div>
              </div>
            </div>

            {/* Scholarships */}
            {university.scholarships && (
              <div className="card-premium p-5">
                <h3 className="font-semibold text-navy-900 mb-3 flex items-center gap-2">
                  <Award size={16} className="text-gold-500" /> Available Scholarships
                </h3>
                <div className="space-y-2">
                  {university.scholarships.map(s => (
                    <div key={s} className="flex items-center gap-2 p-2.5 bg-gold-50 border border-gold-100 rounded-lg">
                      <CheckCircle size={12} className="text-gold-600 shrink-0" />
                      <span className="text-sm text-navy-800">{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Accommodation */}
            {university.accommodation && (
              <div className="card-premium p-5">
                <h3 className="font-semibold text-navy-900 mb-2">Accommodation</h3>
                <p className="text-sm text-gray-600">{university.accommodation}</p>
              </div>
            )}

            {/* Intake */}
            {university.intakeMonths && (
              <div className="card-premium p-5">
                <h3 className="font-semibold text-navy-900 mb-3">Upcoming Intakes</h3>
                <div className="flex flex-wrap gap-2">
                  {university.intakeMonths.map(m => (
                    <span key={m} className="tag tag-blue">{m}</span>
                  ))}
                </div>
                {university.applicationDeadline && (
                  <p className="text-xs text-red-600 font-semibold mt-3 flex items-center gap-1">
                    <Calendar size={11} /> Deadline: {university.applicationDeadline}
                  </p>
                )}
              </div>
            )}

            {/* AI Advisor */}
            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-gold-400" />
                <h3 className="font-semibold">Ask AI Advisor</h3>
              </div>
              <p className="text-white/70 text-xs mb-4">Get admission tips, scholarship guidance, and visa info.</p>
              <Link to="/ai-advisor" className="btn-gold w-full justify-center py-2.5 text-sm">
                Ask AI Advisor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
