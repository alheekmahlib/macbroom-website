import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <FileText size={28} className="text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
          <p className="text-txt-dim text-sm">Last updated: May 1, 2026</p>
        </div>

        <div className="space-y-8 text-txt-dim text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using MacBroom (&quot;the App&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the App. These terms are between you and Al-Heekmah Library (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. License</h2>
            <p className="mb-3">
              MacBroom is offered in two tiers:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-white">Free Version:</strong> You may use the free version of MacBroom at no cost, subject to the limitations of the free tier.</li>
              <li><strong className="text-white">Pro Version:</strong> Upon purchase, you receive a non-exclusive, non-transferable license to use MacBroom Pro on the number of devices specified in your plan (1 or 2 Macs). The license is for personal or business use by the purchaser.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Payment &amp; Billing</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Payments are processed securely through <strong className="text-white">Paddle</strong></li>
              <li>Prices are displayed in USD and may be subject to applicable taxes</li>
              <li>Lifetime licenses are one-time purchases with no recurring charges</li>
              <li>Monthly and yearly subscriptions auto-renew. You may cancel at any time from your Paddle account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Use of the App</h2>
            <p>You agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>Use MacBroom only for lawful purposes</li>
              <li>Not reverse-engineer, decompile, or modify the App</li>
              <li>Not distribute, sell, or share your license key with others</li>
              <li>Not use the App in any way that could damage your system or others&apos; systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Intellectual Property</h2>
            <p>
              MacBroom and all associated content, design, and code are the intellectual property of Al-Heekmah Library. All rights not expressly granted in these terms are reserved.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Disclaimer of Warranties</h2>
            <p>
              MacBroom is provided &quot;as is&quot; without warranty of any kind. We do not guarantee that the App will be error-free, uninterrupted, or meet your specific requirements. Use of the App is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Al-Heekmah Library shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of MacBroom, even if we have been advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Updates</h2>
            <p>
              We may release updates, patches, or new versions of MacBroom at any time. You are encouraged to keep the App updated for the best experience and security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Termination</h2>
            <p>
              We may terminate your license if you violate these terms. Upon termination, you must stop using MacBroom Pro and remove it from your devices.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">11. Changes to These Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of MacBroom after changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">12. Contact</h2>
            <p>
              For questions about these terms, contact us at <a href="mailto:support@macbroom.com" className="text-accent hover:underline">support@macbroom.com</a> or visit our <a href="/contact" className="text-accent hover:underline">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
