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
  BarChart,
  Shield,
  UserPlus,
  AlertTriangle,
  Mail,
  BarChart2,
  PieChart,
  Clipboard,
  UserCog,
  Settings,
  Upload,
  ShieldCheck,
  HelpCircle,
  Phone,
  Book,
  Bell,
} from "lucide-react";

export const navigationItems = [
  {
    title: "Dashboard",
    items: [
      { title: "Dashboard", icon: Home, url: "/dashboard", isActive: true },
      { title: "Profile", icon: User, url: "/dashboard/profile" },
    ],
  },
  {
    title: "Academic",
    items: [
      {
        title: "Course Registration/Slip",
        icon: BookOpen,
        url: "/dashboard/course-registration",
      },
      {
        title: "Academic Records",
        icon: FileText,
        url: "/dashboard/academic-records",
      },
      {
        title: "Grades & Transcripts",
        icon: Award,
        url: "/dashboard/grades-transcripts",
      },
      { title: "Class Schedule", icon: Calendar, url: "#" },
      { title: "Assignments", icon: ClipboardList, url: "#" },
    ],
  },
  {
    title: "Student Services",
    items: [
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
];

export const registrarNavigationItems = [
  {
    title: "Dashboard",
    items: [
      { title: "Dashboard", icon: Home, url: "/registrar", isActive: true },
    ],
  },
  {
    title: "Academic Management",
    items: [
      { title: "Academic Year", icon: Calendar, url: "/registrar/acadamicYear" },
      { title: "Course Catalog", icon: BookOpen, url: "#" },
      /* {  title: "Class Scheduling", icon: Calendar, url: "#" }, */
      { title: "Grades & Transcripts", icon: Award, url: "#" },
      {
        title: "Grade Approval",
        icon: CheckCircle,
        url: "/registrar/grade-approval",
      },
      { title: "Degree Audit", icon: FileText, url: "#" },
      { title: "Assessments & Evaluations", icon: BarChart, url: "#" },
      { title: "Academic Policies", icon: Shield, url: "#" },
    ],
  },
  {
    title: "Student Management",
    items: [
      { title: "Student Profiles", icon: User, url: "#" },
      { title: "Enrollment", icon: UserPlus, url: "/registrar/enrollment" },
      {
        title: "Section Assignment",
        icon: Users,
        url: "/registrar/section-assignment",
      },
      { title: "Attendance", icon: CheckCircle, url: "#" },
      { title: "Discipline", icon: AlertTriangle, url: "#" },
    ],
  },
  {
    title: "Financial Management",
    items: [
      { title: "Billing & Payments", icon: CreditCard, url: "#" },
      { title: "Financial Aid", icon: DollarSign, url: "#" },
      { title: "Scholarships", icon: Star, url: "#" },
    ],
  },
  {
    title: "Communication",
    items: [
      { title: "Notice Board", icon: Bell, url: "/registrar/board" },
      { title: "Messaging", icon: Mail, url: "#" },
      { title: "Parent/Student Portal", icon: Users, url: "#" },
      { title: "Event Calendar", icon: Calendar, url: "#" },
    ],
  },
  {
    title: "Reports & Analytics",
    items: [
      { title: "Academic Reports", icon: BarChart2, url: "#" },
      { title: "Enrollment Reports", icon: PieChart, url: "#" },
      { title: "Attendance Reports", icon: Clipboard, url: "#" },
      { title: "Custom Reports", icon: FileText, url: "#" },
    ],
  },
  {
    title: "Administration",
    items: [
      { title: "User Management", icon: UserCog, url: "#" },
      { title: "System Settings", icon: Settings, url: "#" },
      { title: "Data Import/Export", icon: Upload, url: "#" },
      { title: "Compliance & Audit", icon: ShieldCheck, url: "#" },
    ],
  },
  {
    title: "Support & Resources",
    items: [
      { title: "Help Center", icon: HelpCircle, url: "#" },
      { title: "Contact Support", icon: Phone, url: "#" },
      { title: "Training Resources", icon: Book, url: "#" },
    ],
  },
];
