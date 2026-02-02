import { motion } from "framer-motion";
import { AlertCircle, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ManualEntryForm({ formData, onChange, fields }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Info Message */}
      <div className="bg-[#FEF3C7] border border-[#F59E0B]/20 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[#92400E]">Manual Entry Mode</p>
          <p className="text-xs text-[#92400E]/80 mt-1">
            Auto-extraction wasn't successful. Please enter your details manually.
            Your data remains encrypted and secure.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <Label htmlFor={field.name} className="text-sm font-medium text-[#1E3A5F] mb-2">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.name}
              type={field.type || "text"}
              placeholder={field.placeholder}
              value={formData[field.name] || ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="h-12 rounded-xl border-[#E2E8F0] focus:border-[#0EA5E9] focus:ring-[#0EA5E9]/20 mt-2"
            />
            {field.helper && (
              <p className="text-xs text-[#64748B] mt-1">{field.helper}</p>
            )}
          </div>
        ))}
      </div>

      {/* Security Notice */}
      <div className="flex items-center gap-2 p-3 bg-[#F0F9FF] rounded-xl">
        <Shield className="w-4 h-4 text-[#0EA5E9]" />
        <span className="text-xs text-[#64748B]">All information is encrypted and securely stored</span>
      </div>
    </motion.div>
  );
}