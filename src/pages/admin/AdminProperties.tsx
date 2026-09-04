import { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Search, Shield } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { properties, toINR } from "@/lib/mockData";

export default function AdminProperties() {
  const { success } = useToast();
  const [items, setItems] = useState(properties.map(p => ({ ...p, status: p.featured ? "active" : "pending" as string })));
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = items.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.city.toLowerCase().includes(search.toLowerCase())
  );

  const handleVerify = (id: string) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, status: "active" } : p));
    success("Property verified.");
  };
  const handleReject = (id: string) => {
    setItems(prev => prev.map(p => p.id === id ? { ...p, status: "rejected" } : p));
    success("Property rejected.");
  };
  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(p => p.id !== id));
    setDeleteId(null);
    success("Property deleted.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy-900">Property Management</h2>
          <p className="text-gray-500 text-sm">{items.length} listings</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search properties..." className="input-premium pl-9 text-sm" />
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Property</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Location</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Price</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Type</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${p.colorClass} shrink-0`} />
                      <p className="font-semibold text-navy-900 text-sm line-clamp-1 max-w-[200px]">{p.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{p.city}, {p.country}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-navy-900">€{p.price.toLocaleString()}{p.period ? "/mo" : ""}</p>
                    <p className="text-xs text-emerald-600">{toINR(p.price, p.currency)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="tag tag-blue text-xs capitalize">{p.listingType}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`tag text-xs ${(p as any).status === "active" ? "tag-green" : (p as any).status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                      {(p as any).status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {(p as any).status === "pending" && (
                        <>
                          <button onClick={() => handleVerify(p.id)} className="p-1.5 hover:bg-emerald-100 rounded-lg text-emerald-600" title="Verify"><Shield size={13} /></button>
                          <button onClick={() => handleReject(p.id)} className="p-1.5 hover:bg-red-100 rounded-lg text-red-500" title="Reject"><XCircle size={13} /></button>
                        </>
                      )}
                      <button onClick={() => setDeleteId(p.id)} className="p-1.5 hover:bg-red-100 rounded-lg text-red-500"><Trash2 size={13} /></button>
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
            <h3 className="font-semibold text-navy-900 mb-2">Delete this property?</h3>
            <div className="flex gap-3 mt-4">
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteId(null)} className="flex-1 btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
