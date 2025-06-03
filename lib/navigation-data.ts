import {
  Home,
  BookOpen,
  FileText,
  Award,
  Calendar,
  ClipboardList,
  User,
  Building,
  UserCheck,
  Users,
  CreditCard,
  DollarSign,
  Star,
  BarChart3,
  Briefcase,
  TrendingUp,
  School,
  Download,
  CheckCircle,
  MapPin,
  GraduationCap,
} from "lucide-react"

export const navigationItems = [
  {
    title: "Academic",
    items: [
      { title: "Dashboard", icon: Home, url: "#", isActive: true },
      { title: "Course Registration", icon: BookOpen, url: "#" },
      { title: "Academic Records", icon: FileText, url: "#" },
      { title: "Grades & Transcripts", icon: Award, url: "#" },
      { title: "Class Schedule", icon: Calendar, url: "#" },
      { title: "Assignments", icon: ClipboardList, url: "#" },
    ],
  },
  {
    title: "Student Services",
    items: [
      { title: "Profile Management", icon: User, url: "#" },
      { title: "Dormitory", icon: Building, url: "#" },
      { title: "Library Services", icon: BookOpen, url: "#" },
      { title: "Health Services", icon: UserCheck, url: "#" },
      { title: "Counseling", icon: Users, url: "#" },
    ],
  },
  {
    title: "Financial",
    items: [
      { title: "Billing & Payments", icon: CreditCard, url: "#" },
      { title: "Financial Aid", icon: DollarSign, url: "#" },
      { title: "Scholarships", icon: Star, url: "#" },
      { title: "Fee Structure", icon: BarChart3, url: "#" },
    ],
  },
  {
    title: "Career & Placement",
    items: [
      { title: "Job Opportunities", icon: Briefcase, url: "#" },
      { title: "Internships", icon: TrendingUp, url: "#" },
      { title: "Career Counseling", icon: School, url: "#" },
      { title: "Alumni Network", icon: Users, url: "#" },
    ],
  },
  {
    title: "Administrative",
    items: [
      { title: "Document Requests", icon: Download, url: "#" },
      { title: "Clearances", icon: CheckCircle, url: "#" },
      { title: "Transfers", icon: MapPin, url: "#" },
      { title: "Readmissions", icon: GraduationCap, url: "#" },
    ],
  },
]
