import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, FileText, X, AlertCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

export default function DocumentUpload({ 
  onUploadComplete, 
  onError,
  title = "Upload Document",
  instructions = "Ensure the document is well-lit and all text is visible"
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validate file
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file format. Please upload JPEG, PNG, or PDF.");
      onError?.("Invalid file format");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Maximum size is 10MB.");
      onError?.("File too large");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onUploadComplete(file_url, file);
    } catch (err) {
      const errorMsg = "Upload failed. Please try again.";
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="bg-[#F0F9FF] rounded-xl p-4 border border-[#0EA5E9]/20">
        <h3 className="font-semibold text-[#1E3A5F] mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#0EA5E9]" />
          {title}
        </h3>
        <p className="text-sm text-[#64748B] mb-3">{instructions}</p>
        <ul className="text-xs text-[#64748B] space-y-1 list-disc list-inside">
          <li>Good lighting - avoid shadows and glare</li>
          <li>All text must be clearly visible</li>
          <li>Document should be flat, not folded</li>
          <li>Supported formats: JPEG, PNG, PDF (max 10MB)</li>
        </ul>
      </div>

      {/* Upload Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="hidden"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,application/pdf"
          onChange={(e) => handleFileUpload(e.target.files[0])}
          className="hidden"
        />

        <Button
          onClick={() => cameraInputRef.current?.click()}
          disabled={uploading}
          className="h-24 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#0EA5E9] to-[#0284C7] hover:from-[#0284C7] hover:to-[#0369A1] text-white rounded-xl"
        >
          <Camera className="w-6 h-6" />
          <span className="text-sm font-medium">Take Photo</span>
        </Button>

        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          variant="outline"
          className="h-24 flex flex-col items-center justify-center gap-2 border-2 border-[#E2E8F0] hover:border-[#0EA5E9] hover:bg-[#F0F9FF] rounded-xl"
        >
          <Upload className="w-6 h-6 text-[#0EA5E9]" />
          <span className="text-sm font-medium text-[#1E3A5F]">Upload File</span>
        </Button>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Upload Failed</p>
              <p className="text-xs text-red-600 mt-1">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploading State */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-[#F0F9FF] rounded-xl p-4 flex items-center justify-center gap-3"
          >
            <div className="w-5 h-5 border-2 border-[#0EA5E9] border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium text-[#0284C7]">Uploading securely...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-[#64748B]">
        <Lock className="w-3 h-3 text-[#0EA5E9]" />
        <span>All uploads are encrypted and GDPR compliant</span>
      </div>
    </div>
  );
}