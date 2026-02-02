import { motion } from "framer-motion";

export default function OnboardingCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-3xl shadow-xl shadow-[#0284C7]/10 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}