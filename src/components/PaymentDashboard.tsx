
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Wallet,
  Bell
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentDashboard = () => {
  const [paymentHistory] = useState([
    { id: 1, date: "2024-01-15", amount: 100000, status: "completed", method: "Paystack" },
    { id: 2, date: "2024-02-15", amount: 100000, status: "completed", method: "Bank Transfer" },
    { id: 3, date: "2024-03-15", amount: 100000, status: "pending", method: "Paystack" },
    { id: 4, date: "2024-04-15", amount: 100000, status: "upcoming", method: "Auto-debit" },
  ]);

  const { toast } = useToast();

  const totalAmount = 2575000;
  const paidAmount = 200000;
  const progressPercentage = (paidAmount / totalAmount) * 100;
  const remainingAmount = totalAmount - paidAmount;
  const monthsRemaining = Math.ceil(remainingAmount / 100000);

  const handlePayNow = () => {
    toast({
      title: "Payment Initiated",
      description: "Redirecting to payment gateway...",
    });
  };

  const handleSetupReminder = () => {
    toast({
      title: "Reminder Set",
      description: "You'll receive payment reminders 3 days before due date.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-blue-100 text-blue-800">
          💳 Payment Dashboard
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Management</h1>
        <p className="text-gray-600">Track your Hajj payment progress and manage installments</p>
      </div>

      {/* Payment Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Total Amount</p>
                <p className="text-2xl font-bold">₦{totalAmount.toLocaleString()}</p>
              </div>
              <Wallet className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Amount Paid</p>
                <p className="text-2xl font-bold">₦{paidAmount.toLocaleString()}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Remaining</p>
                <p className="text-2xl font-bold">₦{remainingAmount.toLocaleString()}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Months Left</p>
                <p className="text-2xl font-bold">{monthsRemaining}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Progress */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <span>Payment Progress</span>
          </CardTitle>
          <CardDescription>
            You've completed {Math.round(progressPercentage)}% of your payment plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-emerald-600 font-bold">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₦{paidAmount.toLocaleString()} paid</span>
              <span>₦{remainingAmount.toLocaleString()} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Payment Schedule */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Schedule</CardTitle>
              <CardDescription>Your upcoming and completed payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        payment.status === 'completed' ? 'bg-green-100' :
                        payment.status === 'pending' ? 'bg-orange-100' : 'bg-gray-100'
                      }`}>
                        {payment.status === 'completed' ? 
                          <CheckCircle className="w-5 h-5 text-green-600" /> :
                          payment.status === 'pending' ? 
                          <AlertCircle className="w-5 h-5 text-orange-600" /> :
                          <Clock className="w-5 h-5 text-gray-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">₦{payment.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{payment.date} • {payment.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={payment.status === 'completed' ? 'default' : 'secondary'}
                        className={
                          payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                          payment.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }
                      >
                        {payment.status === 'completed' ? '✓ Paid' :
                         payment.status === 'pending' ? '⏰ Due' : '📅 Upcoming'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-orange-800 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Next Payment Due</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <p className="text-2xl font-bold text-orange-800">₦100,000</p>
                  <p className="text-sm text-orange-600">Due: March 15, 2024</p>
                </div>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={handlePayNow}
                >
                  💳 Pay Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-orange-300 text-orange-700 hover:bg-orange-100"
                  onClick={handleSetupReminder}
                >
                  🔔 Set Reminder
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Paystack</p>
                    <p className="text-xs text-gray-600">Primary</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Bank Transfer</p>
                    <p className="text-xs text-gray-600">Secondary</p>
                  </div>
                </div>
                <Badge variant="outline">Backup</Badge>
              </div>

              <Button variant="outline" className="w-full mt-4">
                + Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800">💡 Payment Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-emerald-700 space-y-2">
                <li>• Set up auto-debit for hassle-free payments</li>
                <li>• Pay early to avoid late fees</li>
                <li>• Keep payment receipts for records</li>
                <li>• Contact support for payment issues</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;
