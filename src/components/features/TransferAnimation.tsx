import { motion } from "framer-motion";
import { Shield, Globe, Zap } from "lucide-react";
import crossDeviceImg from "@/assets/cross-device.jpg";

const NODES = [
  { x: "10%", y: "20%", delay: 0 },
  { x: "25%", y: "60%", delay: 0.3 },
  { x: "45%", y: "15%", delay: 0.6 },
  { x: "65%", y: "70%", delay: 0.9 },
  { x: "80%", y: "30%", delay: 1.2 },
  { x: "90%", y: "65%", delay: 1.5 },
];

export default function TransferAnimation() {
  return (
    <section id="transfer" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={crossDeviceImg} alt="Cross-device file sharing" className="w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />

              {/* Floating Speed Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-6 left-6 bg-mint text-navy px-4 py-2 rounded-xl font-bold flex items-center gap-2 shadow-lg"
              >
                <Zap className="w-4 h-4" /> 9.4 Gbps Live
              </motion.div>

              {/* Security badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-navy text-sm font-bold"
              >
                <Shield className="w-4 h-4 text-green-500" /> AES-256 Active
              </motion.div>
            </div>

            {/* Network nodes animation */}
            <div className="absolute inset-0 pointer-events-none">
              {NODES.map((node, i) => (
                <motion.div
                  key={i}
                  style={{ left: node.x, top: node.y }}
                  className="absolute"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
                >
                  <div className="w-3 h-3 rounded-full bg-mint/60 shadow-[0_0_10px_rgba(0,255,194,0.8)]" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-navy/10 text-navy text-sm font-semibold">
              Global CDN Network
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-navy leading-tight">
              Transfer Anywhere,<br />
              <span className="text-[#00FFC2]">Blazing Fast</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our globally distributed CDN with 50+ edge nodes ensures your files reach their destination at maximum speed — whether across town or across continents.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                {
                  icon: Zap,
                  title: "Chunk-Based Transfer",
                  desc: "Files are split into parallel chunks and reassembled for maximum throughput, achieving speeds up to 10 Gbps.",
                  color: "bg-yellow-50 text-yellow-600",
                },
                {
                  icon: Globe,
                  title: "Global Edge Network",
                  desc: "50+ PoPs across India, USA, Europe, and Asia ensure sub-50ms latency to 95% of the world's internet users.",
                  color: "bg-blue-50 text-blue-600",
                },
                {
                  icon: Shield,
                  title: "In-Transit Encryption",
                  desc: "Every byte is encrypted with TLS 1.3 during transfer. Your data is invisible to anyone on the network.",
                  color: "bg-green-50 text-green-600",
                },
              ].map(({ icon: Icon, title, desc, color }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy mb-1">{title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live metric */}
            <div className="p-5 rounded-2xl bg-navy border border-navy-light">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/60 text-sm">Live Network Speed</span>
                <span className="text-mint text-xs font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" /> Live
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #00FFC2, #00CC9B)", boxShadow: "0 0 12px rgba(0,255,194,0.6)" }}
                  animate={{ width: ["40%", "90%", "65%", "85%", "40%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/30">0 Gbps</span>
                <span className="text-mint font-bold">Current: 8.4 Gbps</span>
                <span className="text-white/30">10 Gbps</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
