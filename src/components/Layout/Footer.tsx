import { Link } from 'react-router-dom'
import { Stethoscope, Mail, Phone, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-gradient-to-b from-transparent to-black/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Top section: brand + columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-cyan-500/20">
                <Stethoscope className="w-5 h-5 text-cyan" />
              </span>
              <span className="text-xl font-bold text-white">Nexora</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-[260px]">
              Smart healthcare for everyone. AI-powered insights, telemedicine, and seamless care.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/symptom-checker" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Symptom Checker</Link></li>
              <li><Link to="/medications" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Medications</Link></li>
              <li><Link to="/telemedicine" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Telemedicine</Link></li>
              <li><Link to="/dashboard" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Health Dashboard</Link></li>
              <li><Link to="/appointments" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Appointments</Link></li>
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">For Doctors</h4>
            <ul className="space-y-3">
              <li><Link to="/doctor" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Doctor Dashboard</Link></li>
              <li><Link to="/health-records" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Health Records</Link></li>
              <li><Link to="/predictions" className="text-zinc-400 hover:text-cyan text-sm transition-colors">AI Predictions</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link to="/emergency" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Emergency Alerts</Link></li>
              <li><Link to="/community" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Community</Link></li>
              <li><Link to="/diet-exercise" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Diet & Exercise</Link></li>
              <li><Link to="/analytics" className="text-zinc-400 hover:text-cyan text-sm transition-colors">Analytics</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li>
                <a href="mailto:hello@nexora.health" className="inline-flex items-center gap-2 hover:text-cyan transition-colors">
                  <Mail className="w-4 h-4 shrink-0 text-cyan/80" />
                  hello@nexora.health
                </a>
              </li>
              <li>
                <a href="tel:+18001234567" className="inline-flex items-center gap-2 hover:text-cyan transition-colors">
                  <Phone className="w-4 h-4 shrink-0 text-cyan/80" />
                  +1 800 123 4567
                </a>
              </li>
              <li className="inline-flex items-center gap-2 pt-1">
                <Shield className="w-4 h-4 shrink-0 text-cyan/80" />
                <span>HIPAA Compliant • Secure</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Nexora. All rights reserved. Built for better healthcare.
          </p>
        </div>
      </div>
    </footer>
  )
}
