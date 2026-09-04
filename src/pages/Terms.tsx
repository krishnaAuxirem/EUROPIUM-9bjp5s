import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default function TermsPage() {
  return (
    <div className="page-container">
      <section className="bg-navy-900 py-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-white/60">Last updated: September 1, 2026</p>
        </div>
      </section>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs />
        <div className="space-y-6">
          {[
            { title: "1. Acceptance of Terms", content: "By using EUROPIUM, you agree to these Terms of Service. If you disagree with any part, please discontinue use of the platform." },
            { title: "2. User Accounts", content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate information and to update it when necessary." },
            { title: "3. Acceptable Use", content: "You agree not to misuse EUROPIUM, including: posting false information, attempting to access unauthorized data, using automated bots, or engaging in any activity that harms other users or the platform." },
            { title: "4. Content & Listings", content: "Job listings, properties, and opportunities are provided by third parties. EUROPIUM does not guarantee accuracy and recommends verifying all information directly with the source." },
            { title: "5. AI Advisor Disclaimer", content: "Our AI Advisor provides general guidance and informational content only. It does not constitute legal, immigration, financial, or professional advice. Always consult qualified professionals for important decisions." },
            { title: "6. Intellectual Property", content: "EUROPIUM and its content are protected by copyright law. You may not reproduce, distribute, or create derivative works without explicit permission." },
            { title: "7. Limitation of Liability", content: "EUROPIUM is not liable for any direct, indirect, or consequential damages arising from your use of the platform or reliance on third-party content." },
            { title: "8. Termination", content: "We reserve the right to suspend or terminate accounts that violate these terms. Users may delete their own accounts at any time from Profile Settings." },
            { title: "9. Governing Law", content: "These terms are governed by Belgian law. Disputes shall be resolved in the courts of Brussels, Belgium." },
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
