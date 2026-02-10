"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Car, Mail, User, Phone, MessageSquare, Send } from "lucide-react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function InquiryForm({ vehicleId, vehicleName }: { vehicleId?: string; vehicleName?: string }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicleInterest: vehicleName || "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Inquiry submitted successfully!");
    }, 1500);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="card p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-black text-white mb-6">Vehicle Inquiry</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            leftIcon={<User className="h-5 w-5" />}
            placeholder="John Doe"
            required
          />
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            leftIcon={<Mail className="h-5 w-5" />}
            placeholder="your@email.com"
            required
          />
        </div>

        <Input
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          leftIcon={<Phone className="h-5 w-5" />}
          placeholder="+1 234 567 8900"
          required
        />

        <Input
          label="Vehicle of Interest"
          name="vehicleInterest"
          value={formData.vehicleInterest}
          onChange={handleChange}
          error={errors.vehicleInterest}
          leftIcon={<Car className="h-5 w-5" />}
          placeholder="2020 Toyota Land Cruiser"
        />

        <Textarea
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          placeholder="Tell us about your requirements..."
          rows={5}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2"
        >
          {!isSubmitting && <Send className="h-4 w-4" />}
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </div>
    </motion.form>
  );
}
