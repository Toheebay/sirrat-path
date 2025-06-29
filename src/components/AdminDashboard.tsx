
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, CreditCard, FileText, Bell, BarChart3, Settings, Shield, Database, MessageSquare, Download } from "lucide-react";

interface AdminDashboardProps {
  setActiveTab?: (tab: string) => void;
}

const AdminDashboard = ({ setActiveTab }: AdminDashboardProps) => {
  const stats = [
    { title: "Total Pilgrims", value: "2,543", change: "+12%", icon: Users, color: "text-blue-600" },
    { title: "Payments Received", value: "₦2.1B", change: "+8%", icon: CreditCard, color: "text-green-600" },
    { title: "Pending Documents", value: "89", change: "-5%", icon: FileText, color: "text-orange-600" },
    { title: "Active Agents", value: "156", change: "+3%", icon: Shield, color: "text-purple-600" },
  ];

  const recentActivities = [
    { action: "New pilgrim registration", user: "Ahmed Bello", time: "2 minutes ago" },
    { action: "Payment received", user: "Fatima Hassan", amount: "₦500,000", time: "5 minutes ago" },
    { action: "Document verified", user: "Ibrahim Musa", time: "10 minutes ago" },
    { action: "Agent approved", user: "Khadija Abubakar", time: "15 minutes ago" },
  ];

  const managementSections = [
    { 
      title: "User Management", 
      description: "Manage pilgrims, agents, and permissions", 
      icon: Users,
      action: () => setActiveTab?.("users")
    },
    { 
      title: "Payment Oversight", 
      description: "Monitor all payments and financial reports", 
      icon: CreditCard,
      action: () => setActiveTab?.("payments")
    },
    { 
      title: "Support Management", 
      description: "Manage support tickets and user queries", 
      icon: MessageSquare,
      action: () => setActiveTab?.("support-management")
    },
    { 
      title: "Document Review", 
      description: "Review and approve submitted documents", 
      icon: FileText,
      action: () => setActiveTab?.("documents")
    },
    { 
      title: "System Settings", 
      description: "Configure platform settings and features", 
      icon: Settings,
      action: () => setActiveTab?.("settings")
    },
    { 
      title: "Reports & Analytics", 
      description: "View detailed analytics and reports", 
      icon: BarChart3,
      action: () => setActiveTab?.("analytics")
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage and oversee the entire Hajj platform</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {managementSections.map((section, index) => (
          <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <section.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm text-gray-600 mb-4">
                {section.description}
              </CardDescription>
              <Button variant="outline" className="w-full" onClick={section.action}>
                Manage
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activities */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-emerald-600" />
            <span>Recent Activities</span>
          </CardTitle>
          <CardDescription>Latest platform activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">
                    {activity.user} {activity.amount && `• ${activity.amount}`}
                  </p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.time}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
