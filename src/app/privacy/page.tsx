import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Shield size={28} className="text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
          <p className="text-txt-dim text-sm">Last updated: May 1, 2026</p>
        </div>

        <div className="space-y-8 text-txt-dim text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Overview</h2>
            <p>
              VexalTech (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use MacBroom (&quot;the App&quot;) and our website at macbroom.com.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Information We Collect</h2>
            <p className="mb-3">MacBroom is designed to collect minimal personal information. We collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-white">License Information:</strong> When you purchase MacBroom Pro, we collect your email address and order ID through our payment processor (Lemon Squeezy) to verify your license.</li>
              <li><strong className="text-white">Usage Data:</strong> The App may collect anonymous usage statistics such as feature usage frequency and crash reports to improve the product.</li>
              <li><strong className="text-white">System Information:</strong> The App accesses system information (storage, memory, CPU) solely for the purpose of providing its cleaning and monitoring features. This data is never transmitted to our servers.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>To verify and activate your MacBroom Pro license</li>
              <li>To send important product updates and security notifications</li>
              <li>To improve MacBroom through anonymous usage analytics</li>
              <li>To respond to your support requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">4. Data Storage &amp; Security</h2>
            <p>
              Your license information is stored locally on your Mac and on our secure servers. We use industry-standard encryption and security practices. System scanning data (junk files, cache, etc.) is processed entirely on your device and is never uploaded.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><strong className="text-white">Lemon Squeezy</strong> — Payment processing and license management. Lemon Squeezy&apos;s privacy policy applies to payment data: <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">lemonsqueezy.com/privacy</a></li>
              <li><strong className="text-white">Sparkle</strong> — In-app update framework. Checks for updates by contacting our server.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. What We Don&apos;t Do</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>We do not sell, rent, or share your personal data with third parties</li>
              <li>We do not access, read, or transmit your personal files</li>
              <li>We do not track your browsing history or online activity</li>
              <li>We do not collect location data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, contact us at <a href="mailto:info@vexaltech.dev" className="text-accent hover:underline">info@vexaltech.dev</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Children&apos;s Privacy</h2>
            <p>
              MacBroom is not directed at children under 13. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Contact Us</h2>
            <p>
              If you have questions about this privacy policy, please contact us at <a href="mailto:info@vexaltech.dev" className="text-accent hover:underline">info@vexaltech.dev</a> or visit our <a href="/contact" className="text-accent hover:underline">Contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
