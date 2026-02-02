import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ProcessingStatus({ status, message }) {
  const statusConfig = {
    processing: {
      icon: Loader2,
      color: "text-[#0EA5E9]",
      bgColor: "bg-[#F0F9FF]",
      borderColor: "border-[#0EA5E9]/20",
      spin: true
    },
    success: {
      icon: CheckCircle2,
      color: "text-[#10B981]",
      bgColor: "bg-[#10B981]/5",
      borderColor: "border-[#10B981]/20",
      spin: false
    },
    error: {
      icon: AlertCircle,
      color: "text-[#EF4444]",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      spin: false
    }
  };

  const config = statusConfig[status] || statusConfig.processing;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${config.bgColor} border ${config.borderColor} rounded-xl p-4 flex items-center gap-3`}
    >
      <Icon className={`w-5 h-5 ${config.color} flex-shrink-0 ${config.spin ? 'animate-spin' : ''}`} />
      <div className="flex-1">
        <p className={`text-sm font-medium ${config.color}`}>
          {status === 'processing' && 'Processing...'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Action Required'}
        </p>
        <p className="text-xs text-[#64748B] mt-0.5">{message}</p>
      </div>
    </motion.div>
  );
}
