import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import { useToast } from "@/hooks/useToast";

const subjects = [
  "General Inquiry", "Partnership", "Employer Solutions", "Technical Support",
  "Press & Media", "Advertising", "Other"
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const { success } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    success("Message sent! We'll get back to you within 24 hours.");
  };

  return (
    <div className="page-container">
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">Contact Us</h1>
          <p className="text-white/70">We're here to help. Reach out through any channel below.</p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email Us", value: "hello@europium.eu", sub: "We respond within 24 hours" },
              { icon: Phone, label: "Call Us", value: "+32 2 000 0000", sub: "Mon–Fri, 9am–6pm CET" },
              { icon: MapPin, label: "Visit Us", value: "Rue de la Loi 200", sub: "Brussels, Belgium 1040" },
            ].map(c => (
              <div key={c.label} className="card-premium p-5 flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-royalblue-100 text-royalblue-600 flex items-center justify-center shrink-0">
                  <c.icon size={20} />
                </div>
                <div>
                  <p className="font-semibold text-navy-900 text-sm">{c.label}</p>
                  <p className="text-gray-700 text-sm mt-0.5">{c.value}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{c.sub}</p>
                </div>
              </div>
            ))}

            <div className="bg-navy-900 rounded-2xl p-5 text-white">
              <h3 className="font-semibold mb-2">For Enterprises</h3>
              <p className="text-white/70 text-sm mb-3">Looking for bulk talent sourcing, API access, or white-label solutions?</p>
              <a href="mailto:enterprise@europium.eu" className="text-gold-400 text-sm font-semibold hover:underline">enterprise@europium.eu</a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="card-premium p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-emerald-500" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-2">Message Sent!</h2>
                <p className="text-gray-500 mb-6">Thank you for reaching out. We'll respond within 24 business hours.</p>
                <button onClick={() => { setSent(false); setName(""); setEmail(""); setMessage(""); }} className="btn-primary">
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="card-premium p-8">
                <h2 className="font-serif text-2xl font-bold text-navy-900 mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                      <input type="text" value={name} onChange={e => setName(e.target.value)} required className="input-premium" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="input-premium" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <select value={subject} onChange={e => setSubject(e.target.value)} className="input-premium">
                      {subjects.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="input-premium resize-none"
                    />
                  </div>
                  <button type="submit" disabled={sending} className="btn-primary w-full justify-center py-3.5">
                    {sending ? (
                      <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</span>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
