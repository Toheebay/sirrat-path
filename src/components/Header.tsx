
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Menu, X, Users, User, LogOut, LogIn } from "lucide-react";
import LoginForm from "./LoginForm";

interface HeaderProps {
  userType: "pilgrim" | "agent" | "admin";
  setUserType: (type: "pilgrim" | "agent" | "admin") => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (logged: boolean) => void;
}

const Header = ({ userType, setUserType, activeTab, setActiveTab, isLoggedIn, setIsLoggedIn }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("");

  const navItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "register", label: "Register", icon: "📝" },
    { id: "payments", label: "Payments", icon: "💳" },
    { id: "documents", label: "Documents", icon: "📄" },
    { id: "dashboard", label: "Dashboard", icon: "📊" },
    { id: "notifications", label: "Updates", icon: "🔔" },
    { id: "support", label: "Support", icon: "💬" },
    { id: "resources", label: "Resources", icon: "📚" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMenuOpen(false);
  };

  const handleLogin = (loginUserType: "pilgrim" | "agent" | "admin", username: string) => {
    setIsLoggedIn(true);
    setUserType(loginUserType);
    setCurrentUsername(username);
    setShowLoginForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType("pilgrim");
    setCurrentUsername("");
    setActiveTab("home");
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🕌</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hajj Pathway</h1>
                <p className="text-xs text-gray-600">Pilgrim Platform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700"
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <>
                  <div className="hidden md:flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Welcome, {currentUsername}</span>
                    <Button
                      variant={userType === "pilgrim" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUserType("pilgrim")}
                      className="text-xs"
                    >
                      <User className="w-3 h-3 mr-1" />
                      Pilgrim
                    </Button>
                    <Button
                      variant={userType === "agent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUserType("agent")}
                      className="text-xs"
                    >
                      <Users className="w-3 h-3 mr-1" />
                      Agent
                    </Button>
                    <Button
                      variant={userType === "admin" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUserType("admin")}
                      className="text-xs"
                    >
                      <Users className="w-3 h-3 mr-1" />
                      Admin
                    </Button>
                  </div>

                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-4 h-4" />
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs">
                      3
                    </Badge>
                  </Button>

                  <Button variant="ghost" size="sm" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden md:inline ml-1">Logout</span>
                  </Button>
                </>
              ) : (
                <Button variant="default" size="sm" onClick={() => setShowLoginForm(true)}>
                  <LogIn className="w-4 h-4" />
                  <span className="ml-1">Login</span>
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-emerald-100">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    className="justify-start text-sm font-medium hover:bg-emerald-50 hover:text-emerald-700"
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Button>
                ))}
                
                {isLoggedIn && (
                  <div className="flex space-x-2 pt-2 border-t">
                    <Button
                      variant={userType === "pilgrim" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUserType("pilgrim")}
                      className="flex-1"
                    >
                      <User className="w-3 h-3 mr-1" />
                      Pilgrim
                    </Button>
                    <Button
                      variant={userType === "agent" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUserType("agent")}
                      className="flex-1"
                    >
                      <Users className="w-3 h-3 mr-1" />
                      Agent
                    </Button>
                    <Button
                      variant={userType === "admin" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUserType("admin")}
                      className="flex-1"
                    >
                      <Users className="w-3 h-3 mr-1" />
                      Admin
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Login Form Modal */}
      {showLoginForm && (
        <LoginForm
          onLogin={handleLogin}
          onClose={() => setShowLoginForm(false)}
        />
      )}
    </>
  );
};

export default Header;
