import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Globe, Shield, Star, CheckCircle } from "lucide-react";
import { businessListings } from "@/lib/mockData";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { Link } from "react-router-dom";

export default function BusinessDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const biz = businessListings.find(b => b.id === id);

  if (!biz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold mb-2">Business Not Found</h2>
          <button onClick={() => navigate("/business")} className="btn-primary mt-4">Back to Business</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/70 hover:text-white mb-4 text-sm">
            <ArrowLeft size={16} /> Back to Business
          </button>
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: biz.colorGradient }}>
              <span className="text-white font-bold text-2xl">{biz.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-3xl font-bold text-white">{biz.name}</h1>
                {biz.verified && <Shield size={18} className="text-royalblue-400" />}
              </div>
              <p className="text-white/70 mt-1">{biz.category}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-white/60 text-sm">
                <span className="flex items-center gap-1"><MapPin size={12} />{biz.city}, {biz.country}</span>
                <span className="flex items-center gap-1"><Users size={12} />{biz.employees}</span>
                <span className="flex items-center gap-1"><Star size={12} className="fill-gold-400 text-gold-400" />{biz.rating}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-3">About {biz.name}</h2>
              <p className="text-gray-600 leading-relaxed">{biz.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {biz.tags.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="card-premium p-5">
              <h3 className="font-semibold text-navy-900 mb-4">Company Details</h3>
              <div className="space-y-3 text-sm">
                {[
                  { icon: Globe, label: "Website", value: biz.website },
                  { icon: Users, label: "Employees", value: biz.employees },
                  { icon: MapPin, label: "Location", value: `${biz.city}, ${biz.country}` },
                  { icon: CheckCircle, label: "Founded", value: String(biz.founded) },
                ].map(d => (
                  <div key={d.label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <d.icon size={14} className="text-royalblue-500 shrink-0" />
                    <span className="text-gray-500 flex-1">{d.label}</span>
                    <span className="font-semibold text-navy-900">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/contact" className="block bg-royalblue-50 border border-royalblue-200 rounded-2xl p-5 hover:bg-royalblue-100 transition-colors">
              <p className="font-semibold text-royalblue-800 text-sm mb-1">🤝 Partnership Inquiry</p>
              <p className="text-royalblue-600 text-xs">Interested in working with {biz.name}? Contact us to connect.</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
