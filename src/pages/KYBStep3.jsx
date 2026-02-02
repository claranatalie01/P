import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, ArrowRight, ArrowLeft, Shield, CheckCircle2, Loader2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import OnboardingCard from "@/components/onboarding/OnboardingCard";
import SecurityBadge from "@/components/onboarding/SecurityBadge";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69250fe19621d931963c448d/d68dbea49_Screenshot_2026-01-30_at_30833_PM-removebg-preview.png";

export default function KYBStep3() {
  const [industry, setIndustry] = useState("");
  const [activity, setActivity] = useState("");
  const [revenue, setRevenue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const canSubmit = industry && activity && revenue;

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setCompleted(true);
    }, 2500);
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0EA5E9] via-[#0284C7] to-[#0369A1] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
          >
            <PartyPopper className="w-12 h-12 text-[#10B981]" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-white mb-3"
          >
            Business Verified!
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 mb-8 max-w-xs mx-auto"
          >
            Your business account is ready. Welcome to Pasa Business!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link to={createPageUrl("Home")}>
              <Button 
                size="lg"
                className="h-14 px-10 bg-white text-[#0284C7] hover:bg-white/90 rounded-2xl font-semibold text-lg shadow-xl"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] px-6 pt-12 pb-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to={createPageUrl("KYBStep2")}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <img src={LOGO_URL} alt="Pasa" className="w-10 h-10 object-contain" />
            <div className="w-10" />
          </div>
          <ProgressIndicator 
            currentStep={3} 
            totalSteps={3} 
            labels={["Business", "Controller", "Profile"]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-12 pb-8 max-w-md mx-auto">
        <OnboardingCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E3A5F]">Business Profile</h1>
              <p className="text-sm text-[#64748B]">Tell us about your business</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Industry */}
            <div>
              <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Industry Sector
              </label>
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="h-12 rounded-xl border-[#E2E8F0] focus:ring-[#0EA5E9]/20">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="technology">Technology & Software</SelectItem>
                  <SelectItem value="finance">Financial Services</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="hospitality">Hospitality & F&B</SelectItem>
                  <SelectItem value="professional">Professional Services</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Expected Activity */}
            <div>
              <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Expected Monthly Transactions
              </label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger className="h-12 rounded-xl border-[#E2E8F0] focus:ring-[#0EA5E9]/20">
                  <SelectValue placeholder="Transaction volume" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Less than 50</SelectItem>
                  <SelectItem value="medium">50 - 200</SelectItem>
                  <SelectItem value="high">200 - 500</SelectItem>
                  <SelectItem value="very-high">500+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Annual Revenue */}
            <div>
              <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                Annual Revenue (HKD)
              </label>
              <Select value={revenue} onValueChange={setRevenue}>
                <SelectTrigger className="h-12 rounded-xl border-[#E2E8F0] focus:ring-[#0EA5E9]/20">
                  <SelectValue placeholder="Select revenue range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="below-1m">Below 1 Million</SelectItem>
                  <SelectItem value="1m-5m">1 - 5 Million</SelectItem>
                  <SelectItem value="5m-20m">5 - 20 Million</SelectItem>
                  <SelectItem value="20m-100m">20 - 100 Million</SelectItem>
                  <SelectItem value="100m-plus">Above 100 Million</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Risk Check Notice */}
          <div className="mt-6 flex items-center gap-2 p-3 bg-[#F0F9FF] rounded-xl">
            <Shield className="w-4 h-4 text-[#0EA5E9]" />
            <span className="text-xs text-[#64748B]">Enhanced due diligence in progress</span>
            <Loader2 className="w-3 h-3 text-[#0EA5E9] animate-spin ml-auto" />
          </div>
        </OnboardingCard>

        {/* Submit Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Button 
            size="lg"
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className="w-full h-14 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white rounded-2xl font-semibold text-lg shadow-lg shadow-[#0EA5E9]/30 disabled:opacity-50 group"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Completing Verification...
              </>
            ) : (
              <>
                Complete Verification
                <CheckCircle2 className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
          <div className="flex justify-center mt-4">
            <SecurityBadge variant="compact" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}