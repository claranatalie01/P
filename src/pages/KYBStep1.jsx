import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Search, ArrowRight, ArrowLeft, Shield, CheckCircle2, Loader2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import OnboardingCard from "@/components/onboarding/OnboardingCard";
import SecurityBadge from "@/components/onboarding/SecurityBadge";
import ManualEntryForm from "@/components/onboarding/ManualEntryForm";
import ProcessingStatus from "@/components/onboarding/ProcessingStatus";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69250fe19621d931963c448d/d68dbea49_Screenshot_2026-01-30_at_30833_PM-removebg-preview.png";

export default function KYBStep1() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [businessFound, setBusinessFound] = useState(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualData, setManualData] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const handleSearch = () => {
    setSearching(true);
    setSearchFailed(false);
    
    setTimeout(() => {
      const searchSuccess = Math.random() > 0.3; // 70% success rate
      
      if (searchSuccess) {
        setBusinessFound({
          name: "Acme Corporation Ltd",
          regNumber: searchQuery || "CR-12345678",
          address: "123 Business Bay, Central, Hong Kong",
          type: "Limited Company",
          status: "Active"
        });
      } else {
        setSearchFailed(true);
        setShowManualEntry(true);
      }
      setSearching(false);
    }, 2000);
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const manualFields = [
    { name: "business_name", label: "Business Name", placeholder: "Official registered name", required: true },
    { name: "registration_number", label: "Registration Number", placeholder: "CR-XXXXXXXX", required: true },
    { name: "business_type", label: "Business Type", placeholder: "e.g., Limited Company", required: true },
    { name: "registration_address", label: "Registered Address", placeholder: "Full business address", required: true }
  ];

  const handleManualDataChange = (field, value) => {
    setManualData(prev => ({ ...prev, [field]: value }));
  };

  const handleManualSubmit = () => {
    setBusinessFound({
      name: manualData.business_name,
      regNumber: manualData.registration_number,
      address: manualData.registration_address,
      type: manualData.business_type,
      status: "Pending Verification"
    });
    setShowManualEntry(false);
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] px-6 pt-12 pb-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to={createPageUrl("Welcome")}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <img src={LOGO_URL} alt="Pasa" className="w-10 h-10 object-contain" />
            <div className="w-10" />
          </div>
          <ProgressIndicator 
            currentStep={1} 
            totalSteps={3} 
            labels={["Business", "Controller", "Profile"]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-12 pb-8 max-w-md mx-auto">
        <OnboardingCard>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              confirmed ? "bg-[#10B981]" : "bg-gradient-to-br from-[#0EA5E9] to-[#0284C7]"
            }`}>
              {confirmed ? (
                <CheckCircle2 className="w-6 h-6 text-white" />
              ) : (
                <Building2 className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E3A5F]">
                {confirmed ? "Business Verified" : "Find Your Business"}
              </h1>
              <p className="text-sm text-[#64748B]">
                {confirmed ? "Registration details confirmed" : "Search by registration number"}
              </p>
            </div>
          </div>

          {!businessFound && !showManualEntry ? (
            <motion.div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1E3A5F] mb-2">
                  Business Registration Number
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter registration number (e.g., CR-12345678)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-12 rounded-xl border-[#E2E8F0] focus:border-[#0EA5E9] focus:ring-[#0EA5E9]/20"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={!searchQuery || searching}
                    className="h-12 px-4 bg-[#0EA5E9] hover:bg-[#0284C7] rounded-xl"
                  >
                    {searching ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </Button>
                </div>
              </div>

              {searching && (
                <ProcessingStatus 
                  status="processing" 
                  message="Searching company registry..." 
                />
              )}

              {searchFailed && (
                <ProcessingStatus 
                  status="error" 
                  message="Business not found in registry. Please use manual entry below." 
                />
              )}
              
              <div className="text-center py-2">
                <span className="text-sm text-[#64748B]">or</span>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowManualEntry(true)}
                className="w-full h-12 rounded-xl border-[#E2E8F0] hover:border-[#0EA5E9] hover:bg-[#F0F9FF]"
              >
                <Edit className="w-4 h-4 mr-2" />
                Enter Details Manually
              </Button>
            </motion.div>
          ) : showManualEntry ? (
            <>
              <ManualEntryForm
                formData={manualData}
                onChange={handleManualDataChange}
                fields={manualFields}
              />
              <Button
                onClick={handleManualSubmit}
                disabled={Object.keys(manualData).length < 4}
                className="w-full mt-4 h-12 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-xl"
              >
                Submit Business Details
              </Button>
              {businessFound && (
                <Button
                  variant="outline"
                  onClick={() => setShowManualEntry(false)}
                  className="w-full mt-2 h-12 rounded-xl"
                >
                  Back to Search
                </Button>
              )}
            </>
          ) : !confirmed ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0]">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${
                    businessFound.status === "Active" ? "bg-[#10B981]" : "bg-[#F59E0B]"
                  }`} />
                  <span className={`text-xs font-medium ${
                    businessFound.status === "Active" ? "text-[#10B981]" : "text-[#F59E0B]"
                  }`}>{businessFound.status}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">{businessFound.name}</h3>
                <div className="space-y-1.5 text-sm text-[#64748B]">
                  <p><span className="font-medium">Reg No:</span> {businessFound.regNumber}</p>
                  <p><span className="font-medium">Type:</span> {businessFound.type}</p>
                  <p><span className="font-medium">Address:</span> {businessFound.address}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setBusinessFound(null);
                    setShowManualEntry(false);
                    setSearchFailed(false);
                  }}
                  className="flex-1 h-12 rounded-xl"
                >
                  Search Again
                </Button>
                <Button
                  onClick={handleConfirm}
                  className="flex-1 h-12 bg-[#10B981] hover:bg-[#059669] rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Confirm
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
              </div>
              <h3 className="font-semibold text-[#1E3A5F] mb-1">{businessFound.name}</h3>
              <p className="text-sm text-[#64748B]">Business details verified</p>
            </motion.div>
          )}

          {/* Security Notice */}
          <div className="mt-6 flex items-center gap-2 p-3 bg-[#F0F9FF] rounded-xl">
            <Shield className="w-4 h-4 text-[#0EA5E9]" />
            <span className="text-xs text-[#64748B]">Company registry verification active</span>
          </div>
        </OnboardingCard>

        {/* Continue Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Link to={createPageUrl("KYBStep2")} className={!confirmed ? "pointer-events-none" : ""}>
            <Button 
              size="lg"
              disabled={!confirmed}
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