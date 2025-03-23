
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Mail, Lock, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import ApplyNowForm from '@/components/ApplyNowForm';
import ParentRegistrationForm from '@/components/ParentRegistrationForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { signInWithGoogle } from '@/lib/firebase';
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab: 'login' | 'register';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [applyFor, setApplyFor] = useState<'job' | 'child' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('parent');

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the actual login logic
    toast.success(`Login successful as ${userRole}`);
    onClose();
    
    // Redirect to appropriate dashboard based on role
    if (userRole === 'admin') {
      window.location.href = '/admin-dashboard';
    } else if (userRole === 'employee') {
      window.location.href = '/employee-dashboard';
    } else if (userRole === 'parent') {
      window.location.href = '/parent-dashboard';
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        toast.success('Google login successful');
        // Redirect after successful login (customize as needed)
        window.location.href = '/parent-dashboard';
      }
    } catch (error) {
      toast.error('Google login failed');
      console.error(error);
    }
  };

  const handleApplyNowClick = () => {
    setActiveTab('apply');
    setApplyFor(null);
  };

  const backToRegisterOptions = () => {
    setActiveTab('apply');
    setApplyFor(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white rounded-xl shadow-2xl">
        <div className="modal-transition">
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-foreground">
              {activeTab === 'login' && 'Welcome Back'}
              {activeTab === 'register' && 'Create Account'}
              {activeTab === 'apply' && !applyFor && 'Apply Now'}
              {activeTab === 'apply' && applyFor === 'job' && 'Job Application'}
              {activeTab === 'apply' && applyFor === 'child' && 'Child Registration'}
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8">
              <X size={18} />
            </Button>
          </div>

          {activeTab !== 'apply' || applyFor ? (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-6 pt-3">
                <TabsList className="grid w-full grid-cols-2 bg-muted rounded-lg">
                  <TabsTrigger value="login" className="rounded-md data-[state=active]:shadow-sm text-sm font-medium">
                    Login
                  </TabsTrigger>
                  <TabsTrigger value="register" className="rounded-md data-[state=active]:shadow-sm text-sm font-medium">
                    Register
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="login" className="p-6 pt-4 animate-fade-in">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="form-label">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="form-input pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="password" className="form-label">Password</Label>
                      <a href="#" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        className="form-input pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="userRole" className="form-label">User Role</Label>
                    <Select 
                      value={userRole} 
                      onValueChange={(value) => setUserRole(value)}
                    >
                      <SelectTrigger id="userRole" className="w-full">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full primary-btn btn-transition h-11">
                    Login
                  </Button>

                  <div className="relative flex items-center justify-center">
                    <div className="absolute border-t border-gray-200 w-full"></div>
                    <div className="relative bg-white px-4 text-sm text-gray-500">Or continue with</div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 flex items-center justify-center space-x-2 border border-gray-300 btn-transition"
                    onClick={handleGoogleLogin}
                  >
                    <Globe size={18} />
                    <span>Google</span>
                  </Button>

                  <div className="pt-1 text-center">
                    <p className="text-sm text-muted-foreground">
                      Want to apply for a job or register a child?{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={handleApplyNowClick}
                      >
                        Apply Now
                      </button>
                    </p>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="register" className="p-6 pt-4 animate-fade-in">
                <div className="space-y-4 text-center">
                  <p className="text-sm text-muted-foreground mb-2">What would you like to register for?</p>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={handleApplyNowClick}
                      className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors group"
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium text-base">Apply Now</h3>
                      <p className="text-sm text-muted-foreground mt-1">Register for a job or child services</p>
                    </button>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => setActiveTab('login')}
                      >
                        Login
                      </button>
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : applyFor ? null : (
            <div className="p-6 animate-fade-in space-y-4">
              <p className="text-sm text-muted-foreground mb-2 text-center">What are you applying for?</p>
              
              <div className="grid grid-cols-1 gap-3">
                <button
                  onClick={() => setApplyFor('job')}
                  className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors group"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-base">Job Application</h3>
                  <p className="text-sm text-muted-foreground mt-1">Apply for employment opportunities</p>
                </button>
                
                <button
                  onClick={() => setApplyFor('child')}
                  className="flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors group"
                >
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-base">Child Registration</h3>
                  <p className="text-sm text-muted-foreground mt-1">Register a child for our programs</p>
                </button>
              </div>
              
              <div className="pt-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setActiveTab('login')}
                  >
                    Login
                  </button>
                </p>
              </div>
            </div>
          )}

          {activeTab === 'apply' && applyFor === 'job' && (
            <div className="animate-fade-in">
              <ApplyNowForm onBack={backToRegisterOptions} onClose={onClose} backToRegister={function (): void {
                throw new Error('Function not implemented.');
              } } />
            </div>
          )}

          {activeTab === 'apply' && applyFor === 'child' && (
            <div className="animate-fade-in">
              <ParentRegistrationForm onBack={backToRegisterOptions} onClose={onClose} backToRegister={function (): void {
                throw new Error('Function not implemented.');
              } } />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
