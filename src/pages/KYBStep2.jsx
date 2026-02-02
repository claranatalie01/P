import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, CheckCircle2, ArrowRight, ArrowLeft, Shield, Users, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import OnboardingCard from "@/components/onboarding/OnboardingCard";
import SecurityBadge from "@/components/onboarding/SecurityBadge";
import DocumentUpload from "@/components/onboarding/DocumentUpload";
import DocumentPreview from "@/components/onboarding/DocumentPreview";
import ProcessingStatus from "@/components/onboarding/ProcessingStatus";
import ManualEntryForm from "@/components/onboarding/ManualEntryForm";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69250fe19621d931963c448d/d68dbea49_Screenshot_2026-01-30_at_30833_PM-removebg-preview.png";

export default function KYBStep2() {
  // ID states
  const [idFileUrl, setIdFileUrl] = useState(null);
  const [idFileName, setIdFileName] = useState(null);
  const [showIdPreview, setShowIdPreview] = useState(false);
  const [idProcessing, setIdProcessing] = useState(false);
  const [idExtracted, setIdExtracted] = useState(null);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualData, setManualData] = useState({});

  // Selfie states
  const [selfieFileUrl, setSelfieFileUrl] = useState(null);
  const [selfieFileName, setSelfieFileName] = useState(null);
  const [showSelfiePreview, setShowSelfiePreview] = useState(false);
  const [selfieProcessing, setSelfieProcessing] = useState(false);
  const [selfieVerified, setSelfieVerified] = useState(false);

  // UBO check
  const [uboChecked, setUboChecked] = useState(false);

  const handleIdUpload = (fileUrl, file) => {
    setIdFileUrl(fileUrl);
    setIdFileName(file.name);
    setShowIdPreview(true);
  };

  const handleIdConfirm = () => {
    setShowIdPreview(false);
    setIdProcessing(true);

    setTimeout(() => {
      const extractionSuccess = Math.random() > 0.3;
      
      if (extractionSuccess) {
        setIdExtracted({
          name: "Jane Smith",
          position: "Director",
          idNumber: "B9876543"
        });
        setIdProcessing(false);
        // Auto-check UBO
        setTimeout(() => setUboChecked(true), 1500);
      } else {
        setIdProcessing(false);
        setShowManualEntry(true);
      }
    }, 2000);
  };

  const handleSelfieUpload = (fileUrl, file) => {
    setSelfieFileUrl(fileUrl);
    setSelfieFileName(file.name);
    setShowSelfiePreview(true);
  };

  const handleSelfieConfirm = () => {
    setShowSelfiePreview(false);
    setSelfieProcessing(true);

    setTimeout(() => {
      setSelfieVerified(true);
      setSelfieProcessing(false);
    }, 1500);
  };

  const manualFields = [
    { name: "full_name", label: "Full Name", placeholder: "Controller's full name", required: true },
    { name: "position", label: "Position", placeholder: "e.g., Director, CEO", required: true },
    { name: "id_number", label: "ID Number", placeholder: "As shown on ID", required: true }
  ];

  const handleManualDataChange = (field, value) => {
    setManualData(prev => ({ ...prev, [field]: value }));
  };

  const handleManualSubmit = () => {
    setShowManualEntry(false);
    setIdExtracted({
      name: manualData.full_name,
      position: manualData.position,
      idNumber: manualData.id_number
    });
    setTimeout(() => setUboChecked(true), 1000);
  };

  const canProceed = idExtracted && selfieVerified && uboChecked;

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0EA5E9] to-[#0284C7] px-6 pt-12 pb-20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Link to={createPageUrl("KYBStep1")}>
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
            labels={["Business", "Controller", "Profile"]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-12 pb-8 max-w-md mx-auto">
        <OnboardingCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E3A5F]">Controller Verification</h1>
              <p className="text-sm text-[#64748B]">Verify authorized representative</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* ID Document Section */}
            <div>
              <h3 className="font-semibold text-[#1E3A5F] mb-3">Step 1: Controller's ID</h3>
              
              {!idFileUrl ? (
                <DocumentUpload
                  title="Upload Controller's ID"
                  instructions="Director or Authorized Person's ID document"
                  onUploadComplete={handleIdUpload}
                  onError={(err) => console.error(err)}
                />
              ) : showIdPreview ? (
                <DocumentPreview
                  fileUrl={idFileUrl}
                  fileName={idFileName}
                  onConfirm={handleIdConfirm}
                  onRetake={() => {
                    setIdFileUrl(null);
                    setShowIdPreview(false);
                  }}
                />
              ) : idProcessing ? (
                <ProcessingStatus 
                  status="processing" 
                  message="Extracting controller information..." 
                />
              ) : showManualEntry ? (
                <>
                  <ManualEntryForm
                    formData={manualData}
                    onChange={handleManualDataChange}
                    fields={manualFields}
                  />
                  <Button
                    onClick={handleManualSubmit}
                    disabled={Object.keys(manualData).length < 3}
                    className="w-full mt-4 h-12 bg-[#0EA5E9] hover:bg-[#0284C7] text-white rounded-xl"
                  >
                    Submit Details
                  </Button>
                </>
              ) : idExtracted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-[#10B981]/5 border-2 border-[#10B981]/20 rounded-xl p-4"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-[#1E3A5F] mb-2">Controller Verified</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-[#64748B]"><span className="font-medium text-[#1E3A5F]">Name:</span> {idExtracted.name}</p>
                        <p className="text-[#64748B]"><span className="font-medium text-[#1E3A5F]">Position:</span> {idExtracted.position}</p>
                        <p className="text-[#64748B]"><span className="font-medium text-[#1E3A5F]">ID:</span> {idExtracted.idNumber}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowManualEntry(true)}
                      className="h-8 w-8"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : null}
            </div>

            {/* Selfie Section */}
            {idExtracted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-semibold text-[#1E3A5F] mb-3">Step 2: Liveness Check</h3>
                
                {!selfieFileUrl ? (
                  <DocumentUpload
                    title="Take Controller's Selfie"
                    instructions="Position face in center with good lighting for liveness verification"
                    onUploadComplete={handleSelfieUpload}
                    onError={(err) => console.error(err)}
                  />
                ) : showSelfiePreview ? (
                  <DocumentPreview
                    fileUrl={selfieFileUrl}
                    fileName={selfieFileName}
                    onConfirm={handleSelfieConfirm}
                    onRetake={() => {
                      setSelfieFileUrl(null);
                      setShowSelfiePreview(false);
                    }}
                  />
                ) : selfieProcessing ? (
                  <ProcessingStatus 
                    status="processing" 
                    message="Verifying identity with liveness check..." 
                  />
                ) : selfieVerified ? (
                  <ProcessingStatus 
                    status="success" 
                    message="Liveness verification successful" 
                  />
                ) : null}
              </motion.div>
            )}

            {/* UBO Check */}
            {idExtracted && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`border-2 rounded-2xl p-5 transition-all ${
                  uboChecked ? "border-[#10B981] bg-[#10B981]/5" : "border-[#E2E8F0]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    uboChecked ? "bg-[#10B981]" : "bg-[#F0F9FF]"
                  }`}>
                    {uboChecked ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <Users className="w-6 h-6 text-[#0EA5E9] animate-spin" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1E3A5F] mb-1">UBO Verification</h3>
                    <p className="text-sm text-[#64748B]">
                      {uboChecked 
                        ? "Ultimate beneficial owners verified" 
                        : "Checking ownership structure..."}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Security Notice */}
          <div className="mt-6 flex items-center gap-2 p-3 bg-[#F0F9FF] rounded-xl">
            <Shield className="w-4 h-4 text-[#0EA5E9]" />
            <span className="text-xs text-[#64748B]">AML & sanctions screening in progress</span>
          </div>
        </OnboardingCard>

        {/* Continue Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Link to={createPageUrl("KYBStep3")} className={!canProceed ? "pointer-events-none" : ""}>
            <Button 
              size="lg"
              disabled={!canProceed}
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