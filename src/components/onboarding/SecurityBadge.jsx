import { Shield, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityBadge({ variant = "default" }) {
  if (variant === "compact") {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center gap-1.5 text-xs text-[#0284C7]"
      >
        <Lock className="w-3 h-3" />
        <span>Bank-grade encryption</span>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="flex items-center gap-2 px-4 py-2 bg-[#F0F9FF] rounded-full border border-[#0EA5E9]/20"
    >
      <Shield className="w-4 h-4 text-[#0EA5E9]" />
      <span className="text-xs text-[#1E3A5F] font-medium">Your data is encrypted and securely processed</span>
    </motion.div>
  );
}
