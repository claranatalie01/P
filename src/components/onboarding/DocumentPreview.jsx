import { useState } from "react";
import { motion } from "framer-motion";
import { X, Check, RotateCw, ZoomIn, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DocumentPreview({ fileUrl, fileName, onConfirm, onRetake }) {
  const [zoomed, setZoomed] = useState(false);
  const isPdf = fileName?.toLowerCase().endsWith('.pdf');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl border-2 border-[#E2E8F0] overflow-hidden"
    >
      {/* Preview Header */}
      <div className="bg-[#F8FAFC] px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
        <h3 className="font-semibold text-[#1E3A5F] text-sm">Preview Document</h3>
        {!isPdf && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setZoomed(!zoomed)}
            className="h-8 w-8"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Preview Content */}
      <div className="relative bg-[#F8FAFC] p-4">
        {isPdf ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-sm font-medium text-[#1E3A5F] mb-1">PDF Document</p>
            <p className="text-xs text-[#64748B] text-center">{fileName}</p>
            <a 
              href={fileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 text-xs text-[#0EA5E9] hover:underline"
            >
              Open to preview
            </a>
          </div>
        ) : (
          <div className={`transition-all duration-300 ${zoomed ? 'scale-125' : 'scale-100'}`}>
            <img
              src={fileUrl}
              alt="Document preview"
              className="w-full h-auto rounded-lg shadow-lg max-h-96 object-contain"
            />
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="px-4 py-3 bg-[#F0F9FF] border-t border-[#0EA5E9]/20">
        <p className="text-xs text-[#64748B] text-center">
          Please verify that all text is clearly visible and readable
        </p>
      </div>

      {/* Action Buttons */}
      <div className="p-4 flex gap-3">
        <Button
          variant="outline"
          onClick={onRetake}
          className="flex-1 h-12 rounded-xl border-2 border-[#E2E8F0] hover:border-[#64748B] hover:bg-[#F8FAFC]"
        >
          <RotateCw className="w-4 h-4 mr-2" />
          Retake
        </Button>
        <Button
          onClick={onConfirm}
          className="flex-1 h-12 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white rounded-xl"
        >
          <Check className="w-4 h-4 mr-2" />
          Confirm
        </Button>
      </div>
    </motion.div>
  );
}