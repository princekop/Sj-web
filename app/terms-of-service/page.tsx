'use client';

import { Mail, Globe, MessageCircle, FileText } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Terms of Service</h1>
          </div>
          <p className="text-xl text-orange-100">Last Updated: 1 Dec 2025</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="mb-12 p-6 bg-slate-800 rounded-lg border border-slate-700">
          <p className="text-lg text-slate-200">
            By accessing or using services offered by <span className="font-semibold text-orange-400">SJ Node Hosting</span>, you agree to the following Terms of Service.
          </p>
        </div>

        {/* Section 1: Acceptable Use */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-orange-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-sm">1</span>
            Acceptable Use
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-300 mb-4">You agree not to engage in activities that include:</p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-red-400 font-bold mt-1">✗</span>
                <span className="text-slate-200">DDoS attacks, malware distribution, botnets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold mt-1">✗</span>
                <span className="text-slate-200">Phishing, fraud, or illegal activities</span>
              </li>
              <li className="flex gap-3">
                <span className="text-red-400 font-bold mt-1">✗</span>
                <span className="text-slate-200">Hosting copyrighted content without authorization</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 2: Account Responsibility */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-sm">2</span>
            Account Responsibility
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-200">
              You are responsible for maintaining the confidentiality of login credentials.
            </p>
          </div>
        </section>

        {/* Section 3: Payments & Billing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-green-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm">3</span>
            Payments & Billing
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-green-400 font-bold mt-1">•</span>
                <span className="text-slate-200">Services require payment before activation.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 font-bold mt-1">•</span>
                <span className="text-slate-200">Non-payment may result in suspension or data removal.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-400 font-bold mt-1">•</span>
                <span className="text-slate-200">All refunds fall under our <a href="/refund-policy" className="text-green-300 hover:text-green-200 transition">Refund Policy</a>.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Data & Backups */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-blue-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">4</span>
            Data & Backups
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-200">
              We are not responsible for data loss caused by misconfiguration, plugins, or external attacks.
            </p>
          </div>
        </section>

        {/* Section 5: Termination */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-purple-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm">5</span>
            Termination
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-200">
              We may suspend or terminate accounts that breach policies or impact network integrity.
            </p>
          </div>
        </section>

        {/* Section 6: Liability */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-pink-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-sm">6</span>
            Liability
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-200">
              We provide hosting as-is, without guarantee of uninterrupted service.
            </p>
          </div>
        </section>

        {/* Section 7: Governing Law */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400 flex items-center gap-2">
            <span className="w-8 h-8 bg-cyan-600 rounded-full flex items-center justify-center text-sm">7</span>
            Governing Law
          </h2>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-200">
              These terms are governed under the laws of <span className="font-semibold text-cyan-300">India</span>.
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
            If you have questions regarding these Terms of Service, please don't hesitate to contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
