import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Payment {
  id: string;
  user_id: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  reference_number: string;
  agent_code: string;
  receipt_url: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
  profiles: {
    username: string;
    email: string;
  };
}

const AdminPaymentsList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    verified: 0,
    pending: 0,
    rejected: 0,
    totalAmount: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
    fetchStats();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          profiles!inner(username, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Filter out any payments where profiles query failed
      const validPayments = data?.filter(payment => 
        payment.profiles && 
        typeof payment.profiles === 'object' && 
        'username' in payment.profiles && 
        'email' in payment.profiles
      ).map(payment => ({
        ...payment,
        amount: Number(payment.amount)
      })) as Payment[];
      
      setPayments(validPayments || []);
    } catch (error: any) {
      console.error('Error fetching payments:', error);
      toast({
        title: "Error",
        description: "Failed to fetch payments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select('status, amount');

      if (error) throw error;

      const total = data?.length || 0;
      const verified = data?.filter(p => p.status === 'verified').length || 0;
      const pending = data?.filter(p => p.status === 'pending').length || 0;
      const rejected = data?.filter(p => p.status === 'rejected').length || 0;
      const totalAmount = data?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

      setStats({ total, verified, pending, rejected, totalAmount });
    } catch (error: any) {
      console.error('Error fetching stats:', error);
    }
  };

  const updatePaymentStatus = async (paymentId: string, status: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('payments')
        .update({ 
          status, 
          notes: notes || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Payment ${status} successfully`,
      });

      fetchPayments();
      fetchStats();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update payment status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Management</h1>
        <p className="text-gray-600">Review and manage all payment submissions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Payments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.verified}</div>
            <div className="text-sm text-gray-600">Verified</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
            <div className="text-sm text-gray-600">Rejected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-emerald-600">₦{stats.totalAmount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Amount</div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
          <CardDescription>Manage payment verifications and status updates</CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No payments found</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Agent Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.profiles.username}</div>
                        <div className="text-sm text-gray-500">{payment.profiles.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">₦{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                    <TableCell>{payment.reference_number || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.agent_code}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(payment.status)} flex items-center gap-1`}>
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payment.receipt_url ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(payment.receipt_url, '_blank')}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      ) : (
                        <span className="text-gray-400">No receipt</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        {payment.status !== 'verified' && (
                          <Button
                            size="sm"
                            onClick={() => updatePaymentStatus(payment.id, 'verified')}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Verify
                          </Button>
                        )}
                        {payment.status !== 'rejected' && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updatePaymentStatus(payment.id, 'rejected')}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'verified': return 'bg-green-100 text-green-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-yellow-100 text-yellow-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'verified': return <CheckCircle className="w-4 h-4" />;
    case 'rejected': return <XCircle className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

const fetchStats = async () => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('status, amount');

    if (error) throw error;

    const total = data?.length || 0;
    const verified = data?.filter(p => p.status === 'verified').length || 0;
    const pending = data?.filter(p => p.status === 'pending').length || 0;
    const rejected = data?.filter(p => p.status === 'rejected').length || 0;
    const totalAmount = data?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

    return { total, verified, pending, rejected, totalAmount };
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    return { total: 0, verified: 0, pending: 0, rejected: 0, totalAmount: 0 };
  }
};

export default AdminPaymentsList;
