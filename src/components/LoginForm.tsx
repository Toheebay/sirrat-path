
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (userType: "pilgrim" | "agent" | "admin", username: string) => void;
  onClose: () => void;
}

const LoginForm = ({ onLogin, onClose }: LoginFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"pilgrim" | "agent" | "admin">("pilgrim");
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Simple validation - in real app, this would be server-side
    const validCredentials = {
      pilgrim: { username: "pilgrim", password: "pilgrim123" },
      agent: { username: "agent", password: "agent123" },
      admin: { username: "admin", password: "admin123" }
    };

    if (isRegistering) {
      // Simulate registration
      toast({
        title: "Registration Successful",
        description: `Welcome ${username}! You can now login with your credentials.`,
      });
      setIsRegistering(false);
      return;
    }

    // Validate credentials
    const expectedCreds = validCredentials[userType];
    if (username === expectedCreds.username && password === expectedCreds.password) {
      onLogin(userType, username);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${username}!`,
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
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
            
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
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
              />
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1">
                {isRegistering ? "Register" : "Login"}
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
          
          {!isRegistering && (
            <div className="mt-4 text-xs text-gray-600 space-y-1">
              <p><strong>Demo Credentials:</strong></p>
              <p>Pilgrim: pilgrim / pilgrim123</p>
              <p>Agent: agent / agent123</p>
              <p>Admin: admin / admin123</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
