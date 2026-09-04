import { useState } from "react";
import { Trash2, CheckCircle, XCircle, Flag, Star } from "lucide-react";
import { useToast } from "@/hooks/useToast";

const MOCK_REVIEWS = [
  { id: "r1", author: "Priya S.", target: "TU Munich", type: "university", rating: 5, content: "Best technical university. World-class labs.", status: "published", date: "2026-08-01" },
  { id: "r2", author: "Carlos M.", target: "SAP Berlin Job", type: "job", rating: 3, content: "Good company but very long hiring process.", status: "flagged", date: "2026-07-28" },
  { id: "r3", author: "Anna K.", target: "Amsterdam Property", type: "property", rating: 4, content: "Great neighborhood, clean apartment.", status: "published", date: "2026-07-20" },
  { id: "r4", author: "Fake Bot", target: "Erasmus+", type: "opportunity", rating: 1, content: "SPAM SPAM SPAM click here!", status: "flagged", date: "2026-07-19" },
  { id: "r5", author: "Rajesh P.", target: "Bocconi University", type: "university", rating: 5, content: "Life-changing experience. Top finance program.", status: "published", date: "2026-07-10" },
];

export default function AdminReviews() {
  const { success } = useToast();
  const [reviews, setReviews] = useState(MOCK_REVIEWS);

  const handleApprove = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: "published" } : r));
    success("Review approved.");
  };
  const handleDelete = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    success("Review removed.");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-navy-900">Reviews & Moderation</h2>
        <p className="text-gray-500 text-sm">{reviews.filter(r => r.status === "flagged").length} flagged for review</p>
      </div>

      <div className="space-y-4">
        {reviews.map(r => (
          <div key={r.id} className={`card-premium p-5 ${r.status === "flagged" ? "border-red-200 bg-red-50/30" : ""}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-navy-900 text-sm">{r.author}</span>
                  <span className="text-gray-400 text-xs">·</span>
                  <span className="tag tag-navy text-xs capitalize">{r.type}</span>
                  <span className="text-gray-400 text-xs">→</span>
                  <span className="text-sm text-gray-700">{r.target}</span>
                </div>
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className={i < r.rating ? "text-gold-400 fill-current" : "text-gray-200 fill-current"} />
                  ))}
                </div>
                <p className="text-sm text-gray-700">{r.content}</p>
                <p className="text-xs text-gray-400 mt-1">{r.date}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {r.status === "flagged" && (
                  <div className="flex items-center gap-1 text-xs text-red-600 bg-red-100 px-2 py-1 rounded-lg">
                    <Flag size={11} /> Flagged
                  </div>
                )}
                <span className={`tag text-xs ${r.status === "published" ? "tag-green" : "bg-red-100 text-red-700"}`}>{r.status}</span>
                {r.status === "flagged" && (
                  <button onClick={() => handleApprove(r.id)} className="p-1.5 hover:bg-emerald-100 rounded-lg text-emerald-600 transition-colors" title="Approve">
                    <CheckCircle size={14} />
                  </button>
                )}
                <button onClick={() => handleDelete(r.id)} className="p-1.5 hover:bg-red-100 rounded-lg text-red-500 transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
