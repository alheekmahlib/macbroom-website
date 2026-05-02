import { RotateCcw } from "lucide-react";

export default function RefundPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <RotateCcw size={28} className="text-accent" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Refund Policy</h1>
          <p className="text-txt-dim text-sm">Last updated: May 1, 2026</p>
        </div>

        <div className="space-y-8 text-txt-dim text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-white mb-3">30-Day Money-Back Guarantee</h2>
            <p>
              We offer a 30-day money-back guarantee on all MacBroom Pro purchases. If you are not satisfied with MacBroom Pro for any reason, you may request a full refund within 30 days of your purchase date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">How to Request a Refund</h2>
            <p>To request a refund, please contact us at:</p>
            <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
              <li>Email: <a href="mailto:support@macbroom.com" className="text-accent hover:underline">support@macbroom.com</a></li>
              <li>Contact Form: <a href="/contact" className="text-accent hover:underline">macbroom.com/contact</a></li>
            </ul>
            <p className="mt-3">
              Please include your Transaction ID (starts with <code className="text-accent">txn_</code>) and the email address used for the purchase.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Refund Processing</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Refunds are processed through <strong className="text-white">Paddle</strong>, our payment processor</li>
              <li>Refunds will be issued to the original payment method</li>
              <li>Processing time is typically 5-10 business days</li>
              <li>You will receive a confirmation email once the refund is processed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Subscription Refunds</h2>
            <p>
              For monthly or yearly subscriptions, you may cancel at any time. Refunds for subscriptions are prorated based on the remaining billing period within the 30-day guarantee window.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Exceptions</h2>
            <p>
              Refund requests made after 30 days from the purchase date will be considered on a case-by-case basis. We strive to be fair and reasonable in all cases.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">Contact</h2>
            <p>
              If you have questions about refunds, please contact us at <a href="mailto:support@macbroom.com" className="text-accent hover:underline">support@macbroom.com</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
