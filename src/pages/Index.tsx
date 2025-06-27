
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import RegistrationForm from "@/components/RegistrationForm";
import PaymentDashboard from "@/components/PaymentDashboard";
import DocumentUpload from "@/components/DocumentUpload";
import AgentDashboard from "@/components/AgentDashboard";
import NotificationCenter from "@/components/NotificationCenter";
import SupportChat from "@/components/SupportChat";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";
import AdminDashboard from "@/components/AdminDashboard";
import NewsMarquee from "@/components/NewsMarquee";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userType, setUserType] = useState<"pilgrim" | "agent" | "admin">("pilgrim");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Header 
        userType={userType} 
        setUserType={setUserType} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="hidden" />
        
        <TabsContent value="home" className="mt-0">
          <HeroSection setActiveTab={setActiveTab} />
          <FeatureCards />
        </TabsContent>

        <TabsContent value="register" className="mt-0">
          <div className="container mx-auto px-4 py-8">
            <RegistrationForm />
          </div>
        </TabsContent>

        <TabsContent value="payments" className="mt-0">
          <div className="container mx-auto px-4 py-8">
            <PaymentDashboard />
          </div>
        </TabsContent>

        <TabsContent value="documents" className="mt-0">
          <div className="container mx-auto px-4 py-8">
            <DocumentUpload />
          </div>
        </TabsContent>

        <TabsContent value="dashboard" className="mt-0">
          <div className="container mx-auto px-4 py-8">
            {userType === "admin" ? (
              <AdminDashboard />
            ) : userType === "agent" ? (
              <AgentDashboard />
            ) : (
              <PaymentDashboard />
            )}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-0">
          <div className="container mx-auto px-4 py-8">
            <NotificationCenter />
          </div>
        </TabsContent>

        <TabsContent value="support" className="mt-0">
          <div className="container mx-auto px-4 py-8">
            <SupportChat />
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-0">
          <div className="container mx-auto px-4 py-8">
            <ResourcesSection />
          </div>
        </TabsContent>
      </Tabs>

      <Footer setActiveTab={setActiveTab} />
      <NewsMarquee />
    </div>
  );
};

export default Index;
