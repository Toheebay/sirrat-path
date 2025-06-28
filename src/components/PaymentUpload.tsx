
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Upload, FileImage, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PaymentUpload = () => {
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [notes, setNotes] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Receipt image must be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      setReceipt(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receipt) {
      toast({
        title: "Receipt Required",
        description: "Please upload your payment receipt",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Upload receipt to storage
      const fileName = `${user.id}/${Date.now()}-${receipt.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('payment-receipts')
        .upload(fileName, receipt);

      if (uploadError) throw uploadError;

      const receiptUrl = `${supabase.supabaseUrl}/storage/v1/object/public/payment-receipts/${uploadData.path}`;

      // Insert payment record
      const { error: insertError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          amount: parseFloat(amount),
          payment_date: paymentDate,
          reference_number: referenceNumber,
          receipt_url: receiptUrl,
          notes: notes,
          agent_code: '952'
        });

      if (insertError) throw insertError;

      toast({
        title: "Payment Uploaded Successfully",
        description: "Your payment will be verified by admin soon.",
      });

      // Reset form
      setAmount("");
      setPaymentDate("");
      setReferenceNumber("");
      setNotes("");
      setReceipt(null);
      
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-6 h-6 text-emerald-600" />
            <span>Upload Payment Receipt</span>
          </CardTitle>
          <CardDescription>
            Upload your bank transfer receipt for payment verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">📝 Important Reminder:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Always include <strong>Agent Code: 952</strong> in your transfer reference</p>
              <p>• Include your name and phone number in the transfer description</p>
              <p>• Upload a clear photo of your receipt for quick verification</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount Paid (₦)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 500000"
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
            </div>

            <div>
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input
                id="referenceNumber"
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Transfer reference number"
                required
              />
            </div>

            <div>
              <Label htmlFor="receipt">Upload Receipt Image</Label>
              <div className="mt-2">
                <input
                  id="receipt"
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptUpload}
                  className="hidden"
                  required
                />
                <label
                  htmlFor="receipt"
                  className="cursor-pointer flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {receipt ? (
                    <div className="text-center">
                      <FileImage className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <p className="text-sm font-medium text-green-600">{receipt.name}</p>
                      <p className="text-xs text-gray-500">Click to change</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload receipt</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional information about this payment..."
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full" disabled={uploading}>
              {uploading ? "Uploading..." : "Submit Payment Receipt"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentUpload;
