import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  ArrowUpRight, 
  Send, 
  QrCode, 
  History, 
  ShoppingCart, 
  GraduationCap, 
  Heart, 
  TrendingUp,
  Shirt,
  Sparkles,
  Smartphone,
  MoreHorizontal,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_69250fe19621d931963c448d/d68dbea49_Screenshot_2026-01-30_at_30833_PM-removebg-preview.png";

const quickActions = [
  { icon: ArrowUpRight, label: "Top up", color: "text-[#0EA5E9]" },
  { icon: Send, label: "Send", color: "text-[#0EA5E9]" },
  { icon: QrCode, label: "Request", color: "text-[#0EA5E9]" },
  { icon: History, label: "History", color: "text-[#0EA5E9]" },
];

const paymentOptions = [
  { icon: ShoppingCart, label: "Grocery" },
  { icon: GraduationCap, label: "Education" },
  { icon: Heart, label: "Healthcare" },
  { icon: TrendingUp, label: "Investments" },
  { icon: Shirt, label: "Fashion" },
  { icon: Sparkles, label: "Beauty" },
  { icon: Smartphone, label: "Gadgets" },
  { icon: MoreHorizontal, label: "More" },
];

export default function Home() {
  const [balance] = useState(450.54);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0EA5E9] via-[#0284C7] to-[#0369A1]">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div className="w-12 h-12 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#1E3A5F] flex items-center justify-center text-white font-bold">
              JD
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Pasa" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-bold text-white">pasa</span>
          </div>
          <Button variant="ghost" size="icon" className="text-white bg-white/10 rounded-full hover:bg-white/20">
            <Bell className="w-5 h-5" />
          </Button>
        </div>

        {/* Balance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-white/70 text-sm mb-1">Available Balance</p>
          <h1 className="text-5xl font-bold text-white">
            {balance.toFixed(2)} <span className="text-2xl font-normal text-white/80">HKD</span>
          </h1>
        </motion.div>
      </div>

      {/* Main Content Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-t-[2.5rem] min-h-[calc(100vh-220px)] px-6 pt-8 pb-24"
      >
        {/* Quick Actions */}
        <Card className="bg-white rounded-2xl shadow-lg shadow-[#0284C7]/10 p-4 mb-8 border-0">
          <div className="flex justify-around">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F0F9FF] flex items-center justify-center group-hover:bg-[#0EA5E9] transition-colors">
                  <action.icon className="w-6 h-6 text-[#0EA5E9] group-hover:text-white transition-colors" />
                </div>
                <span className="text-xs font-medium text-[#64748B]">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Payment Options */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-[#1E3A5F] mb-4">Payment Options</h2>
          <div className="grid grid-cols-4 gap-4">
            {paymentOptions.map((option, index) => (
              <motion.button
                key={option.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center group-hover:border-[#0EA5E9] group-hover:bg-[#F0F9FF] transition-all">
                  <option.icon className="w-6 h-6 text-[#64748B] group-hover:text-[#0EA5E9] transition-colors" />
                </div>
                <span className="text-xs text-[#64748B]">{option.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Promo Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1E3A5F]">Promo & Discount</h2>
            <Button variant="link" className="text-[#0EA5E9] p-0 h-auto font-medium">
              See more
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] rounded-2xl p-5 text-white"
          >
            <p className="text-sm opacity-90 mb-1">Special Offer</p>
            <h3 className="text-xl font-bold mb-2">Get 10% Cashback</h3>
            <p className="text-sm opacity-80">On your first transaction with Pasa</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] px-6 py-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {[
            { icon: "🏠", label: "Home", active: true },
            { icon: "🔍", label: "Explore", active: false },
            { icon: "📱", label: "Scan", active: false },
            { icon: "🎁", label: "Rewards", active: false },
            { icon: "👤", label: "Profile", active: false },
          ].map((item) => (
            <button 
              key={item.label}
              className={`flex flex-col items-center gap-1 ${item.active ? "text-[#0EA5E9]" : "text-[#94A3B8]"}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}