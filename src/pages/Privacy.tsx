import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function PrivacyPage() {
  return (
    <div className="page-container">
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-white/60">Last updated: September 1, 2026</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="prose prose-gray max-w-none space-y-8">
          {[
            { title: "1. Information We Collect", content: "We collect information you provide directly (name, email, profile data) and automatically (usage data, cookies, IP address). We use this to provide and improve our services." },
            { title: "2. How We Use Your Information", content: "We use your data to operate EUROPIUM, personalize your experience, send relevant notifications, and improve our AI recommendations. We never sell your personal data to third parties." },
            { title: "3. GDPR Compliance", content: "As a platform serving European users, we fully comply with the General Data Protection Regulation (GDPR). You have the right to access, correct, delete, or port your data at any time." },
            { title: "4. Data Storage & Security", content: "Your data is stored on secure EU-based servers. We use AES-256 encryption at rest and TLS 1.3 in transit. Our systems undergo regular security audits." },
            { title: "5. Cookies", content: "We use essential cookies for authentication and functionality. Analytics cookies (opt-in only) help us understand usage. You can manage cookie preferences in your browser settings." },
            { title: "6. Third-Party Services", content: "We use minimal third-party services. Any third-party processors are GDPR-compliant and bound by data processing agreements. We do not use advertising networks or tracking pixels." },
            { title: "7. Data Retention", content: "We retain your data for as long as your account is active. Upon deletion, your data is permanently removed within 30 days, except where legally required to retain it longer." },
            { title: "8. Children's Privacy", content: "EUROPIUM is not directed at children under 16. We do not knowingly collect data from minors. If we discover a user is under 16, we will delete their account immediately." },
            { title: "9. Contact Us", content: "For privacy-related inquiries, contact our Data Protection Officer at: privacy@europium.eu or EUROPIUM BV, Rue de la Loi 200, Brussels, Belgium." },
          ].map(s => (
            <div key={s.title} className="card-premium p-6">
              <h2 className="font-serif text-xl font-bold text-navy-900 mb-3">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
