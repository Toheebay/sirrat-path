
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

const Footer = ({ setActiveTab }: FooterProps) => {
  const quickLinks = [
    { label: "Home", tab: "home" },
    { label: "Register", tab: "register" },
    { label: "Resources", tab: "resources" },
    { label: "Support", tab: "support" },
  ];

  const handleWhatsAppClick = (number: string) => {
    window.open(`https://wa.me/${number.replace(/\+/g, '')}`, '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:adebayoajani23@gmail.com', '_blank');
  };

  const handleWebsiteClick = () => {
    window.open('https://toyi.netlify.app/', '_blank');
  };

  return (
    <footer className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">🕌</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Hajj Pathway</h3>
                <p className="text-emerald-200 text-sm">Pilgrim Platform</p>
              </div>
            </div>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Your trusted partner for a spiritual and memorable Hajj journey. We provide comprehensive services to make your pilgrimage smooth and meaningful.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className="text-emerald-200 hover:text-white hover:bg-white/10 p-0 h-auto justify-start"
                    onClick={() => setActiveTab(link.tab)}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-300 mt-0.5" />
                <div className="text-emerald-100 text-sm">
                  <p>Amuwo Odofin Muslim Community</p>
                  <p>Mile 2, Lagos</p>
                  <p>Amuwo Odofin Central Mosque</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-300" />
                <div className="text-emerald-100 text-sm space-y-1">
                  <Button
                    variant="ghost"
                    className="text-emerald-200 hover:text-white hover:bg-white/10 p-0 h-auto text-sm"
                    onClick={() => handleWhatsAppClick('+2347067412852')}
                  >
                    +2347067412852
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-emerald-200 hover:text-white hover:bg-white/10 p-0 h-auto text-sm block"
                    onClick={() => handleWhatsAppClick('+2348024764090')}
                  >
                    +2348024764090
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-300" />
                <Button
                  variant="ghost"
                  className="text-emerald-200 hover:text-white hover:bg-white/10 p-0 h-auto text-sm"
                  onClick={handleEmailClick}
                >
                  adebayoajani23@gmail.com
                </Button>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
            <ul className="space-y-2 text-emerald-100 text-sm">
              <li>• Hajj Package Booking</li>
              <li>• Visa Processing</li>
              <li>• Accommodation</li>
              <li>• Flight Arrangements</li>
              <li>• Spiritual Guidance</li>
              <li>• 24/7 Support</li>
            </ul>
            
            <div className="mt-4">
              <Button
                variant="outline"
                size="sm"
                className="border-emerald-300 text-emerald-300 hover:bg-emerald-300 hover:text-emerald-900"
                onClick={handleWebsiteClick}
              >
                Visit Our Website
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-emerald-200 text-sm mb-4 md:mb-0">
            © 2024 Abdullateef Hajj and Umrah Services Ltd. All rights reserved.
          </div>
          
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-200 hover:text-white hover:bg-white/10"
              onClick={() => handleWhatsAppClick('+2347067412852')}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Support
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
