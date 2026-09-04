import { useState } from "react";
import { Plus, Trash2, Search, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { universities } from "@/lib/mockData";

export default function AdminUniversities() {
  const { success } = useToast();
  const [items, setItems] = useState(universities);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy-900">University Management</h2>
          <p className="text-gray-500 text-sm">{items.length} universities</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search universities..." className="input-premium pl-9 text-sm" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(u => (
          <div key={u.id} className="card-premium overflow-hidden">
            <div className={`${u.colorClass} h-16 relative`}>
              <div className="absolute inset-0 bg-black/50 flex items-center px-4 justify-between">
                <span className="text-white text-sm font-semibold">#{u.ranking} Global</span>
                <span className="tag bg-white/20 text-white text-xs">{u.type}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-navy-900 text-sm mb-1">{u.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{u.city}, {u.country}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                <span>EU: {u.tuitionEU}</span>
                <span>·</span>
                <span>⭐ {u.rating}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-royalblue-50 text-royalblue-700 rounded-lg text-xs font-semibold hover:bg-royalblue-100 transition-colors">Edit</button>
                <button onClick={() => setDeleteId(u.id)} className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-premium-xl text-center">
            <h3 className="font-semibold text-navy-900 mb-2">Delete this university?</h3>
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setItems(prev => prev.filter(u => u.id !== deleteId)); setDeleteId(null); success("University deleted."); }} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
