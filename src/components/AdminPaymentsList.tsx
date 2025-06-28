
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Eye, Users, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Payment {
  id: string;
  amount: number;
  payment_date: string;
  reference_number: string;
  receipt_url: string;
  status: string;
  notes?: string;
  agent_code: string;
  profiles: {
    username: string;
    email: string;
  };
}

const AdminPaymentsList = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, verified: 0, totalAmount: 0 });
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          profiles (
            username,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPayments(data || []);
      
      // Calculate stats
      const totalAmount = data?.reduce((sum, payment) => sum + parseFloat(payment.amount), 0) || 0;
      const pending = data?.filter(p => p.status === 'pending').length || 0;
      const verified = data?.filter(p => p.status === 'verified').length || 0;
      
      setStats({
        total: data?.length || 0,
        pending,
        verified,
        totalAmount
      });

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

  const updatePaymentStatus = async (paymentId: string, status: 'verified' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('payments')
        .update({ status })
        .eq('id', paymentId);

      if (error) throw error;

      toast({
        title: "Status Updated",
        description: `Payment ${status} successfully`,
      });

      fetchPayments();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">✓ Verified</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800">✗ Rejected</Badge>;
      default:
        return <Badge className="bg-orange-100 text-orange-800">⏳ Pending</Badge>;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading payments...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Payments</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <XCircle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold">₦{stats.totalAmount.toLocaleString()}</p>
              </div>
              <CreditCard className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments List */}
      <Card>
        <CardHeader>
          <CardTitle>All Payment Records</CardTitle>
          <CardDescription>Manage and verify payment uploads</CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No payments found</p>
          ) : (
            <div className="space-y-4">
              {payments.map((payment) => (
                <div key={payment.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{payment.profiles?.username}</h4>
                      <p className="text-sm text-gray-600">{payment.profiles?.email}</p>
                    </div>
                    {getStatusBadge(payment.status)}
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-medium">₦{parseFloat(payment.amount).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-medium">{new Date(payment.payment_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Reference</p>
                      <p className="font-medium">{payment.reference_number}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Agent Code</p>
                      <p className="font-medium">{payment.agent_code}</p>
                    </div>
                  </div>

                  {payment.notes && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Notes</p>
                      <p className="text-sm">{payment.notes}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(payment.receipt_url, '_blank')}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Receipt
                    </Button>

                    {payment.status === 'pending' && (
                      <div className="space-x-2">
                        <Button
                          size="sm"
                          onClick={() => updatePaymentStatus(payment.id, 'verified')}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updatePaymentStatus(payment.id, 'rejected')}
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPaymentsList;
