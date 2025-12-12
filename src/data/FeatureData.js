import { Cloud, Share2, Upload, Lock, Smartphone, Users } from "lucide-react";

export const features = [
  {
    icon: <Cloud className="h-6 w-6 text-indigo-600" />,
    context:
      "Securely store your files in the cloud with end‑to‑end encryption.",
  },
  {
    icon: <Share2 className="h-6 w-6 text-indigo-600" />,
    context: "Instantly share files with anyone using simple links.",
  },
  {
    icon: <Upload className="h-6 w-6 text-indigo-600" />,
    context: "Fast uploads and downloads optimized for all devices.",
  },
  {
    icon: <Lock className="h-6 w-6 text-indigo-600" />,
    context: "Advanced privacy controls to decide who can view or edit.",
  },
  {
    icon: <Smartphone className="h-6 w-6 text-indigo-600" />,
    context: "Access your files anytime, anywhere on mobile or desktop.",
  },
  {
    icon: <Users className="h-6 w-6 text-indigo-600" />,
    context: "Collaborate seamlessly with teams through shared folders.",
  },
];
