import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanFace, CheckCircle2, ArrowRight, ArrowLeft, Shield, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ProgressIndicator from "@/components/onboarding/ProgressIndicator";
import OnboardingCard from "@/components/onboarding/OnboardingCard";
import SecurityBadge from "@/components/onboarding/SecurityBadge";
import DocumentUpload from "@/components/onboarding/DocumentUpload";
import DocumentPreview from "@/components/onboarding/DocumentPreview";
import ManualEntryForm from "@/components/onboarding/ManualEntryForm";
import ProcessingStatus from "@/components/onboarding/ProcessingStatus";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69250fe19621d931963c448d/d68dbea49_Screenshot_2026-01-30_at_30833_PM-removebg-preview.png";

export default function KYCStep1() {
  // ID Document states
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

  const handleIdUpload = (fileUrl, file) => {
    setIdFileUrl(fileUrl);
    setIdFileName(file.name);
    setShowIdPreview(true);
  };

  const handleIdConfirm = () => {
    setShowIdPreview(false);
    setIdProcessing(true);

    // Simulate extraction with potential failure
    setTimeout(() => {
      const extractionSuccess = Math.random() > 0.3; // 70% success rate
      
      if (extractionSuccess) {
        setIdExtracted({
          name: "John Doe",
          idNumber: "A1234567",
          dob: "1990-01-15",
          address: "123 Main St, Hong Kong"
        });
        setIdProcessing(false);
      } else {
        // Extraction failed - trigger manual entry
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
    { name: "full_name", label: "Full Name", placeholder: "As shown on ID", required: true },
    { name: "id_number", label: "ID Number", placeholder: "Enter your ID number", required: true },
    { name: "date_of_birth", label: "Date of Birth", type: "date", required: true },
    { name: "address", label: "Residential Address", placeholder: "Full address", required: true, helper: "Must match your ID document" }
  ];

  const handleManualDataChange = (field, value) => {
    setManualData(prev => ({ ...prev, [field]: value }));
  };

  const handleManualSubmit = () => {
    setShowManualEntry(false);
    setIdExtracted(manualData);
  };

  const canProceed = (idExtracted || (showManualEntry && Object.keys(manualData).length >= 4)) && selfieVerified;

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
            labels={["Identity", "Phone", "Profile"]}
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-12 pb-8 max-w-md mx-auto">
        <OnboardingCard>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] flex items-center justify-center">
              <ScanFace className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1E3A5F]">Verify Your Identity</h1>
              <p className="text-sm text-[#64748B]">Quick and secure verification</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* ID Document Section */}
            <div>
              <h3 className="font-semibold text-[#1E3A5F] mb-3">Step 1: ID Document</h3>
              
              {!idFileUrl ? (
                <DocumentUpload
                  title="Upload ID Document"
                  instructions="Passport, Driver's License, or National ID"
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
                  message="Extracting data from your document..." 
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
                    disabled={Object.keys(manualData).length < 4}
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
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-[#1E3A5F]">Document Verified</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p className="text-[#64748B]"><span className="font-medium text-[#1E3A5F]">Name:</span> {idExtracted.name}</p>
                        <p className="text-[#64748B]"><span className="font-medium text-[#1E3A5F]">ID:</span> {idExtracted.idNumber}</p>
                        <p className="text-[#64748B]"><span className="font-medium text-[#1E3A5F]">DOB:</span> {idExtracted.dob}</p>
                        {idExtracted.address && (
                          <p className="text-[#64748B]"><span className="font-medium text-[#1E3A5F]">Address:</span> {idExtracted.address}</p>
                        )}
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
            {(idExtracted || showManualEntry) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-semibold text-[#1E3A5F] mb-3">Step 2: Selfie Verification</h3>
                
                {!selfieFileUrl ? (
                  <DocumentUpload
                    title="Take a Selfie"
                    instructions="Position your face in the center and ensure good lighting"
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
                    message="Verifying your identity with liveness check..." 
                  />
                ) : selfieVerified ? (
                  <ProcessingStatus 
                    status="success" 
                    message="Liveness check passed successfully" 
                  />
                ) : null}
              </motion.div>
            )}
          </div>

          {/* Security Notice */}
          <div className="mt-6 flex items-center gap-2 p-3 bg-[#F0F9FF] rounded-xl">
            <Shield className="w-4 h-4 text-[#0EA5E9]" />
            <span className="text-xs text-[#64748B]">Real-time fraud detection active</span>
          </div>
        </OnboardingCard>

        {/* Continue Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Link to={createPageUrl("KYCStep2")} className={!canProceed ? "pointer-events-none" : ""}>
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