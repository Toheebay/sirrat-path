
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock,
  User,
  Send,
  Paperclip,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SupportChat = () => {
  const [message, setMessage] = useState("");
  const [chatHistory] = useState([
    {
      id: 1,
      sender: "support",
      message: "Hello! Welcome to Hajj Pathway Support. How can I assist you today?",
      timestamp: "2024-03-12T09:00:00Z",
      status: "delivered"
    },
    {
      id: 2,
      sender: "user",
      message: "Hi, I have a question about my payment schedule. Can I change my monthly payment amount?",
      timestamp: "2024-03-12T09:02:00Z",
      status: "delivered"
    },
    {
      id: 3,
      sender: "support",
      message: "Yes, you can modify your payment schedule. Let me help you with that. What would you like to change your monthly payment to?",
      timestamp: "2024-03-12T09:03:00Z",
      status: "delivered"
    },
    {
      id: 4,
      sender: "user",
      message: "I'd like to increase it to ₦150,000 per month to finish payments earlier.",
      timestamp: "2024-03-12T09:05:00Z",
      status: "delivered"
    },
    {
      id: 5,
      sender: "support",
      message: "That's a great decision! I'll update your payment schedule to ₦150,000 monthly. This will reduce your payment period to approximately 17 months. I'll send you the updated schedule shortly.",
      timestamp: "2024-03-12T09:07:00Z",
      status: "delivered"
    }
  ]);

  const [tickets] = useState([
    {
      id: "TKT-001",
      subject: "Payment Schedule Change Request",
      status: "resolved",
      priority: "medium",
      created: "2024-03-12T09:00:00Z",
      updated: "2024-03-12T10:30:00Z"
    },
    {
      id: "TKT-002",
      subject: "Document Upload Issue",
      status: "in-progress",
      priority: "high",
      created: "2024-03-11T14:20:00Z",
      updated: "2024-03-12T08:15:00Z"
    },
    {
      id: "TKT-003",
      subject: "Visa Status Inquiry",
      status: "open",
      priority: "low",
      created: "2024-03-10T16:45:00Z",
      updated: "2024-03-10T16:45:00Z"
    }
  ]);

  const { toast } = useToast();

  const handleSendMessage = () => {
    if (message.trim()) {
      toast({
        title: "Message Sent",
        description: "Your message has been sent to our support team.",
      });
      setMessage("");
    }
  };

  const handleWhatsAppSupport = () => {
    window.open("https://wa.me/2348123456789?text=Hello, I need help with my Hajj application", "_blank");
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">✓ Resolved</Badge>;
      case 'in-progress':
        return <Badge className="bg-orange-100 text-orange-800">⏳ In Progress</Badge>;
      case 'open':
        return <Badge className="bg-blue-100 text-blue-800">🔓 Open</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
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

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-green-100 text-green-800">
          💬 Support Center
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Get Help & Support</h1>
        <p className="text-gray-600">We're here to help you with your Hajj journey</p>
      </div>

      {/* Contact Options */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white cursor-pointer hover:shadow-lg transition-shadow" onClick={handleWhatsAppSupport}>
          <CardContent className="p-6 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-green-100" />
            <h3 className="text-xl font-bold mb-2">WhatsApp Support</h3>
            <p className="text-green-100 mb-4">Chat with us instantly</p>
            <Badge className="bg-white text-green-600">Available 24/7</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6 text-center">
            <Phone className="w-12 h-12 mx-auto mb-4 text-blue-100" />
            <h3 className="text-xl font-bold mb-2">Phone Support</h3>
            <p className="text-blue-100 mb-4">+234 123 456 7890</p>
            <Badge className="bg-white text-blue-600">9 AM - 6 PM</Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-purple-100" />
            <h3 className="text-xl font-bold mb-2">Email Support</h3>
            <p className="text-purple-100 mb-4">support@hajjpathway.com</p>
            <Badge className="bg-white text-purple-600">24-48 hr response</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chat">Live Chat</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Form</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="h-96">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Support Agent</CardTitle>
                        <CardDescription className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Online</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800">Active Chat</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="h-64 overflow-y-auto p-4 space-y-4">
                    {chatHistory.map((chat) => (
                      <div key={chat.id} className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          chat.sender === 'user' 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{chat.message}</p>
                          <p className={`text-xs mt-1 ${
                            chat.sender === 'user' ? 'text-emerald-100' : 'text-gray-500'
                          }`}>
                            {formatTimestamp(chat.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button variant="outline" size="icon">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button onClick={handleSendMessage} className="bg-emerald-600 hover:bg-emerald-700">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    💳 Payment Issues
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    📄 Document Problems
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    ✈️ Travel Questions
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    📋 Account Issues
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-800 flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Response Times</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-orange-700">
                    <div className="flex justify-between">
                      <span>Live Chat:</span>
                      <span className="font-medium">~2 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>WhatsApp:</span>
                      <span className="font-medium">~5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-medium">24-48 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tickets" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Support Tickets</CardTitle>
                <CardDescription>Track your support requests</CardDescription>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Create New Ticket
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium">{ticket.id}</h4>
                        {getStatusBadge(ticket.status)}
                        {getPriorityBadge(ticket.priority)}
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                    <h5 className="font-medium text-gray-900 mb-2">{ticket.subject}</h5>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Created: {new Date(ticket.created).toLocaleDateString()}</span>
                      <span>Updated: {new Date(ticket.updated).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    question: "Can I change my payment schedule?",
                    answer: "Yes, you can modify your payment schedule at any time through your dashboard or by contacting support."
                  },
                  {
                    question: "What payment methods are accepted?",
                    answer: "We accept Paystack, Flutterwave, bank transfers, and direct debit."
                  },
                  {
                    question: "What happens if I miss a payment?",
                    answer: "You'll receive reminders and a grace period. Contact support to discuss options."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <h5 className="font-medium text-gray-900 mb-2">{faq.question}</h5>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    question: "Which documents are required?",
                    answer: "International passport, vaccination certificate, passport photo, NIN certificate are mandatory."
                  },
                  {
                    question: "How long does document verification take?",
                    answer: "Usually 2-3 business days for standard processing."
                  },
                  {
                    question: "Can I upload documents later?",
                    answer: "Yes, but all documents must be submitted before the deadline for processing."
                  }
                ].map((faq, index) => (
                  <div key={index} className="border-b pb-3 last:border-b-0">
                    <h5 className="font-medium text-gray-900 mb-2">{faq.question}</h5>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Contact Support Team</CardTitle>
              <CardDescription>Send us a detailed message and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input placeholder="Brief description of your issue" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea 
                  placeholder="Please provide detailed information about your issue or question..."
                  rows={6}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Priority Level</label>
                <select className="w-full p-2 border rounded-md">
                  <option value="low">Low - General inquiry</option>
                  <option value="medium">Medium - Issue affecting service</option>
                  <option value="high">High - Urgent issue</option>
                </select>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 py-3">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportChat;
