
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Upload, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import PaymentUpload from "./PaymentUpload";

interface Payment {
  id: string;
  amount: number;
  payment_date: string;
  payment_method: string;
  reference_number: string;
  agent_code: string;
  receipt_url: string;
  status: string;
  notes: string;
  created_at: string;
}

const PaymentDashboard = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const { toast } = useToast();

  const fetchPayments = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedData = data?.map(payment => ({
        ...payment,
        amount: Number(payment.amount)
      })) as Payment[];

      setPayments(transformedData || []);
    } catch (error: any) {
      console.error('Payment fetch error:', error);
      toast({
        title: "Error",
        description: "Failed to fetch payments",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleUploadSuccess = useCallback(() => {
    setShowUploadForm(false);
    fetchPayments();
  }, [fetchPayments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="animate-spin h-8 w-8 text-emerald-600" />
        <span className="ml-2 text-gray-600">Loading payments...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Dashboard</h1>
          <p className="text-gray-600">Track your payment submissions and status for 3-week Hajj</p>
        </div>
        <Button onClick={() => setShowUploadForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Submit Payment
        </Button>
      </div>

      {/* Registration Fee Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">📋 Registration Fee Required</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-blue-700">
            <p><strong>Registration Fee: ₦20,000</strong></p>
            <p className="text-sm text-blue-600">
              This fee is required to complete your application for the 3-week Hajj package.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Instructions */}
      <Card className="bg-emerald-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="text-emerald-800">Payment Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-emerald-700">
            <p><strong>Bank Transfer Details:</strong></p>
            <p>Bank: [Bank Name]</p>
            <p>Account Name: Abdullateef Hajj and Umrah Services</p>
            <p>Account Number: [Account Number]</p>
            <p><strong>Agent Code:</strong> 952 (Use this as reference)</p>
            <div className="mt-4 p-3 bg-emerald-100 rounded-lg">
              <p className="font-semibold">Total Package: ₦9,850,000 + Registration Fee: ₦20,000</p>
              <p className="text-sm">3-Week Complete Hajj Experience</p>
            </div>
            <p className="text-sm text-emerald-600 mt-2">
              After making your transfer, upload your receipt below for verification.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Payments</CardTitle>
          <CardDescription>Track all your payment submissions for 3-week Hajj</CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No payments submitted yet</p>
              <Button onClick={() => setShowUploadForm(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Submit Your First Payment
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Agent Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Receipt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">₦{payment.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                    <TableCell>{payment.reference_number || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.agent_code}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Payment Upload Modal */}
      {showUploadForm && (
        <PaymentUpload 
          onClose={() => setShowUploadForm(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default PaymentDashboard;
