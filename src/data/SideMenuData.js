import { BadgeCheck, Files, LayoutDashboard, Receipt, SubscriptIcon, Upload } from "lucide-react";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard"
  },
  {
    id: "02",
    label: "Upload",
    icon: Upload,
    path: "/upload"
  },
  {
    id: "03",
    label: "MyFiles",
    icon: Files,
    path: "/my-files"
  },
  {
    id: "04",
    label: "Subscription",
    icon: BadgeCheck,
    path: "/subscription"
  },
  {
    id: "05",
    label: "Transactions",
    icon: Receipt,
    path: "/transactions"
  }
]