
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import RegistrationForm from "@/components/RegistrationForm";
import PaymentDashboard from "@/components/PaymentDashboard";
import DocumentUpload from "@/components/DocumentUpload";
import SupportChat from "@/components/SupportChat";
import ResourcesSection from "@/components/ResourcesSection";
import NotificationCenter from "@/components/NotificationCenter";
import AgentDashboard from "@/components/AgentDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import AuthPage from "@/components/AuthPage";
import AdminPaymentsList from "@/components/AdminPaymentsList";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userType, setUserType] = useState<"pilgrim" | "agent" | "admin">("pilgrim");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile to get user type
          setTimeout(async () => {
            const { data: profile } = await supabase
              .from('profiles')
              .select('user_type')
              .eq('id', session.user.id)
              .single();
            
            if (profile) {
              setUserType(profile.user_type as "pilgrim" | "agent" | "admin");
              setIsLoggedIn(true);
            }
          }, 0);
        } else {
          setIsLoggedIn(false);
          setUserType("pilgrim");
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile) {
              setUserType(profile.user_type as "pilgrim" | "agent" | "admin");
              setIsLoggedIn(true);
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthSuccess = (user: User, userType: string) => {
    setUser(user);
    setUserType(userType as "pilgrim" | "agent" | "admin");
    setIsLoggedIn(true);
    setActiveTab("home");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
    setSession(null);
    setUserType("pilgrim");
    setActiveTab("home");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!isLoggedIn) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-12">
            <HeroSection setActiveTab={setActiveTab} />
            <FeatureCards />
          </div>
        );
      case "register":
        return <RegistrationForm />;
      case "payments":
        return userType === "admin" ? <AdminPaymentsList /> : <PaymentDashboard />;
      case "documents":
        return <DocumentUpload />;
      case "dashboard":
        return userType === "admin" ? <AdminDashboard /> : 
               userType === "agent" ? <AgentDashboard /> : <PaymentDashboard />;
      case "notifications":
        return <NotificationCenter />;
      case "support":
        return <SupportChat />;
      case "resources":
        return <ResourcesSection />;
      default:
        return (
          <div className="space-y-12">
            <HeroSection setActiveTab={setActiveTab} />
            <FeatureCards />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Header
        userType={userType}
        setUserType={setUserType}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-8">
        {renderActiveTab()}
      </main>
      
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
};

export default Index;
