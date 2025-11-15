'use client';

import { Mail, Globe, MessageCircle } from 'lucide-react';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Refund Policy</h1>
          <p className="text-xl text-blue-100">Last Updated: 1 Dec 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-lg text-slate-200">
            This Refund Policy applies to services purchased from <span className="font-semibold text-blue-400">SJ Node Hosting</span>. 
            By using our hosting services, you agree to the terms below.
          </p>
        </div>

        {/* Section 1: Refund Eligibility */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">1</span>
            Refund Eligibility
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-300 mb-4">
              Customers may request a refund within <span className="font-semibold text-yellow-400">12 hours</span> of purchase if any of the following conditions apply:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span className="text-slate-200">The hosting service or server was not delivered or activated.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span className="text-slate-200">Technical issues occurred that our support team could not resolve.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span className="text-slate-200">Technical issues occurred due to an error from our team or company.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Non-Refundable Situations */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-red-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-sm">2</span>
            Non-Refundable Situations
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-300 mb-4">
              Refunds will not be issued for:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex gap-3">
                <span className="text-red-400 font-bold mt-1">✗</span>
                <span className="text-slate-200">Change of mind after purchase.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold mt-1">✗</span>
                <span className="text-slate-200">Issues caused by user-installed plugins, mods, scripts, or configurations.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold mt-1">✗</span>
                <span className="text-slate-200">Suspension or termination due to Terms of Service violations.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold mt-1">✗</span>
                <span className="text-slate-200">Promotional or discounted plans.</span>
              </li>
            </ul>

            <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-red-500">
              <p className="font-semibold text-slate-200 mb-3">Add-on services including but not limited to:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-slate-300">Dedicated IPs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-slate-300">Extra storage</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-slate-300">Domains</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span className="text-slate-300">Setup fees</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Payment Method & Processing Time */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-purple-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm">3</span>
            Payment Method & Processing Time
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="space-y-4">
              <div>
                <p className="text-slate-300 mb-2">
                  Refunds will be processed to the <span className="font-semibold text-purple-300">original payment method</span> used at the time of purchase.
                </p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-purple-500">
                <p className="text-slate-200">
                  <span className="font-semibold">Processing time:</span> <span className="text-yellow-400">1–7 business days</span>, depending on the payment gateway or bank.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: How to Request a Refund */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-sm">4</span>
            How to Request a Refund
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-300 mb-4">
              Please submit a refund request by opening a support ticket and include:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">→</span>
                <span className="text-slate-200">Invoice/Order ID</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">→</span>
                <span className="text-slate-200">Reason for refund</span>
              </li>
              <li className="flex gap-3">
                <span className="text-cyan-400 font-bold">→</span>
                <span className="text-slate-200">Screenshots or proof (if applicable)</span>
              </li>
            </ul>
            <a
              href="#"
              className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Open Support Ticket
            </a>
          </div>
        </section>

        {/* Section 5: Disputes & Chargebacks */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-orange-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-sm">5</span>
            Disputes & Chargebacks
          </h2>
          <div className="bg-orange-900 bg-opacity-30 rounded-lg p-6 border border-orange-700">
            <p className="text-slate-300 mb-4">
              Filing any chargeback without contacting support first may result in:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">⚠</span>
                <span className="text-slate-200">Account termination</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">⚠</span>
                <span className="text-slate-200">Service cancellation</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-400 font-bold">⚠</span>
                <span className="text-slate-200">Permanent ban from SJ Node Hosting</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 6: Policy Changes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">6</span>
            Policy Changes
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-200">
              We may update or modify this Refund Policy at any time. Changes will be posted on this page.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition">
              <div className="flex items-center gap-3 mb-3">
                <Mail className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold text-green-400">Email</h3>
              </div>
              <a
                href="mailto:sjnodecare@gmail.com"
                className="text-slate-300 hover:text-green-400 transition break-all"
              >
                sjnodecare@gmail.com
              </a>
            </div>

            {/* Website */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold text-green-400">Website</h3>
              </div>
              <a
                href="https://www.sjnode.site"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-green-400 transition"
              >
                sjnode.site
              </a>
            </div>

            {/* Discord */}
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-green-500 transition">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold text-green-400">Discord</h3>
              </div>
              <a
                href="https://discord.gg/FFGuKwPum9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-green-400 transition"
              >
                Join Community
              </a>
            </div>
          </div>
        </section>

        {/* Footer Note */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            For any questions regarding this refund policy, please don't hesitate to contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
