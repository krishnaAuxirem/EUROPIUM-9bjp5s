import { useState } from "react";
import { Plus, Trash2, CheckCircle, XCircle, Search, Shield } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { businessListings } from "@/lib/mockData";

export default function AdminBusinesses() {
  const { success } = useToast();
  const [items, setItems] = useState(businessListings.map(b => ({ ...b, adminStatus: b.verified ? "verified" : "pending" as string })));
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy-900">Business Management</h2>
          <p className="text-gray-500 text-sm">{items.length} businesses</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search businesses..." className="input-premium pl-9 text-sm" />
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Business</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Category</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Location</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(b => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-navy-900 text-sm">{b.name}</p>
                    <p className="text-xs text-gray-400">{b.employees} employees</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{b.category}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{b.city}, {b.country}</td>
                  <td className="px-4 py-3">
                    <span className="tag tag-navy text-xs capitalize">{b.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`tag text-xs ${(b as any).adminStatus === "verified" ? "tag-green" : "bg-amber-100 text-amber-700"}`}>
                      {(b as any).adminStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {(b as any).adminStatus === "pending" && (
                        <button onClick={() => { setItems(prev => prev.map(x => x.id === b.id ? { ...x, adminStatus: "verified" } : x)); success("Business verified."); }} className="p-1.5 hover:bg-emerald-100 rounded-lg text-emerald-600">
                          <Shield size={13} />
                        </button>
                      )}
                      <button onClick={() => { setItems(prev => prev.map(x => x.id === b.id ? { ...x, adminStatus: "rejected" } : x)); success("Rejected."); }} className="p-1.5 hover:bg-red-100 rounded-lg text-red-500">
                        <XCircle size={13} />
                      </button>
                      <button onClick={() => setDeleteId(b.id)} className="p-1.5 hover:bg-red-100 rounded-lg text-red-500"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-premium-xl text-center">
            <h3 className="font-semibold text-navy-900 mb-2">Delete this business?</h3>
            <div className="flex gap-3 mt-4">
              <button onClick={() => { setItems(prev => prev.filter(x => x.id !== deleteId)); setDeleteId(null); success("Deleted."); }} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
