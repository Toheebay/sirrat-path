
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, CreditCard, FileText, Plane, Home, Utensils, Clock } from "lucide-react";

interface HeroSectionProps {
  setActiveTab: (tab: string) => void;
}

const HeroSection = ({ setActiveTab }: HeroSectionProps) => {
  const stats = [
    { label: "Registered Pilgrims", value: "15,000+", icon: Users },
    { label: "Successful Hajj", value: "12,500+", icon: CheckCircle },
    { label: "Lagos-Medinah Flights", value: "Direct", icon: Plane },
    { label: "Hajj Duration", value: "3 Weeks", icon: Clock },
  ];

  const hajjFeatures = [
    { icon: Plane, text: "Direct flight Lagos to Medinah and back" },
    { icon: Home, text: "3-week accommodation close to Haram in Makkah & Medinah" },
    { icon: Utensils, text: "Nigerian feeding twice daily for 3 weeks" },
    { icon: CheckCircle, text: "Complete 3-week Hajj package with honorable Iyepe" },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-blue-600/5 to-purple-600/5"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Advertisement Image */}
          <div className="text-center mb-12">
            <div className="inline-block rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <img 
                src="/lovable-uploads/4f101b78-fcac-4514-a2ae-792d7b51fd09.png" 
                alt="Abdullateef Integrated Hajj & Umrah Ltd - Perform Hajj 2026 with Hon. Iyepe"
                className="w-full max-w-md mx-auto h-auto"
              />
            </div>
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg max-w-md mx-auto">
                <p className="text-2xl font-bold">Total Package: ₦9,850,000</p>
                <p className="text-sm opacity-90">3-Week Complete Hajj Experience</p>
              </div>
              <div className="p-3 bg-blue-100 border border-blue-300 text-blue-800 rounded-lg max-w-md mx-auto">
                <p className="font-semibold">Registration Fee: ₦20,000</p>
                <p className="text-sm">Pay Small Small - Installment Available</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                ✨ Trusted Hajj Platform • 3 Weeks
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Perform Hajj 2026
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600">
                  {" "}with Honorable Iyepe
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Complete your 3-week Hajj pilgrimage with ease. Our flight from Lagos to Medinah and back to Lagos, 
                we will take care of accommodation for the full 3 weeks. Our accommodation in Makkah and Medinah is close to Haram (mosque). 
                We will provide Nigerian feeding twice a day throughout your 3-week stay.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => setActiveTab("register")}
                >
                  🚀 Start Your Application (₦20,000)
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

              {/* Hajj 2026 Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto lg:mx-0 mb-8">
                {hajjFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                    <feature.icon className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
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
