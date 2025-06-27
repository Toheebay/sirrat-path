
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Calendar, 
  CreditCard,
  FileText,
  Plane,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";

const NotificationCenter = () => {
  const [notifications] = useState([
    {
      id: 1,
      type: "payment",
      title: "Payment Due Reminder",
      message: "Your monthly payment of ₦100,000 is due in 3 days (March 15, 2024)",
      timestamp: "2024-03-12T10:30:00Z",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      type: "document",
      title: "Document Approved",
      message: "Your International Passport has been verified and approved",
      timestamp: "2024-03-11T14:20:00Z",
      read: true,
      priority: "medium"
    },
    {
      id: 3,
      type: "visa",
      title: "Visa Status Update",
      message: "Your visa application is under review. Expected processing time: 5-7 days",
      timestamp: "2024-03-10T09:15:00Z",
      read: false,
      priority: "medium"
    },
    {
      id: 4,
      type: "training",
      title: "Hajj Orientation Schedule",
      message: "Mandatory Hajj orientation scheduled for March 20, 2024 at 2:00 PM",
      timestamp: "2024-03-09T16:45:00Z",
      read: true,
      priority: "high"
    },
    {
      id: 5,
      type: "flight",
      title: "Flight Information",
      message: "Your flight booking is confirmed. Flight details will be shared 30 days before departure",
      timestamp: "2024-03-08T11:30:00Z",
      read: false,
      priority: "low"
    }
  ]);

  const [settings, setSettings] = useState({
    email: true,
    sms: true,
    whatsapp: false,
    push: true,
    paymentReminders: true,
    documentUpdates: true,
    visaUpdates: true,
    flightUpdates: true,
    trainingSchedules: true
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-5 h-5 text-emerald-600" />;
      case 'document':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'visa':
        return <CheckCircle className="w-5 h-5 text-purple-600" />;
      case 'training':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case 'flight':
        return <Plane className="w-5 h-5 text-indigo-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">🔴 High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800">🟡 Medium</Badge>;
      case 'low':
        return <Badge className="bg-gray-100 text-gray-800">⚪ Low</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-orange-100 text-orange-800">
          🔔 Notification Center
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Updates & Notifications</h1>
        <p className="text-gray-600">Stay updated on your Hajj journey progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
              <Bell className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Payment Alerts</p>
                <p className="text-2xl font-bold">{notifications.filter(n => n.type === 'payment').length}</p>
              </div>
              <CreditCard className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Document Updates</p>
                <p className="text-2xl font-bold">{notifications.filter(n => n.type === 'document').length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Travel Updates</p>
                <p className="text-2xl font-bold">{notifications.filter(n => n.type === 'flight' || n.type === 'visa').length}</p>
              </div>
              <Plane className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="notifications">All Notifications</TabsTrigger>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Notifications</CardTitle>
                <CardDescription>
                  {unreadCount} unread notifications
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Mark All Read</Button>
                <Button variant="outline" size="sm">Clear All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg transition-colors ${
                      !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                              {notification.title}
                              {!notification.read && <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                          </div>
                          
                          <div className="flex flex-col items-end space-y-2 ml-4">
                            {getPriorityBadge(notification.priority)}
                            <span className="text-xs text-gray-500">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-3">
                          {!notification.read && (
                            <Button variant="outline" size="sm">
                              Mark as Read
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="w-5 h-5" />
                  <span>Communication Preferences</span>
                </CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Notifications</Label>
                    <p className="text-sm text-gray-600">Receive updates via email</p>
                  </div>
                  <Switch 
                    id="email"
                    checked={settings.email}
                    onCheckedChange={(checked) => setSettings({...settings, email: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="sms">SMS Notifications</Label>
                    <p className="text-sm text-gray-600">Receive SMS alerts</p>
                  </div>
                  <Switch 
                    id="sms"
                    checked={settings.sms}
                    onCheckedChange={(checked) => setSettings({...settings, sms: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="whatsapp">WhatsApp Messages</Label>
                    <p className="text-sm text-gray-600">Receive WhatsApp updates</p>
                  </div>
                  <Switch 
                    id="whatsapp"
                    checked={settings.whatsapp}
                    onCheckedChange={(checked) => setSettings({...settings, whatsapp: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="push">Push Notifications</Label>
                    <p className="text-sm text-gray-600">Browser/app notifications</p>
                  </div>
                  <Switch 
                    id="push"
                    checked={settings.push}
                    onCheckedChange={(checked) => setSettings({...settings, push: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notification Types</span>
                </CardTitle>
                <CardDescription>Customize which updates you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="payment-reminders">Payment Reminders</Label>
                    <p className="text-sm text-gray-600">Due dates and overdue alerts</p>
                  </div>
                  <Switch 
                    id="payment-reminders"
                    checked={settings.paymentReminders}
                    onCheckedChange={(checked) => setSettings({...settings, paymentReminders: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="document-updates">Document Updates</Label>
                    <p className="text-sm text-gray-600">Approval and rejection notices</p>
                  </div>
                  <Switch 
                    id="document-updates"
                    checked={settings.documentUpdates}
                    onCheckedChange={(checked) => setSettings({...settings, documentUpdates: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="visa-updates">Visa Updates</Label>
                    <p className="text-sm text-gray-600">Visa processing status</p>
                  </div>
                  <Switch 
                    id="visa-updates"
                    checked={settings.visaUpdates}
                    onCheckedChange={(checked) => setSettings({...settings, visaUpdates: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="flight-updates">Flight Updates</Label>
                    <p className="text-sm text-gray-600">Travel and flight information</p>
                  </div>
                  <Switch 
                    id="flight-updates"
                    checked={settings.flightUpdates}
                    onCheckedChange={(checked) => setSettings({...settings, flightUpdates: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="training-schedules">Training Schedules</Label>
                    <p className="text-sm text-gray-600">Orientation and training dates</p>
                  </div>
                  <Switch 
                    id="training-schedules"
                    checked={settings.trainingSchedules}
                    onCheckedChange={(checked) => setSettings({...settings, trainingSchedules: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-emerald-50 border-emerald-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
                <div>
                  <h4 className="font-semibold text-emerald-900">Settings Saved</h4>
                  <p className="text-emerald-700">Your notification preferences have been updated successfully.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
