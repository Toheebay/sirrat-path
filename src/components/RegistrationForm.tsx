
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, FileText, CreditCard, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {},
    documents: {},
    payment: {}
  });
  const { toast } = useToast();

  const steps = [
    { id: 1, title: "Personal Information", icon: User, description: "Basic details and contact" },
    { id: 2, title: "Document Upload", icon: FileText, description: "Required documents" },
    { id: 3, title: "Payment Setup", icon: CreditCard, description: "Payment preferences" },
    { id: 4, title: "Review & Submit", icon: CheckCircle, description: "Final confirmation" }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Progress Saved",
        description: "Your information has been saved successfully.",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Application Submitted!",
      description: "Your Hajj application has been submitted successfully. You'll receive a confirmation email shortly.",
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-emerald-100 text-emerald-800">
          📝 Hajj Registration
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Apply for Hajj Pilgrimage</h1>
        <p className="text-gray-600">Complete your application in simple steps</p>
      </div>

      {/* Progress Bar */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">Step {currentStep} of {steps.length}</span>
            <span className="text-sm font-medium text-emerald-600">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="mb-4" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.id} className={`flex items-center space-x-2 p-2 rounded-lg ${
                step.id === currentStep ? 'bg-emerald-50 text-emerald-700' : 
                step.id < currentStep ? 'bg-green-50 text-green-700' : 'text-gray-500'
              }`}>
                <step.icon className="w-4 h-4" />
                <div className="text-xs">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-gray-500">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form Steps */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="Enter your first name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Enter your last name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+234 xxx xxx xxxx" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="nin">NIN Number *</Label>
                    <Input id="nin" placeholder="Enter your NIN" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="bvn">BVN Number</Label>
                    <Input id="bvn" placeholder="Enter your BVN" className="mt-1" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Textarea id="address" placeholder="Enter your full address" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lagos">Lagos</SelectItem>
                        <SelectItem value="abuja">Abuja</SelectItem>
                        <SelectItem value="kano">Kano</SelectItem>
                        <SelectItem value="rivers">Rivers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Emergency Contact</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyName">Contact Name *</Label>
                    <Input id="emergencyName" placeholder="Full name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                    <Input id="emergencyPhone" placeholder="Phone number" className="mt-1" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Document Upload</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "International Passport", desc: "Valid passport with at least 6 months validity", required: true },
                  { title: "Passport Photograph", desc: "Recent passport-sized photograph", required: true },
                  { title: "Vaccination Certificate", desc: "Yellow fever and other required vaccines", required: true },
                  { title: "NIN Certificate", desc: "National Identity Number certificate", required: true },
                  { title: "Guarantor's Letter", desc: "Letter from guarantor with ID", required: false },
                  { title: "Medical Report", desc: "Health certificate from recognized hospital", required: false }
                ].map((doc, index) => (
                  <Card key={index} className="border-dashed border-2 hover:border-emerald-300 transition-colors">
                    <CardContent className="p-4">
                      <div className="text-center">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <h4 className="font-medium text-sm mb-1">
                          {doc.title}
                          {doc.required && <span className="text-red-500 ml-1">*</span>}
                        </h4>
                        <p className="text-xs text-gray-500 mb-3">{doc.desc}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          Choose File
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">📋 Document Requirements</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• All documents must be clear and readable</li>
                  <li>• Accepted formats: PDF, JPG, PNG (Max 5MB each)</li>
                  <li>• Passport must have at least 6 months validity</li>
                  <li>• Vaccination certificates must be from recognized hospitals</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Payment Setup</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-emerald-200 bg-emerald-50">
                  <CardHeader>
                    <CardTitle className="text-lg">Hajj Package Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Base Package</span>
                        <span className="font-semibold">₦2,500,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processing Fee</span>
                        <span className="font-semibold">₦50,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance</span>
                        <span className="font-semibold">₦25,000</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-emerald-600">₦2,575,000</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div>
                    <Label>Payment Method</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choose payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="installment">Monthly Installments</SelectItem>
                        <SelectItem value="quarterly">Quarterly Payments</SelectItem>
                        <SelectItem value="full">Full Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Preferred Payment Amount</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select installment amount" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50000">₦50,000/month (52 months)</SelectItem>
                        <SelectItem value="100000">₦100,000/month (26 months)</SelectItem>
                        <SelectItem value="200000">₦200,000/month (13 months)</SelectItem>
                        <SelectItem value="custom">Custom Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Bank/Wallet</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select payment provider" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paystack">Paystack</SelectItem>
                        <SelectItem value="flutterwave">Flutterwave</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">💡 Payment Information</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• First payment due within 7 days of registration</li>
                  <li>• Automatic payment reminders via SMS/Email/WhatsApp</li>
                  <li>• Flexible payment schedules available</li>
                  <li>• Secure payment processing with trusted providers</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Review & Submit Application</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">John Doe</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">john@example.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">+234 123 456 789</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">NIN:</span>
                      <span className="font-medium">12345678901</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Documents Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    {[
                      { name: "Passport", status: "uploaded" },
                      { name: "Photograph", status: "uploaded" },
                      { name: "Vaccination", status: "uploaded" },
                      { name: "NIN Certificate", status: "uploaded" }
                    ].map((doc, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{doc.name}:</span>
                        <Badge className="bg-green-100 text-green-800">
                          ✓ Uploaded
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-bold text-lg">₦2,575,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-medium">Monthly Installments</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Monthly Payment:</span>
                        <span className="font-bold text-lg text-emerald-600">₦100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">26 months</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-emerald-900 mb-3">🎉 Ready to Submit?</h4>
                <p className="text-emerald-800 mb-4">
                  Please review all information carefully. Once submitted, you'll receive:
                </p>
                <ul className="text-sm text-emerald-800 space-y-1 mb-4">
                  <li>• Email confirmation with application reference</li>
                  <li>• SMS notification about next steps</li>
                  <li>• Access to your application dashboard</li>
                  <li>• Payment schedule and reminders setup</li>
                </ul>
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700" 
                  size="lg"
                  onClick={handleSubmit}
                >
                  🚀 Submit My Application
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              ← Previous
            </Button>
            
            {currentStep < steps.length ? (
              <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700">
                Next →
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
