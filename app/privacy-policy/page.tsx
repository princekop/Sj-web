'use client';

import { Mail, Globe, MessageCircle, Shield } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-xl text-purple-100">Last Updated: 1 Dec 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-lg text-slate-200">
            This Privacy Policy describes how <span className="font-semibold text-purple-400">SJ Node Hosting</span> collects, uses, and protects your personal data when using our website and hosting services.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-purple-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm">1</span>
            Information We Collect
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-purple-400 font-bold mt-1">•</span>
                <span className="text-slate-200">Name, email, phone number</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400 font-bold mt-1">•</span>
                <span className="text-slate-200">Billing & payment information</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400 font-bold mt-1">•</span>
                <span className="text-slate-200">IP address, device identifiers and service logs</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-400 font-bold mt-1">•</span>
                <span className="text-slate-200">Minecraft/server configuration and performance logs</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: How We Use Your Information */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">2</span>
            How We Use Your Information
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold mt-1">→</span>
                <span className="text-slate-200">Service activation, management, and customization</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold mt-1">→</span>
                <span className="text-slate-200">Customer support and technical assistance</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold mt-1">→</span>
                <span className="text-slate-200">Fraud prevention and security monitoring</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold mt-1">→</span>
                <span className="text-slate-200">Service improvements and performance analytics</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-400 font-bold mt-1">→</span>
                <span className="text-slate-200">Payment processing and invoice communication</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Data Sharing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm">3</span>
            Data Sharing
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-300 mb-4">
              We do <span className="font-semibold text-red-400">not</span> sell personal information. We may share limited data with:
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold mt-1">•</span>
                <span className="text-slate-200">Payment gateway partners</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold mt-1">•</span>
                <span className="text-slate-200">Server infrastructure providers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-indigo-400 font-bold mt-1">•</span>
                <span className="text-slate-200">Government authorities if required by law</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Cookies */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-sm">4</span>
            Cookies
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-200">
              We use cookies for user experience, analytics, and security. See our <a href="/cookie-policy" className="text-cyan-400 hover:text-cyan-300 transition">Cookie Policy</a>.
            </p>
          </div>
        </section>

        {/* Section 5: Your Rights */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm">5</span>
            Your Rights (India DPDP Act)
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-300 mb-4">You may request:</p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span className="text-slate-200">Access to your stored data</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span className="text-slate-200">Correction or updating of personal information</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 font-bold mt-1">✓</span>
                <span className="text-slate-200">Deletion of data unless required legally</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 6: Data Security */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-sm">6</span>
            Data Security
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-200">
              We implement administrative and network-level safeguards, including encryption where applicable.
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
            If you have questions regarding this Privacy Policy, please don't hesitate to contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
