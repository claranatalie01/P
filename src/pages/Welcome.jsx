import { motion } from "framer-motion";
import { User, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import SecurityBadge from "@/components/onboarding/SecurityBadge";
import AccountTypeCard from "@/components/onboarding/AccountTypeCard";
import { useState } from "react";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69250fe19621d931963c448d/d68dbea49_Screenshot_2026-01-30_at_30833_PM-removebg-preview.png";

export default function Welcome() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#0369A1] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-12 max-w-md mx-auto">
        {/* Logo and Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center pt-8"
        >
          <motion.img 
            src={LOGO_URL}
            alt="Pasa Logo"
            className="w-24 h-24 object-contain mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="text-4xl font-bold text-white tracking-tight">pasa</span>
          </motion.div>
          <p className="text-white/80 text-center text-lg">Your trusted financial companion</p>
        </motion.div>

        {/* Main Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex-1 flex flex-col mt-12"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-2">Choose Account Type</h2>
            <p className="text-white/70 text-sm mb-6">Select how you'd like to use Pasa</p>

            <div className="space-y-4">
              <div onClick={() => setSelectedType("personal")}>
                <AccountTypeCard
                  icon={User}
                  title="Personal Account"
                  description="For individual use and personal finances"
                  isSelected={selectedType === "personal"}
                  delay={0.4}
                />
              </div>
              <div onClick={() => setSelectedType("business")}>
                <AccountTypeCard
                  icon={Building2}
                  title="Business Account"
                  description="For companies and business transactions"
                  isSelected={selectedType === "business"}
                  delay={0.5}
                />
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur rounded-full">
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
              <span className="text-xs text-white/90 font-medium">Bank-grade encryption active</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Get Started Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 space-y-4"
        >
          <Link to={createPageUrl(selectedType === "business" ? "KYBStep1" : "KYCStep1")} className="block">
            <Button 
              size="lg"
              disabled={!selectedType}
              className="w-full h-14 bg-white text-[#0284C7] hover:bg-white/90 rounded-2xl font-semibold text-lg shadow-xl shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="text-center text-white/60 text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}