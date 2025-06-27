
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

const Footer = ({ setActiveTab }: FooterProps) => {
  const quickLinks = [
    { label: "Home", tab: "home", icon: "🏠" },
    { label: "Register", tab: "register", icon: "📝" },
    { label: "Payment", tab: "payments", icon: "💳" },
    { label: "Documents", tab: "documents", icon: "📄" },
    { label: "Support", tab: "support", icon: "💬" }
  ];

  const contactInfo = [
    { type: "Phone", value: "+2347067412852", icon: "📞" },
    { type: "WhatsApp", value: "+2348024764090", icon: "💬" },
    { type: "Email", value: "adebayoajani23@gmail.com", icon: "📧" },
    { type: "Address", value: "Lagos, Nigeria", icon: "📍" }
  ];

  return (
    <footer className="bg-gradient-to-r from-emerald-900 via-blue-900 to-purple-900 text-white py-16 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🕌</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Hajj Pathway</h3>
                <p className="text-emerald-200 text-sm">Pilgrim Platform</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for a seamless Hajj pilgrimage experience. 
              We provide comprehensive services from registration to your sacred journey.
            </p>
            <div className="flex space-x-2">
              <Badge className="bg-emerald-600 hover:bg-emerald-700">Trusted</Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700">Licensed</Badge>
              <Badge className="bg-purple-600 hover:bg-purple-700">24/7</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald-300">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Button
                  key={link.tab}
                  variant="ghost"
                  className="text-gray-300 hover:text-white hover:bg-white/10 justify-start p-2 w-full"
                  onClick={() => setActiveTab(link.tab)}
                >
                  <span className="mr-2">{link.icon}</span>
                  {link.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-blue-300">Our Services</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Online Hajj Registration</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Flexible Payment Plans</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Document Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Visa Assistance</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>Travel Arrangements</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>✓</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-300">Contact Us</h4>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-lg">{contact.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400">{contact.type}</p>
                    <p className="text-sm text-gray-300">{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                © 2024 Hajj Pathway Platform. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs">
                Licensed by NAHCON • Regulated by Islamic Affairs
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-emerald-400">15,000+</p>
                <p className="text-xs text-gray-400">Pilgrims Served</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-400">12,500+</p>
                <p className="text-xs text-gray-400">Successful Hajj</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-400">4.9/5</p>
                <p className="text-xs text-gray-400">Customer Rating</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-400 text-xs">
              "And proclaim to mankind the Hajj pilgrimage. They will come to you on foot and on every lean camel; they will come from every distant pass" - Quran 22:27
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
