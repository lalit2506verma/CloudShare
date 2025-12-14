export const subscriptionPlans = [
  {
    name: "Free",
    highlighted: false,
    description:
      "Perfect for getting started with basic cloud storage and simple file sharing.",
    price: 0,
    features: [
      { text: "5 File Upload", available: true },
      { text: "Basic file sharing", available: true },
      { text: "7-days file retention", available: true },
      { text: "No limit on File Size", available: false },
      { text: "Priority Upload", available: false },
      { text: "24×7 phone & email support", available: false },
    ],
    cta: "Let's Started"
  },
  {
    name: "Premium",
    highlighted: true,
    description:
      "Ideal for professionals who need more storage, faster transfers, and advanced sharing options.",
    price: 899,
    features: [
      { text: "1000 File Upload", available: true },
      { text: "200GB Cloud storage", available: true },
      { text: "Advanced file Sharing", available: true },
      { text: "30 Days file Retention", available: true },
      { text: "Priority Upload", available: false },
      { text: "24×7 phone & email support", available: false },
    ],
    cta: "Go Premium"
  },
  {
    name: "Ultimate",
    highlighted: false,
    description:
      "Best for teams and businesses with unlimited storage, priority support, and collaboration tools.",
    price: 2500,
    features: [
      { text: "Unlimited File Upload", available: true },
      { text: "Unlimited Cloud storage", available: true },
      { text: "Advanced File Sharing", available: true },
      { text: "Custom days file Retention", available: true },
      { text: "Priority Upload", available: true },
      { text: "24×7 phone & email support", available: true },
    ],
    cta: "Go Ultimate"
  },
];
