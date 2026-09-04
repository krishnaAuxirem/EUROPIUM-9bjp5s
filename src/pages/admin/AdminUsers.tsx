import { useState } from "react";
import {
  Search, Plus, Edit2, Trash2, Eye, Shield, CheckCircle,
  XCircle, Filter, MoreVertical, User, AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/useToast";
import type { UserRole } from "@/types";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  country: string;
  plan: string;
  joinedDate: string;
  status: "active" | "suspended" | "pending";
  lastActive: string;
}

const DEMO_USERS: AdminUser[] = [
  { id: "1", name: "Priya Sharma", email: "priya@example.com", role: "job_seeker", country: "India", plan: "premium", joinedDate: "2026-01-15", status: "active", lastActive: "2h ago" },
  { id: "2", name: "Carlos Rodriguez", email: "carlos@example.com", role: "student", country: "Mexico", plan: "free", joinedDate: "2026-02-20", status: "active", lastActive: "1d ago" },
  { id: "3", name: "Anna Kowalski", email: "anna@example.com", role: "relocator", country: "Poland", plan: "premium", joinedDate: "2026-03-10", status: "active", lastActive: "3h ago" },
  { id: "4", name: "Marcus Weber", email: "marcus@example.com", role: "employer", country: "Germany", plan: "premium", joinedDate: "2026-01-05", status: "active", lastActive: "5min ago" },
  { id: "5", name: "Fatima Al-Hassan", email: "fatima@example.com", role: "entrepreneur", country: "UAE", plan: "free", joinedDate: "2026-04-12", status: "active", lastActive: "2d ago" },
  { id: "6", name: "Luca Bianchi", email: "luca@example.com", role: "traveler", country: "Italy", plan: "free", joinedDate: "2026-05-01", status: "suspended", lastActive: "2w ago" },
  { id: "7", name: "Sophie Laurent", email: "sophie@example.com", role: "property_provider", country: "France", plan: "premium", joinedDate: "2025-12-20", status: "active", lastActive: "1h ago" },
  { id: "8", name: "Raj Patel", email: "raj@example.com", role: "job_seeker", country: "India", plan: "free", joinedDate: "2026-06-15", status: "pending", lastActive: "Never" },
];

const ROLE_LABELS: Record<string, string> = {
  traveler: "Traveler",
  student: "Student",
  job_seeker: "Job Seeker",
  relocator: "Relocator",
  entrepreneur: "Entrepreneur",
  employer: "Employer",
  property_provider: "Property Provider",
  admin: "Admin",
};

export default function AdminUsers() {
  const { success, info } = useToast();
  const [users, setUsers] = useState<AdminUser[]>(DEMO_USERS);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "job_seeker" as UserRole, country: "", plan: "free" });

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" || u.role === filterRole;
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    return matchSearch && matchRole && matchStatus;
  });

  const handleDelete = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    setDeleteConfirm(null);
    success("User deleted.");
  };

  const handleSuspend = (id: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "suspended" ? "active" : "suspended" as any } : u));
    success("User status updated.");
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) { info("Name and email required."); return; }
    const added: AdminUser = {
      ...newUser,
      id: Date.now().toString(),
      joinedDate: new Date().toISOString().split("T")[0],
      status: "active",
      lastActive: "Just now",
    };
    setUsers(prev => [added, ...prev]);
    setShowAddModal(false);
    setNewUser({ name: "", email: "", role: "job_seeker", country: "", plan: "free" });
    success("User created.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-navy-900">User Management</h2>
          <p className="text-gray-500 text-sm">{users.length} registered users</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn-primary text-sm">
          <Plus size={14} /> Add User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="input-premium pl-9 text-sm" />
        </div>
        <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="input-premium text-sm min-w-[140px]">
          <option value="all">All Roles</option>
          {Object.entries(ROLE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input-premium text-sm min-w-[130px]">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-border">
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">User</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Role</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Country</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Plan</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Status</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Joined</th>
                <th className="text-left text-xs font-semibold text-gray-500 px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-navy-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="tag tag-blue text-xs">{ROLE_LABELS[user.role]}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.country}</td>
                  <td className="px-4 py-3">
                    <span className={`tag text-xs ${user.plan === "premium" ? "bg-gold-100 text-gold-700" : "tag-gray"}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`tag text-xs ${
                      user.status === "active" ? "tag-green" :
                      user.status === "suspended" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>{user.status}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{user.joinedDate}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setEditUser(user)} className="p-1.5 hover:bg-royalblue-100 rounded-lg text-royalblue-600 transition-colors" title="Edit">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => handleSuspend(user.id)} className={`p-1.5 rounded-lg transition-colors ${user.status === "suspended" ? "hover:bg-emerald-100 text-emerald-600" : "hover:bg-amber-100 text-amber-600"}`} title={user.status === "suspended" ? "Activate" : "Suspend"}>
                        {user.status === "suspended" ? <CheckCircle size={13} /> : <AlertTriangle size={13} />}
                      </button>
                      <button onClick={() => setDeleteConfirm(user.id)} className="p-1.5 hover:bg-red-100 rounded-lg text-red-500 transition-colors" title="Delete">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <User size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">No users found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-premium-xl">
            <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">Add New User</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input value={newUser.name} onChange={e => setNewUser(p => ({ ...p, name: e.target.value }))} className="input-premium" placeholder="Full name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} className="input-premium" placeholder="email@example.com" type="email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value as UserRole }))} className="input-premium">
                  {Object.entries(ROLE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input value={newUser.country} onChange={e => setNewUser(p => ({ ...p, country: e.target.value }))} className="input-premium" placeholder="Country" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                <select value={newUser.plan} onChange={e => setNewUser(p => ({ ...p, plan: e.target.value }))} className="input-premium">
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={handleAddUser} className="btn-primary flex-1 justify-center">Create User</button>
              <button onClick={() => setShowAddModal(false)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-premium-xl">
            <h3 className="font-serif text-xl font-bold text-navy-900 mb-4">Edit User</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input value={editUser.name} onChange={e => setEditUser(p => p ? { ...p, name: e.target.value } : p)} className="input-premium" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select value={editUser.role} onChange={e => setEditUser(p => p ? { ...p, role: e.target.value as UserRole } : p)} className="input-premium">
                  {Object.entries(ROLE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select value={editUser.status} onChange={e => setEditUser(p => p ? { ...p, status: e.target.value as any } : p)} className="input-premium">
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plan</label>
                <select value={editUser.plan} onChange={e => setEditUser(p => p ? { ...p, plan: e.target.value } : p)} className="input-premium">
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => {
                setUsers(prev => prev.map(u => u.id === editUser.id ? editUser : u));
                setEditUser(null);
                success("User updated.");
              }} className="btn-primary flex-1 justify-center">Save Changes</button>
              <button onClick={() => setEditUser(null)} className="btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-premium-xl text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-navy-900 mb-2">Delete User?</h3>
            <p className="text-gray-500 text-sm mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold">Delete</button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
