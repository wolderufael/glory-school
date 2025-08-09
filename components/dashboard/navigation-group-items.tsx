"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavigationGroupsProps {
  searchQuery: string;
}

import {
    Home,
    BookOpen,
    FileText,
    ChevronDown,
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
      title: "View Student Result",
      items: [
        {
          title: "Student Result",
          icon: Home,
          url: "/parent/result",
          isActive: true,
        },
      
      ],
    },


    {
        title: "Payment",
        items: [
          { title: "Payment", icon: Bell, url: "/parent/payment" },
            ],
      },
    
  ];
  

  



const NavigationsItem=({ searchQuery }: NavigationGroupsProps)=>{
    
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
        Academic: true,
      });
      const pathname = usePathname();
    
      const toggleGroup = (groupTitle: string) => {
        setOpenGroups((prev) => ({
          ...prev,
          [groupTitle]: !prev[groupTitle],
        }));
      };
    
      const filteredItems = navigationItems
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((group) => group.items.length > 0);
    
    
    return(
        <>
      {filteredItems.map((group) => (
        <Collapsible
          key={group.title}
          open={openGroups[group.title]}
          onOpenChange={() => toggleGroup(group.title)}
          className="group/collapsible"
        >
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-blue-700 font-bold hover:bg-blue-50 rounded-md px-2 py-1 transition-colors">
                {group.title}
                <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.url}
                        className="data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Link
                          href={item.url}
                          className="flex items-center gap-3"
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      ))}
    </>
  );
}


export default NavigationsItem