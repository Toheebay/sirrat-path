
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, MessageSquare, CheckCircle, Clock, Download, Reply } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  priority: string;
  status: string;
  admin_response: string | null;
  created_at: string;
  profiles: {
    username: string;
    email: string;
  } | null;
}

const AdminSupportManagement = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [responseText, setResponseText] = useState("");
  const [respondingTicket, setRespondingTicket] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchTickets();
    fetchStats();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select(`
          *,
          profiles!inner(username, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const validTickets = (data || [])
        .filter((ticket: any) => 
          ticket.profiles && 
          typeof ticket.profiles === 'object' && 
          'username' in ticket.profiles && 
          'email' in ticket.profiles
        )
        .map((ticket: any) => ({
          ...ticket,
          profiles: ticket.profiles as { username: string; email: string }
        })) as SupportTicket[];
      
      setTickets(validTickets);
    } catch (error: any) {
      console.error('Error fetching tickets:', error);
      toast({
        title: "Error",
        description: "Failed to fetch support tickets",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select('status');

      if (error) throw error;

      const total = data?.length || 0;
      const open = data?.filter(t => t.status === 'open').length || 0;
      const inProgress = data?.filter(t => t.status === 'in-progress').length || 0;
      const resolved = data?.filter(t => t.status === 'resolved').length || 0;

      setStats({ total, open, inProgress, resolved });
    } catch (error: any) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateTicketStatus = async (ticketId: string, status: string, adminResponse?: string) => {
    try {
      const { error } = await supabase
        .from('support_tickets')
        .update({ 
          status, 
          admin_response: adminResponse || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', ticketId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Ticket ${status} successfully`,
      });

      fetchTickets();
      fetchStats();
      setRespondingTicket(null);
      setResponseText("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update ticket",
        variant: "destructive",
      });
    }
  };

  const handleResponse = (ticketId: string) => {
    if (!responseText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a response",
        variant: "destructive",
      });
      return;
    }
    updateTicketStatus(ticketId, 'resolved', responseText);
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Ticket Management</h1>
        <p className="text-gray-600">Manage and respond to user support requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tickets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.open}</div>
            <div className="text-sm text-gray-600">Open</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Support Tickets</CardTitle>
          <CardDescription>Manage user support requests and responses</CardDescription>
        </CardHeader>
        <CardContent>
          {tickets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No support tickets found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{ticket.profiles?.username || 'N/A'}</div>
                        <div className="text-sm text-gray-500">{ticket.profiles?.email || 'N/A'}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium truncate">{ticket.subject}</div>
                        <div className="text-sm text-gray-500 truncate">{ticket.message}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(ticket.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(ticket.status)}
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{ticket.subject}</DialogTitle>
                              <DialogDescription>
                                From: {ticket.profiles?.username} ({ticket.profiles?.email})
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Message:</h4>
                                <p className="text-gray-700 bg-gray-50 p-3 rounded">{ticket.message}</p>
                              </div>
                              {ticket.admin_response && (
                                <div>
                                  <h4 className="font-medium mb-2">Admin Response:</h4>
                                  <p className="text-gray-700 bg-green-50 p-3 rounded">{ticket.admin_response}</p>
                                </div>
                              )}
                              <div className="flex gap-2">
                                <Badge className={getPriorityColor(ticket.priority)}>
                                  Priority: {ticket.priority}
                                </Badge>
                                <Badge className={getStatusColor(ticket.status)}>
                                  Status: {ticket.status}
                                </Badge>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {ticket.status !== 'resolved' && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm">
                                <Reply className="w-4 h-4 mr-1" />
                                Respond
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Respond to Ticket</DialogTitle>
                                <DialogDescription>
                                  Send a response to {ticket.profiles?.username}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium mb-2">Original Message:</h4>
                                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{ticket.message}</p>
                                </div>
                                <Textarea
                                  placeholder="Enter your response..."
                                  value={responseText}
                                  onChange={(e) => setResponseText(e.target.value)}
                                  rows={4}
                                />
                                <div className="flex space-x-2">
                                  <Button onClick={() => handleResponse(ticket.id)}>
                                    Send Response & Resolve
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    onClick={() => updateTicketStatus(ticket.id, 'in-progress')}
                                  >
                                    Mark In Progress
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSupportManagement;
