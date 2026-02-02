import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function ProgressIndicator({ currentStep, totalSteps, labels }) {
  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between relative">
        {/* Progress line background */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#E2E8F0] mx-8" />
        
        {/* Progress line active */}
        <motion.div 
          className="absolute top-4 left-0 h-0.5 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] mx-8"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;
          
          return (
            <div key={i} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  isCompleted 
                    ? "bg-[#10B981] text-white" 
                    : isActive 
                      ? "bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] text-white shadow-lg shadow-[#0EA5E9]/30" 
                      : "bg-white border-2 border-[#E2E8F0] text-[#94A3B8]"
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNum}
              </motion.div>
              {labels && labels[i] && (
                <span className={`text-[10px] mt-2 font-medium text-center max-w-[60px] ${
                  isActive ? "text-[#0284C7]" : "text-[#94A3B8]"
                }`}>
                  {labels[i]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}