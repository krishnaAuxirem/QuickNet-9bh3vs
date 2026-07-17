import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Twitter, Facebook, Instagram, Linkedin, Youtube, Github,
  Zap, Mail, MapPin, Phone, Send, ArrowUp, ExternalLink,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/constants";
import { useState } from "react";
import { toast } from "sonner";
import { isAuthenticated } from "@/lib/auth";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Security", href: "/security" },
    { label: "Compression Demo", href: "/compression-demo" },
    { label: "Analytics", href: "/analytics" },
    { label: "API Access", href: "/api-access" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Press Kit", href: "/press-kit" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
  Support: [
    { label: "Help Center", href: "/help-center" },
    { label: "Documentation", href: "/docs" },
    { label: "System Status", href: "/system-status" },
    { label: "Community", href: "/community" },
    { label: "Bug Reports", href: "/bug-reports" },
    { label: "Feature Requests", href: "/feature-requests" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "GDPR", href: "/gdpr" },
    { label: "Security Policy", href: "/security-policy" },
    { label: "Acceptable Use", href: "/acceptable-use" },
  ],
};

const SOCIAL_ITEMS = [
  { icon: Twitter, href: SOCIAL_LINKS.twitter, label: "Twitter", color: "hover:text-sky-400" },
  { icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook", color: "hover:text-blue-400" },
  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram", color: "hover:text-pink-400" },
  { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn", color: "hover:text-blue-300" },
  { icon: Youtube, href: SOCIAL_LINKS.youtube, label: "YouTube", color: "hover:text-red-400" },
  { icon: Github, href: SOCIAL_LINKS.github, label: "GitHub", color: "hover:text-white" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 300);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated()) {
      toast.error("Please login to subscribe to updates!");
      navigate("/login");
      return;
    }
    if (!email) return;
    toast.success("You've been subscribed to QuickNet updates!");
    setEmail("");
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-navy-dark text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-mint/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-mint" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Quick<span className="text-mint">Net</span>
              </span>
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              The fastest file sharing and compression platform. Transfer anything, anywhere, at lightning speed with military-grade security.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5 mb-6">
              {[
                { icon: Mail, text: "support@quicknet.io" },
                { icon: Phone, text: "+91 80 4567 8900" },
                { icon: MapPin, text: "Bengaluru, Karnataka, India" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 text-white/40 text-sm">
                  <Icon className="w-4 h-4 text-mint flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 flex-wrap">
              {SOCIAL_ITEMS.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 ${color} transition-all hover:border-white/25 hover:bg-white/10`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display font-semibold text-white text-sm mb-5 uppercase tracking-wider">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/#") ? (
                      <button
                        onClick={() => handleNav(link.href)}
                        className="text-white/40 text-sm hover:text-mint transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-white/40 text-sm hover:text-mint transition-colors flex items-center gap-1 group"
                      >
                        {link.label}
                        {link.href === "/" && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-14 pt-10 border-t border-white/8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-2">Stay in the Loop</h3>
              <p className="text-white/40 text-sm">Get product updates, transfer tips, and performance insights delivered to your inbox.</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/25 text-sm focus:outline-none focus:border-mint transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-mint text-navy font-bold rounded-xl hover:bg-mint-light transition-colors flex items-center gap-2 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm text-center inline-flex items-center justify-center gap-1">
            © {new Date().getFullYear()} QuickNet Technologies Pvt. Ltd. · Made with <Zap className="w-4 h-4 text-mint" /> in Bengaluru, India
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-white/30 text-xs">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              All systems operational
            </div>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-mint/10 border border-mint/20 text-mint flex items-center justify-center hover:bg-mint/20 transition-all hover:scale-110"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
