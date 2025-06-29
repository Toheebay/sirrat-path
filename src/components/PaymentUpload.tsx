
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload, X } from "lucide-react";

interface PaymentUploadProps {
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentUpload = ({ onClose, onSuccess }: PaymentUploadProps) => {
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setReceiptFile(file);
    }
  };

  const uploadReceipt = async (userId: string, paymentId: string): Promise<string | null> => {
    if (!receiptFile) return null;

    const fileExt = receiptFile.name.split('.').pop();
    const fileName = `${userId}/${paymentId}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from('payment-receipts')
      .upload(fileName, receiptFile);

    if (error) throw error;

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('payment-receipts')
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const sendNotificationEmail = async (userEmail: string, userName: string, paymentData: any) => {
    try {
      const response = await fetch(`${supabase.supabaseUrl}/functions/v1/send-notification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabase.supabaseKey}`,
        },
        body: JSON.stringify({
          type: 'receipt',
          userEmail,
          userName,
          data: paymentData
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

      // Create payment record first
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert([
          {
            user_id: user.id,
            amount: parseFloat(amount),
            payment_date: paymentDate,
            reference_number: referenceNumber,
            agent_code: "952",
            payment_method: "Bank Transfer",
            notes,
            status: "pending"
          }
        ])
        .select()
        .single();

      if (paymentError) throw paymentError;

      // Upload receipt if provided
      let receiptUrl = null;
      if (receiptFile && payment) {
        receiptUrl = await uploadReceipt(user.id, payment.id);
        
        // Update payment with receipt URL
        const { error: updateError } = await supabase
          .from('payments')
          .update({ receipt_url: receiptUrl })
          .eq('id', payment.id);

        if (updateError) throw updateError;
      }

      // Send notification email
      await sendNotificationEmail(
        user.email || '',
        profile?.username || 'Unknown User',
        {
          amount: parseFloat(amount),
          paymentDate,
          referenceNumber,
          notes,
          receiptUrl
        }
      );

      toast({
        title: "Payment Submitted",
        description: "Your payment has been submitted for verification. Admin has been notified.",
      });

      onSuccess();
    } catch (error: any) {
      console.error('Payment submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Submit Payment</CardTitle>
            <CardDescription>Upload your payment details and receipt</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-emerald-50 p-3 rounded-lg text-sm">
              <p className="font-medium text-emerald-800">Agent Code: 952</p>
              <p className="text-emerald-700">Use this code as reference when making your transfer</p>
            </div>

            <div>
              <Label htmlFor="amount">Amount (₦)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter payment amount"
                required
              />
            </div>

            <div>
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input
                id="paymentDate"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input
                id="referenceNumber"
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Transaction reference number"
              />
            </div>

            <div>
              <Label htmlFor="receipt">Payment Receipt</Label>
              <Input
                id="receipt"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
              {receiptFile && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {receiptFile.name}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional information about this payment"
                rows={3}
              />
            </div>

            <div className="flex space-x-2">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Submitting..." : "Submit Payment"}
                <Upload className="w-4 h-4 ml-2" />
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentUpload;
