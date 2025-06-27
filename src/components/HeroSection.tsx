
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, CreditCard, FileText } from "lucide-react";

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
}

const HeroSection = ({ setActiveTab }: HeroSectionProps) => {
  const stats = [
    { label: "Registered Pilgrims", value: "15,000+", icon: Users },
    { label: "Successful Hajj", value: "12,500+", icon: CheckCircle },
    { label: "Payment Plans", value: "Flexible", icon: CreditCard },
    { label: "Documents Processed", value: "25,000+", icon: FileText },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-blue-600/5 to-purple-600/5"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                ✨ Trusted Hajj Platform
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Journey to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                  {" "}Sacred Hajj
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Complete your Hajj pilgrimage with ease. Register online, pay in flexible installments, 
                upload documents, and get real-time updates on your sacred journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setActiveTab("register")}
                >
                  🚀 Start Your Application
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-emerald-200 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold"
                  onClick={() => setActiveTab("resources")}
                >
                  📚 Learn More
                </Button>
              </div>

              {/* Quick Features */}
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">Easy Registration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">Flexible Payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">Document Upload</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-gray-700">24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
