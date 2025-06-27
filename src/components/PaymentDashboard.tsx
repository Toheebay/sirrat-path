
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Wallet,
  Bell,
  Building,
  Copy,
  MessageCircle,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PaymentDashboard = () => {
  const [paymentHistory] = useState([
    { id: 1, date: "2024-01-15", amount: 500000, status: "completed", method: "Bank Transfer", reference: "TXN001" },
    { id: 2, date: "2024-02-15", amount: 300000, status: "completed", method: "Bank Transfer", reference: "TXN002" },
    { id: 3, date: "2024-03-15", amount: 250000, status: "pending", method: "Bank Transfer", reference: "TXN003" },
    { id: 4, date: "2024-04-15", amount: 200000, status: "upcoming", method: "Bank Transfer", reference: "TXN004" },
  ]);

  const { toast } = useToast();

  const totalAmount = 9850000; // Updated total amount
  const paidAmount = 800000; // Amount already paid
  const progressPercentage = (paidAmount / totalAmount) * 100;
  const remainingAmount = totalAmount - paidAmount;
  const monthsRemaining = Math.ceil(remainingAmount / 200000); // Assuming 200k per month

  const bankDetails = {
    accountName: "Abdullateef Hajj and Umrah integrated Service Ltd.",
    bankName: "Lotus Bank",
    accountNumber: "1000019078"
  };

  const contactInfo = {
    whatsapp: ["+2347067412852", "+2348024764090"],
    email: "adebayoajani23@gmail.com"
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Account details copied to clipboard",
    });
  };

  const handleWhatsAppContact = (number: string) => {
    const message = encodeURIComponent(`Hello, I want to inquire about Hajj 2026 payment. My remaining balance is ₦${remainingAmount.toLocaleString()}`);
    window.open(`https://wa.me/${number.replace('+', '')}?text=${message}`, '_blank');
  };

  const handleEmailContact = () => {
    const subject = encodeURIComponent('Hajj 2026 Payment Inquiry');
    const body = encodeURIComponent(`Hello,\n\nI want to inquire about my Hajj 2026 payment.\nRemaining Balance: ₦${remainingAmount.toLocaleString()}\n\nThank you.`);
    window.open(`mailto:${contactInfo.email}?subject=${subject}&body=${body}`, '_blank');
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

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Remaining Balance</p>
                <p className="text-2xl font-bold">₦{remainingAmount.toLocaleString()}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-200" />
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
                        <p className="text-xs text-gray-500">Ref: {payment.reference}</p>
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

        {/* Bank Details & Contact */}
        <div className="space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5" />
                <span>Remaining Balance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <p className="text-3xl font-bold text-red-800">₦{remainingAmount.toLocaleString()}</p>
                  <p className="text-sm text-red-600">Pay Small Small - Anytime</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building className="w-5 h-5 text-blue-600" />
                <span>Bank Details</span>
              </CardTitle>
              <CardDescription>Make payments to this account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Account Name</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{bankDetails.accountName}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.accountName)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Bank Name</p>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{bankDetails.bankName}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.bankName)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-lg">{bankDetails.accountNumber}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(bankDetails.accountNumber)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-600 bg-yellow-50 p-3 rounded-lg">
                <p className="font-medium text-yellow-800 mb-1">⚠️ Important:</p>
                <p>Please include your name and phone number as payment reference when making transfers.</p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-800">📞 Contact Us</CardTitle>
              <CardDescription>Get in touch for payment updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-emerald-700 mb-2">WhatsApp:</p>
                {contactInfo.whatsapp.map((number, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full mb-2 border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                    onClick={() => handleWhatsAppContact(number)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {number}
                  </Button>
                ))}
              </div>
              
              <div>
                <p className="text-sm font-medium text-emerald-700 mb-2">Email:</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100"
                  onClick={handleEmailContact}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {contactInfo.email}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800">💡 Payment Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• Keep your payment receipts for records</li>
                <li>• Include your details as payment reference</li>
                <li>• Contact us immediately after payment</li>
                <li>• Pay regularly to complete on time</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;
