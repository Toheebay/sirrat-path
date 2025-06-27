
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  FileText,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Download
} from "lucide-react";

const AgentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const pilgrims = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+234 123 456 789",
      status: "approved",
      paymentStatus: "current",
      paidAmount: 500000,
      totalAmount: 2575000,
      registrationDate: "2024-01-15",
      documentsComplete: true
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+234 987 654 321",
      status: "pending",
      paymentStatus: "overdue",
      paidAmount: 200000,
      totalAmount: 2575000,
      registrationDate: "2024-01-20",
      documentsComplete: false
    },
    {
      id: 3,
      name: "Ahmed Ibrahim",
      email: "ahmed@example.com",
      phone: "+234 555 123 456",
      status: "approved",
      paymentStatus: "current",
      paidAmount: 1000000,
      totalAmount: 2575000,
      registrationDate: "2024-01-10",
      documentsComplete: true
    }
  ];

  const getStatusBadge = (status: string, type: 'status' | 'payment') => {
    if (type === 'status') {
      switch (status) {
        case 'approved':
          return <Badge className="bg-green-100 text-green-800">✓ Approved</Badge>;
        case 'pending':
          return <Badge className="bg-orange-100 text-orange-800">⏳ Pending</Badge>;
        case 'rejected':
          return <Badge className="bg-red-100 text-red-800">✗ Rejected</Badge>;
        default:
          return <Badge variant="outline">Unknown</Badge>;
      }
    } else {
      switch (status) {
        case 'current':
          return <Badge className="bg-emerald-100 text-emerald-800">💚 Current</Badge>;
        case 'overdue':
          return <Badge className="bg-red-100 text-red-800">⚠️ Overdue</Badge>;
        case 'completed':
          return <Badge className="bg-blue-100 text-blue-800">✓ Paid Full</Badge>;
        default:
          return <Badge variant="outline">Unknown</Badge>;
      }
    }
  };

  const stats = {
    totalPilgrims: pilgrims.length,
    approvedPilgrims: pilgrims.filter(p => p.status === 'approved').length,
    totalRevenue: pilgrims.reduce((sum, p) => sum + p.paidAmount, 0),
    pendingDocuments: pilgrims.filter(p => !p.documentsComplete).length
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-indigo-100 text-indigo-800">
          👥 Agent Dashboard
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Pilgrim Management</h1>
        <p className="text-gray-600">Manage your pilgrims and track performance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Pilgrims</p>
                <p className="text-2xl font-bold">{stats.totalPilgrims}</p>
              </div>
              <Users className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Approved</p>
                <p className="text-2xl font-bold">{stats.approvedPilgrims}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Pending Docs</p>
                <p className="text-2xl font-bold">{stats.pendingDocuments}</p>
              </div>
              <FileText className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pilgrims" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pilgrims">Pilgrim List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Actions</TabsTrigger>
        </TabsList>

        <TabsContent value="pilgrims" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <Input 
                    placeholder="Search pilgrims by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Pilgrim</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Pilgrims Table */}
          <Card>
            <CardHeader>
              <CardTitle>Pilgrim Management</CardTitle>
              <CardDescription>Manage and track your pilgrims' progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pilgrims.map((pilgrim) => (
                  <div key={pilgrim.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="grid md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h4 className="font-medium text-gray-900">{pilgrim.name}</h4>
                        <p className="text-sm text-gray-600">{pilgrim.email}</p>
                        <p className="text-sm text-gray-600">{pilgrim.phone}</p>
                      </div>
                      
                      <div className="text-center">
                        {getStatusBadge(pilgrim.status, 'status')}
                      </div>
                      
                      <div className="text-center">
                        {getStatusBadge(pilgrim.paymentStatus, 'payment')}
                      </div>
                      
                      <div className="text-center">
                        <p className="font-medium">₦{pilgrim.paidAmount.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">
                          of ₦{pilgrim.totalAmount.toLocaleString()}
                        </p>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Registration Trends</CardTitle>
                <CardDescription>Pilgrim registrations over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  📊 Chart visualization would go here
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Performance</CardTitle>
                <CardDescription>Payment collection analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  💰 Payment analytics would go here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>Generate detailed reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Pilgrim Status Report", description: "Complete status overview" },
                  { name: "Payment Collection Report", description: "Payment tracking and analysis" },
                  { name: "Document Compliance Report", description: "Document verification status" },
                  { name: "Performance Summary", description: "Agent performance metrics" }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{report.name}</h4>
                      <p className="text-sm text-gray-600">{report.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                    <span className="font-medium">Conversion Rate</span>
                    <span className="text-emerald-600 font-bold">85%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Average Payment Time</span>
                    <span className="text-blue-600 font-bold">18 months</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Document Approval Rate</span>
                    <span className="text-purple-600 font-bold">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Operations</CardTitle>
              <CardDescription>Perform actions on multiple pilgrims at once</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Bulk Invitations</h4>
                  <div className="space-y-3">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      📧 Send Bulk Email Invitations
                    </Button>
                    <Button variant="outline" className="w-full">
                      📱 Send SMS Reminders
                    </Button>
                    <Button variant="outline" className="w-full">
                      💬 WhatsApp Notifications
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Bulk Actions</h4>
                  <div className="space-y-3">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      📊 Export All Data
                    </Button>
                    <Button variant="outline" className="w-full">
                      📋 Generate Bulk Reports
                    </Button>
                    <Button variant="outline" className="w-full">
                      ⚙️ Update Payment Schedules
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentDashboard;
