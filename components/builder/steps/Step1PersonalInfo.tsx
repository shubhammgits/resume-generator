"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Globe, Github, Linkedin, Mail, MapPin, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { personalInfoSchema } from "@/lib/validation";
import { useResumeStore } from "@/store/resumeStore";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
};

interface StepProps {
  externalErrors?: Record<string, string>;
  shake?: boolean;
}

export default function Step1PersonalInfo({ externalErrors = {}, shake = false }: StepProps) {
  const personal = useResumeStore((state) => state.personal);
  const updatePersonal = useResumeStore((state) => state.updatePersonal);

  const {
    register,
    watch,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onChange",
    defaultValues: personal
  });

  useEffect(() => {
    reset(personal);
  }, [personal, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      updatePersonal(value as Partial<FormValues>);
    });
    return () => subscription.unsubscribe();
  }, [watch, updatePersonal]);

  const getError = (field: keyof FormValues) => errors[field]?.message || externalErrors[field] || "";

  const fields: Array<{ key: keyof FormValues; label: string; placeholder?: string; icon: React.ComponentType<{ className?: string }>; full?: boolean }> = [
    { key: "fullName", label: "Full Name*", icon: User, full: true },
    { key: "email", label: "Email*", icon: Mail, full: true },
    { key: "phone", label: "Phone*", icon: Phone, full: true },
    {
      key: "linkedin",
      label: "LinkedIn",
      icon: Linkedin,
      placeholder: "https://linkedin.com/in/yourhandle"
    },
    {
      key: "github",
      label: "GitHub",
      icon: Github,
      placeholder: "https://github.com/yourusername"
    },
    { key: "portfolio", label: "Portfolio", icon: Globe },
    { key: "location", label: "Location", icon: MapPin }
  ];

  return (
    <motion.div animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }} transition={{ duration: 0.3 }} className="resume-card">
      <h2 className="mb-6 flex items-center gap-2 text-[22px] font-bold gradient-text">
        <User className="h-5 w-5 text-accent" />
        Personal Information
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map((field) => {
          const Icon = field.icon;
          const error = getError(field.key);
          return (
            <div key={field.key} className={field.full ? "md:col-span-2" : ""} data-field={field.key}>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">{field.label}</label>
              <div className="input-shell">
                <Icon className="h-4 w-4" />
                <Input className="pl-9" placeholder={field.placeholder} {...register(field.key)} />
              </div>
              {error ? <p className="field-error">{error}</p> : null}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
