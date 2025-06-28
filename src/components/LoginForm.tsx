
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LoginFormProps {
  onLogin: (userType: "pilgrim" | "agent" | "admin", username: string) => void;
  onClose: () => void;
}

const LoginForm = ({ onLogin, onClose }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"pilgrim" | "agent" | "admin">("pilgrim");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email: username.includes('@') ? username : `${username}@hajjpathway.com`,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: {
              username,
              user_type: userType,
            }
          }
        });

        if (error) throw error;

        toast({
          title: "Registration Successful",
          description: "Please check your email to confirm your account, then you can login.",
        });
        setIsRegistering(false);
      } else {
        // Check for admin credentials first
        if ((username === "Adebayo" || username === "adebayoajani23@toheebay.online") && password === "Bigtoheeb1@#?") {
          onLogin("admin", "Adebayo");
          toast({
            title: "Admin Login Successful",
            description: "Welcome back, Admin!",
          });
          return;
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: username.includes('@') ? username : `${username}@hajjpathway.com`,
          password,
        });

        if (error) throw error;

        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('user_type, username')
            .eq('id', data.user.id)
            .single();

          if (profile) {
            onLogin(profile.user_type, profile.username);
            toast({
              title: "Login Successful",
              description: `Welcome back, ${profile.username}!`,
            });
          }
        }
      }
    } catch (error: any) {
      toast({
        title: isRegistering ? "Registration Failed" : "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>{isRegistering ? "Register" : "Login"}</CardTitle>
          <CardDescription>
            {isRegistering ? "Create your account" : "Access your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isRegistering && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg text-sm">
                <p className="font-medium text-blue-800">Admin Access:</p>
                <p className="text-blue-700">Username: Adebayo</p>
                <p className="text-blue-700">Password: Bigtoheeb1@#?</p>
              </div>
            )}

            {!isRegistering && (
              <div>
                <Label htmlFor="userType">Account Type</Label>
                <Select value={userType} onValueChange={(value: any) => setUserType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pilgrim">Pilgrim</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div>
              <Label htmlFor="username">
                {isRegistering ? "Username/Email" : "Username or Email"}
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={isRegistering ? "Enter username or email" : "Username or email"}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            {isRegistering && (
              <div>
                <Label htmlFor="userType">Account Type</Label>
                <Select value={userType} onValueChange={(value: any) => setUserType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pilgrim">Pilgrim</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "Processing..." : (isRegistering ? "Register" : "Login")}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm"
            >
              {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
