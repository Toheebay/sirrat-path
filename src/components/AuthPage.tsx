
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthPageProps {
  onAuthSuccess: (user: User, userType: string) => void;
}

const AuthPage = ({ onAuthSuccess }: AuthPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState<"pilgrim" | "agent" | "admin">("pilgrim");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('user_type')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          onAuthSuccess(session.user, profile.user_type);
        }
      }
    };
    checkUser();
  }, [onAuthSuccess]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Check for admin credentials first
        if (email === "adebayoajani23@toheebay.online" && password === "toheeb1") {
          // Try to login with admin credentials
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            // If admin user doesn't exist, create them
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${window.location.origin}/`,
                data: {
                  username: "Admin",
                  user_type: "admin",
                }
              }
            });

            if (signUpError) throw signUpError;

            toast({
              title: "Admin Account Created",
              description: "Admin account created and logged in successfully",
            });

            if (signUpData.user) {
              onAuthSuccess(signUpData.user, "admin");
            }
          } else if (data.user) {
            // Admin login successful
            onAuthSuccess(data.user, "admin");
            toast({
              title: "Admin Login Successful",
              description: "Welcome back, Admin!",
            });
          }
          return;
        }

        // Handle regular login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        if (data.user) {
          // Fetch user profile to get user type
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_type')
            .eq('id', data.user.id)
            .single();

          if (profile) {
            onAuthSuccess(data.user, profile.user_type);
            toast({
              title: "Login Successful",
              description: "Welcome back!",
            });
          } else {
            throw new Error("User profile not found");
          }
        }
      } else {
        // Handle registration
        if (!username.trim()) {
          throw new Error("Username is required for registration");
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              username: username.trim(),
              user_type: userType,
            }
          }
        });

        if (error) throw error;

        if (data.user) {
          if (data.user.email_confirmed_at) {
            // User is immediately confirmed, log them in
            const { data: profile } = await supabase
              .from('profiles')
              .select('user_type')
              .eq('id', data.user.id)
              .single();

            if (profile) {
              onAuthSuccess(data.user, profile.user_type);
              toast({
                title: "Registration Successful",
                description: "Welcome! Your account has been created.",
              });
            }
          } else {
            // User needs email confirmation
            toast({
              title: "Registration Successful",
              description: "Please check your email to confirm your account, then you can login.",
            });
            
            // Switch to login mode after successful registration
            setIsLogin(true);
            setPassword("");
          }
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with Islamic architecture pattern */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-amber-50 via-emerald-50 to-blue-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Kaaba and Clock Tower silhouettes */}
      <div className="absolute top-10 left-10 opacity-10">
        <div className="w-16 h-16 bg-gray-800 rounded-lg"></div>
      </div>
      <div className="absolute top-5 right-20">
        <div className="w-8 h-20 bg-gray-700 opacity-10 rounded-t-full"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-4">
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            {/* Logo Section */}
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white text-2xl">🕌</span>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">▲</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-900">
                ABDULLATEEF INTEGRATED
              </CardTitle>
              <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Hajj & Umrah Ltd.
              </p>
              <CardDescription className="text-base font-medium text-emerald-700 mt-3">
                {isLogin ? "Welcome back to your Hajj journey" : "Begin your sacred journey with us"}
              </CardDescription>
              <p className="text-xs text-gray-500 mt-2">
                Perform Hajj 2026 with Hon. Iyepe
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="username" className="text-sm font-medium text-gray-700">Full Name</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required={!isLogin}
                      placeholder="Enter your full name"
                      className="mt-1 h-11"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="userType" className="text-sm font-medium text-gray-700">Account Type</Label>
                    <Select value={userType} onValueChange={(value: any) => setUserType(value)}>
                      <SelectTrigger className="mt-1 h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pilgrim">Pilgrim</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="mt-1 h-11"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="mt-1 h-11"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold shadow-lg" 
                disabled={loading}
              >
                {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
              </Button>
            </form>

            {/* Pay Small Small Feature */}
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
              <div className="flex items-center space-x-3">
                <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  PAY SMALL SMALL
                </div>
                <div className="text-sm text-amber-800">
                  <p className="font-semibold">Flexible Payment Plan Available</p>
                  <p className="text-xs">Start your Hajj journey with affordable payments</p>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-red-600 text-white p-3 rounded-lg text-center">
              <p className="text-sm font-bold">LOTUS BANK</p>
              <p className="text-lg font-mono font-bold">1000019078</p>
              <p className="text-xs opacity-90">Account Number</p>
            </div>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-emerald-700 hover:text-emerald-800"
              >
                {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
