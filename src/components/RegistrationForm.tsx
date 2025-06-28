import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, FileText, Clock, CheckCircle } from "lucide-react";

const RegistrationForm = () => {
  const handleGoogleFormRedirect = () => {
    window.open("https://forms.gle/mm1XuzCUpFGLDcxV7", "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-emerald-100 text-emerald-800">
          📝 Hajj Registration
        </Badge>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Apply for Hajj Pilgrimage</h1>
        <p className="text-gray-600">Complete your application through our secure Google Form</p>
      </div>

      {/* Main Registration Card */}
      <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl text-emerald-800 mb-4">
            🕌 Hajj 2026 Registration
          </CardTitle>
          <CardDescription className="text-lg text-gray-700">
            Register for the spiritual journey of a lifetime with Abdullateef Hajj and Umrah Services
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Package Details */}
          <div className="bg-white p-6 rounded-lg border border-emerald-200">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4">📦 Package Includes:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>✈️ Direct Lagos-Medinah Flights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>🏨 Accommodation near Haram</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>🍽️ Nigerian Feeding (2 meals/day)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>📋 Complete Documentation Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>🎯 Experienced Guidance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span>📞 24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="bg-emerald-600 text-white p-6 rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">Total Package Price</h3>
            <p className="text-4xl font-bold mb-2">₦9,850,000</p>
            <p className="text-emerald-100">All-inclusive Hajj package for 2026</p>
          </div>

          {/* Registration Button */}
          <div className="text-center">
            <Button 
              onClick={handleGoogleFormRedirect}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-lg font-semibold"
              size="lg"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Register Now - Complete Form
            </Button>
            <p className="text-sm text-gray-600 mt-3">
              Secure registration through Google Forms
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 text-gray-800">📞 Need Help with Registration?</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">WhatsApp Support:</p>
                <p className="text-blue-600">+2347067412852</p>
                <p className="text-blue-600">+2348024764090</p>
              </div>
              <div>
                <p className="font-medium">Email Support:</p>
                <p className="text-blue-600">adebayoajani23@gmail.com</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
