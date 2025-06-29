import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Phone, Mail, Send, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  priority: string;
  status: string;
  admin_response: string;
  created_at: string;
}

const SupportChat = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [fetchingTickets, setFetchingTickets] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('support_tickets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error: any) {
      console.error('Error fetching tickets:', error);
    } finally {
      setFetchingTickets(false);
    }
  };

  const sendNotificationEmail = async (userEmail: string, userName: string, ticketData: any) => {
    try {
      const response = await fetch('https://gluzzrbvqogiwvqdmdxh.supabase.co/functions/v1/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsdXp6cmJ2cW9naXd2cWRtZHgiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc1MTA4ODkwNSwiZXhwIjoyMDY2NjY0OTA1fQ.9QlERgg3wpt5Dkp8XnHwfeaXMVIRAKqzeu5dkoxWKYU`,
        },
        body: JSON.stringify({
          type: 'ticket',
          userEmail,
          userName,
          data: ticketData
        }),
      });

      if (!response.ok) {
        console.error('Failed to send notification email');
      }
    } catch (error) {
      console.error('Error sending notification email:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      // Get user profile for name
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      const { error } = await supabase
        .from('support_tickets')
        .insert([
          {
            user_id: user.id,
            subject,
            message,
            priority,
            status: 'open'
          }
        ]);

      if (error) throw error;

      // Send notification email
      await sendNotificationEmail(
        user.email || '',
        profile?.username || 'Unknown User',
        {
          subject,
          message,
          priority
        }
      );

      toast({
        title: "Support Ticket Created",
        description: "We'll get back to you soon. Admin has been notified via email.",
      });

      setSubject("");
      setMessage("");
      setPriority("medium");
      fetchTickets();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-orange-100 text-orange-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Get Help & Support</h1>
        <p className="text-gray-600">We're here to help with your Hajj journey</p>
      </div>

      {/* Contact Methods */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <Phone className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">WhatsApp & Phone</h3>
            <p className="text-emerald-600 font-medium">+2347067412852</p>
            <p className="text-sm text-gray-600 mt-1">Available 24/7</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-blue-600 font-medium">adebayoajani23@toheebay.online</p>
            <p className="text-sm text-gray-600 mt-1">Response within 24 hours</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Support Ticket</h3>
            <p className="text-purple-600 font-medium">Create a Ticket</p>
            <p className="text-sm text-gray-600 mt-1">Track your request</p>
          </CardContent>
        </Card>
      </div>

      {/* Support Ticket Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <span>Create Support Ticket</span>
          </CardTitle>
          <CardDescription>
            Submit your question or issue and we'll respond via email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your issue in detail..."
                rows={4}
                required
              />
            </div>
            
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit Ticket"}
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Previous Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Your Support Tickets</CardTitle>
          <CardDescription>Track the status of your submitted tickets</CardDescription>
        </CardHeader>
        <CardContent>
          {fetchingTickets ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600 mx-auto"></div>
            </div>
          ) : tickets.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No support tickets yet</p>
          ) : (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{ticket.subject}</h4>
                    <div className="flex space-x-2">
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status === 'resolved' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {ticket.status === 'in-progress' && <Clock className="w-3 h-3 mr-1" />}
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{ticket.message}</p>
                  {ticket.admin_response && (
                    <div className="bg-green-50 p-3 rounded mt-2">
                      <p className="text-sm font-medium text-green-800">Admin Response:</p>
                      <p className="text-sm text-green-700">{ticket.admin_response}</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(ticket.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportChat;
