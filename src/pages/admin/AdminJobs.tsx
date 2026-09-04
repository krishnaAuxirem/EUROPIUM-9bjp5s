import { useState } from "react";
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Search, Eye } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { jobs } from "@/lib/mockData";
import type { Job } from "@/types";

export default function AdminJobs() {
  const { success } = useToast();
  const [items, setItems] = useState(jobs.map(j => ({ ...j, status: "active" as string })));
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [newJob, setNewJob] = useState({ title: "", company: "", country: "", city: "", type: "full-time", salary: "", category: "" });

  const filtered = items.filter(j => {
    const m = j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
    const s = filterStatus === "all" || (j as any).status === filterStatus;
    return m && s;
  });

  const handleApprove = (id: string) => {
    setItems(prev => prev.map(j => j.id === id ? { ...j, status: "active" } : j));
    success("Job approved.");
  };

  const handleReject = (id: string) => {
    setItems(prev => prev.map(j => j.id === id ? { ...j, status: "rejected" } : j));
    success("Job rejected.");
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(j => j.id !== id));
    setDeleteId(null);
    success("Job deleted.");
  };

  const handleAdd = () => {
    if (!newJob.title || !newJob.company) return;
    const j = {
      ...jobs[0], ...newJob,
      id: "new_" + Date.now(),
      salaryMin: 50000, salaryMax: 80000, currency: "EUR",
      description: "New job listing.", requirements: [], benefits: [],
      posted: "Just now", deadline: "2027-01-01", remote: false, featured: false,
      logo: "bg-navy-900", tags: [], experience: "Mid", applicants: 0,
      status: "pending" as any,
    };
    setItems(prev => [j, ...prev]);
    setShowAdd(false);
    setNewJob({ title: "", company: "", country: "", city: "", type: "full-time", salary: "", category: "" });
    success("Job created.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy-900">Job Management</h2>
          <p className="text-gray-500 text-sm">{items.length} total listings</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary text-sm"><Plus size={14} /> Add Job</button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search jobs..." className="input-premium pl-9 text-sm" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input-premium text-sm">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Job Title</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Company</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Location</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Applicants</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(j => (
                <tr key={j.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-navy-900 text-sm">{j.title}</p>
                    <p className="text-xs text-gray-400">{j.category}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{j.company}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{j.city}, {j.country}</td>
                  <td className="px-4 py-3">
                    <span className={`tag text-xs ${(j as any).status === "active" ? "tag-green" : (j as any).status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}>
                      {(j as any).status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-navy-900 font-semibold">{j.applicants}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {(j as any).status === "pending" && (
                        <>
                          <button onClick={() => handleApprove(j.id)} className="p-1.5 hover:bg-emerald-100 rounded-lg text-emerald-600" title="Approve"><CheckCircle size={13} /></button>
                          <button onClick={() => handleReject(j.id)} className="p-1.5 hover:bg-red-100 rounded-lg text-red-500" title="Reject"><XCircle size={13} /></button>
                        </>
                      )}
                      <button onClick={() => setDeleteId(j.id)} className="p-1.5 hover:bg-red-100 rounded-lg text-red-500" title="Delete"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-premium-xl">
            <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">Add New Job</h3>
            <div className="space-y-3">
              {[
                { k: "title", l: "Job Title", p: "e.g. Senior Developer" },
                { k: "company", l: "Company", p: "e.g. SAP SE" },
                { k: "country", l: "Country", p: "e.g. Germany" },
                { k: "city", l: "City", p: "e.g. Berlin" },
                { k: "salary", l: "Salary Range", p: "e.g. €70,000 – €90,000" },
                { k: "category", l: "Category", p: "e.g. Technology" },
              ].map(f => (
                <div key={f.k}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{f.l}</label>
                  <input value={(newJob as any)[f.k]} onChange={e => setNewJob(p => ({ ...p, [f.k]: e.target.value }))} className="input-premium" placeholder={f.p} />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleAdd} className="btn-primary flex-1 justify-center">Create Job</button>
              <button onClick={() => setShowAdd(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-premium-xl text-center">
            <h3 className="font-semibold text-navy-900 mb-2">Delete this job?</h3>
            <p className="text-gray-500 text-sm mb-5">This cannot be undone.</p>
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
