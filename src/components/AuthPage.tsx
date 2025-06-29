
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-blue-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{isLogin ? "Login" : "Register"}</CardTitle>
          <CardDescription>
            {isLogin ? "Access your Hajj account" : "Create your Hajj account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuth} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required={!isLogin}
                    placeholder="Enter your username"
                  />
                </div>
                
                <div>
                  <Label htmlFor="userType">Account Type</Label>
                  <Select value={userType} onValueChange={(value: any) => setUserType(value)}>
                    <SelectTrigger>
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
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Processing..." : (isLogin ? "Login" : "Register")}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
