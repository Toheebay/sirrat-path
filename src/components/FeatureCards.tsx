
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CreditCard, 
  FileText, 
  Bell, 
  MessageSquare, 
  BookOpen,
  CheckCircle,
  Clock
} from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      icon: Users,
      title: "Pilgrim Registration",
      description: "Complete online application with document upload and status tracking",
      features: ["Online Form", "Document Upload", "Status Tracking", "Passport & NIN Integration"],
      color: "emerald",
      badge: "Essential"
    },
    {
      icon: CreditCard,
      title: "Flexible Payment System",
      description: "Pay in convenient installments with automated reminders",
      features: ["Installment Plans", "Wallet Integration", "Auto Reminders", "Payment History"],
      color: "blue",
      badge: "Popular"
    },
    {
      icon: FileText,
      title: "Document Management",
      description: "Upload and verify all required documents digitally",
      features: ["Vaccination Cards", "Passport Verification", "Visa Status", "Guarantor Info"],
      color: "purple",
      badge: "Secure"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get real-time updates on payments, visa status, and travel dates",
      features: ["Payment Alerts", "Visa Updates", "Flight Info", "Training Schedules"],
      color: "orange",
      badge: "Real-time"
    },
    {
      icon: MessageSquare,
      title: "24/7 Support Chat",
      description: "Get instant help with live chat and WhatsApp integration",
      features: ["Live Chat", "WhatsApp Support", "FAQ Section", "Agent Contact"],
      color: "green",
      badge: "Always Available"
    },
    {
      icon: BookOpen,
      title: "Hajj Resources",
      description: "Complete guides, checklists, and educational materials",
      features: ["First-timer Guides", "Packing Lists", "Prayer Schedules", "Hajj Steps"],
      color: "indigo",
      badge: "Educational"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "from-emerald-500 to-emerald-600 text-emerald-600 bg-emerald-50 border-emerald-200",
      blue: "from-blue-500 to-blue-600 text-blue-600 bg-blue-50 border-blue-200",
      purple: "from-purple-500 to-purple-600 text-purple-600 bg-purple-50 border-purple-200",
      orange: "from-orange-500 to-orange-600 text-orange-600 bg-orange-50 border-orange-200",
      green: "from-green-500 to-green-600 text-green-600 bg-green-50 border-green-200",
      indigo: "from-indigo-500 to-indigo-600 text-indigo-600 bg-indigo-50 border-indigo-200"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800">
            🌟 Platform Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for Your Hajj Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools and resources you need 
            to make your Hajj pilgrimage smooth and organized.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const colorClasses = getColorClasses(feature.color);
            const [gradientFrom, gradientTo, textColor, bgColor, borderColor] = colorClasses.split(' ');
            
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 bg-white/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className={`${textColor} ${bgColor} font-medium`}>
                      {feature.badge}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className={`w-4 h-4 ${textColor}`} />
                        <span className="text-sm text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className={`w-full group-hover:${bgColor} group-hover:${textColor} group-hover:border-transparent transition-all duration-300`}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-emerald-600 to-blue-600 border-0 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Begin Your Sacred Journey?</h3>
              <p className="text-emerald-100 mb-6">
                Join thousands of pilgrims who trust our platform for their Hajj experience
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="font-semibold">
                  🚀 Start Registration
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-emerald-600">
                  💬 Contact Agent
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
