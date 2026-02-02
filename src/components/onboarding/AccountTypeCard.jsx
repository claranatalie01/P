import { motion } from "framer-motion";
import { ChevronRight, CheckCircle2 } from "lucide-react";

export default function AccountTypeCard({ icon: Icon, title, description, isSelected = false, delay = 0 }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full flex items-center gap-4 p-5 bg-white rounded-2xl shadow-lg shadow-[#0284C7]/10 border-2 transition-all group ${
        isSelected 
          ? "border-[#0EA5E9] bg-[#F0F9FF]" 
          : "border-[#E2E8F0] hover:border-[#0EA5E9]/50"
      }`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
        isSelected 
          ? "bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] shadow-[#0EA5E9]/30 scale-105" 
          : "bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] shadow-[#0EA5E9]/30"
      }`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <div className="flex-1 text-left">
        <h3 className={`text-lg font-semibold transition-colors ${
          isSelected ? "text-[#0EA5E9]" : "text-[#1E3A5F]"
        }`}>{title}</h3>
        <p className="text-sm text-[#64748B]">{description}</p>
      </div>
      {isSelected ? (
        <CheckCircle2 className="w-6 h-6 text-[#0EA5E9]" />
      ) : (
        <ChevronRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#0EA5E9] group-hover:translate-x-1 transition-all" />
      )}
    </motion.button>
  );
}