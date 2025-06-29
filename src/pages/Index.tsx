
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
import AdminSupportManagement from "@/components/AdminSupportManagement";
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
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        if (initialSession?.user && mounted) {
          console.log('Initial session found:', initialSession.user.email);
          
          // Fetch user profile
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', initialSession.user.id)
            .single();
          
          if (profileError) {
            console.error('Profile error:', profileError);
            // Still set user as logged in even if profile fetch fails
            setUser(initialSession.user);
            setSession(initialSession);
            setIsLoggedIn(true);
            setUserType("pilgrim"); // Default fallback
          } else if (profile && mounted) {
            console.log('Profile loaded:', profile);
            setUser(initialSession.user);
            setSession(initialSession);
            setUserType(profile.user_type as "pilgrim" | "agent" | "admin");
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user && event === 'SIGNED_IN') {
          try {
            const { data: profile, error } = await supabase
              .from('profiles')
              .select('user_type')
              .eq('id', session.user.id)
              .single();
            
            if (error) {
              console.error('Error fetching profile:', error);
              setUserType("pilgrim"); // Fallback
            } else if (profile && mounted) {
              console.log('User profile:', profile);
              setUserType(profile.user_type as "pilgrim" | "agent" | "admin");
            }
            
            if (mounted) {
              setIsLoggedIn(true);
            }
          } catch (error) {
            console.error('Profile fetch error:', error);
            if (mounted) {
              setIsLoggedIn(true);
              setUserType("pilgrim"); // Fallback
            }
          }
        } else if (mounted) {
          setIsLoggedIn(false);
          setUserType("pilgrim");
        }
      }
    );

    // Initialize auth
    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthSuccess = (user: User, userType: string) => {
    console.log('Auth success:', user.email, userType);
    setUser(user);
    setUserType(userType as "pilgrim" | "agent" | "admin");
    setIsLoggedIn(true);
    setActiveTab("home");
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setSession(null);
        setUserType("pilgrim");
        setActiveTab("home");
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
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
        return userType === "admin" ? <AdminDashboard setActiveTab={setActiveTab} /> : 
               userType === "agent" ? <AgentDashboard /> : <PaymentDashboard />;
      case "support-management":
        return userType === "admin" ? <AdminSupportManagement /> : <SupportChat />;
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
