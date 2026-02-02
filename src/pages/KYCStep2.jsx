import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Smartphone, ArrowRight, ArrowLeft, Shield, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import OnboardingCard from "@/components/onboarding/OnboardingCard";
import SecurityBadge from "@/components/onboarding/SecurityBadge";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69250fe19621d931963c448d/d68dbea49_Screenshot_2026-01-30_at_30833_PM-removebg-preview.png";

export default function KYCStep2() {
  const [phone, setPhone] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleSendCode = () => {
    setLoading(true);
    setTimeout(() => {
      setCodeSent(true);
      setCountdown(30);
      setLoading(false);
    }, 1500);
  };

  const handleCodeChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }

      // Auto-verify when complete
      if (newCode.every(d => d) && newCode.join("").length === 6) {
        setLoading(true);
        setTimeout(() => {
          setVerified(true);
          setLoading(false);
        }, 1500);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] px-6 pt-12 pb-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to={createPageUrl("KYCStep1")}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <img src={LOGO_URL} alt="Pasa" className="w-10 h-10 object-contain" />
            <div className="w-10" />
          </div>
          <ProgressIndicator 
            currentStep={2} 
            totalSteps={3} 
            labels={["Identity", "Phone", "Profile"]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-12 pb-8 max-w-md mx-auto">
        <OnboardingCard>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              verified ? "bg-[#10B981]" : "bg-gradient-to-br from-[#0EA5E9] to-[#0284C7]"
            }`}>
              {verified ? (
                <CheckCircle2 className="w-6 h-6 text-white" />
              ) : (
                <Smartphone className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E3A5F]">
                {verified ? "Phone Verified!" : "Verify Your Phone"}
              </h1>
              <p className="text-sm text-[#64748B]">
                {verified ? "Your device is now linked" : "We'll send you a verification code"}
              </p>
            </div>
          </div>

          {!codeSent ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <div className="w-20 h-12 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-center text-sm font-medium text-[#1E3A5F]">
                    +852
                  </div>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 h-12 rounded-xl border-[#E2E8F0] focus:border-[#0EA5E9] focus:ring-[#0EA5E9]/20"
                  />
                </div>
              </div>
              <Button
                onClick={handleSendCode}
                disabled={phone.length < 8 || loading}
                className="w-full h-12 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-xl font-semibold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Verification Code"
                )}
              </Button>
            </motion.div>
          ) : !verified ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center">
                <p className="text-sm text-[#64748B] mb-4">
                  Enter the 6-digit code sent to <span className="font-medium text-[#1E3A5F]">+852 {phone}</span>
                </p>
                <div className="flex justify-center gap-2">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl border-[#E2E8F0] focus:border-[#0EA5E9] focus:ring-[#0EA5E9]/20"
                    />
                  ))}
                </div>
                {loading && (
                  <div className="flex items-center justify-center gap-2 mt-4 text-[#0EA5E9]">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Verifying...</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-sm text-[#64748B]">
                    Resend code in <span className="font-medium text-[#0EA5E9]">{countdown}s</span>
                  </p>
                ) : (
                  <Button
                    variant="link"
                    onClick={handleSendCode}
                    className="text-[#0EA5E9] hover:text-[#0284C7]"
                  >
                    Resend Code
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-20 h-20 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
              </div>
              <p className="text-[#64748B]">
                Device fingerprint captured for enhanced security
              </p>
            </motion.div>
          )}

          {/* Security Notice */}
          <div className="mt-6 flex items-center gap-2 p-3 bg-[#F0F9FF] rounded-xl">
            <Shield className="w-4 h-4 text-[#0EA5E9]" />
            <span className="text-xs text-[#64748B]">SMS secured with end-to-end encryption</span>
          </div>
        </OnboardingCard>

        {/* Continue Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Link to={createPageUrl("KYCStep3")} className={!verified ? "pointer-events-none" : ""}>
            <Button 
              size="lg"
              disabled={!verified}
              className="w-full h-14 bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white rounded-2xl font-semibold text-lg shadow-lg shadow-[#0EA5E9]/30 disabled:opacity-50 group"
            >
              Continue
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <div className="flex justify-center mt-4">
            <SecurityBadge variant="compact" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}