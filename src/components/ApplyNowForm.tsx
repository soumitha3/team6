
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronLeft, Loader2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { hashPassword } from '../components/utils/auth';

interface ApplyNowFormProps {
  onBack: () => void;
  onClose: () => void;
  backToRegister: () => void;
}


// Define a validation schema
const jobApplicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().refine(value => {
    const date = new Date(value);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    return date <= eighteenYearsAgo;
  }, "You must be at least 18 years old"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  contactNumber: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please provide a complete address"),
  qualifications: z.string().min(3, "Please provide your qualifications"),
  experience: z.string().min(3, "Please provide your experience details"),
  skills: z.string().min(3, "Please list your relevant skills"),
  resumeFile: z.any().optional(),
});

type JobApplicationFormData = z.infer<typeof jobApplicationSchema>;

const ApplyNowForm: React.FC<ApplyNowFormProps> = ({ onBack, onClose }) => {
  const [formData, setFormData] = useState<JobApplicationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    gender: 'male',
    dateOfBirth: '',
    password: '',
    contactNumber: '',
    address: '',
    qualifications: '',
    experience: '',
    skills: '',
    resumeFile: null,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRadioChange = (value: "male" | "female" | "other") => {
    setFormData(prev => ({ ...prev, gender: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      if (fileType === 'application/pdf' || 
          fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFormData(prev => ({ ...prev, resumeFile: file }));
        setFileName(file.name);
        
        // Clear error if exists
        if (errors.resumeFile) {
          setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors.resumeFile;
            return newErrors;
          });
        }
      } else {
        setErrors(prev => ({ ...prev, resumeFile: "Only PDF or DOCX files are allowed" }));
      }
    }
  };

  const validateForm = () => {
    try {
      jobApplicationSchema.parse(formData);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.resumeFile) {
      setErrors(prev => ({ ...prev, resumeFile: "Please upload your resume" }));
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Hash the password
      const hashedPassword = await hashPassword(formData.password);
      
      // Here you'd typically send this data to your backend
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Application submitted successfully!");
      setApplicationStatus("Under Review");
      
      // In a real application, you might want to redirect to a status page
      // instead of closing the modal
      // onClose();
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  function backToRegister(event: React.MouseEvent<HTMLButtonElement>): void {
    // Your logic here
    console.log("Back to register clicked");
  }
  return (
    <div className="p-6 overflow-y-auto max-h-[80vh]">
      <Button 
        variant="ghost" 
        className="mb-4 pl-0 hover:bg-transparent text-muted-foreground" 
        onClick={onBack}
      >
        <ChevronLeft size={16} className="mr-1" />
        Back
      </Button>
      
      {applicationStatus ? (
        <div className="space-y-6 py-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <h3 className="text-lg font-medium text-green-800 mb-2">Application Submitted!</h3>
            <p className="text-sm text-green-700">Your application is currently: <span className="font-semibold">{applicationStatus}</span></p>
            <p className="text-xs text-green-600 mt-2">We will contact you once your application has been processed.</p>
          </div>
          
          <Button 
            onClick={onClose} 
            className="w-full primary-btn btn-transition h-11"
          >
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="form-label">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                className={cn("form-input", errors.firstName && "border-red-500")}
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="form-error">{errors.firstName}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName" className="form-label">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                className={cn("form-input", errors.lastName && "border-red-500")}
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="form-error">{errors.lastName}</p>}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="form-label">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              className={cn("form-input", errors.email && "border-red-500")}
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>
          
          <div className="space-y-2">
            <Label className="form-label">Gender</Label>
            <RadioGroup 
              value={formData.gender} 
              onValueChange={handleRadioChange}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="form-label">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              className={cn("form-input", errors.dateOfBirth && "border-red-500")}
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
            {errors.dateOfBirth && <p className="form-error">{errors.dateOfBirth}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="form-label">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              className={cn("form-input", errors.password && "border-red-500")}
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
            <p className="text-xs text-muted-foreground">Password must be at least 8 characters</p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="form-label">Contact Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              placeholder="Enter your contact number"
              className={cn("form-input", errors.contactNumber && "border-red-500")}
              value={formData.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && <p className="form-error">{errors.contactNumber}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="form-label">Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              className={cn("form-input min-h-[80px]", errors.address && "border-red-500")}
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && <p className="form-error">{errors.address}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="qualifications" className="form-label">Qualifications</Label>
            <Textarea
              id="qualifications"
              name="qualifications"
              placeholder="Enter your qualifications"
              className={cn("form-input min-h-[80px]", errors.qualifications && "border-red-500")}
              value={formData.qualifications}
              onChange={handleChange}
            />
            {errors.qualifications && <p className="form-error">{errors.qualifications}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="experience" className="form-label">Experience</Label>
            <Textarea
              id="experience"
              name="experience"
              placeholder="Describe your work experience"
              className={cn("form-input min-h-[80px]", errors.experience && "border-red-500")}
              value={formData.experience}
              onChange={handleChange}
            />
            {errors.experience && <p className="form-error">{errors.experience}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills" className="form-label">Skills</Label>
            <Textarea
              id="skills"
              name="skills"
              placeholder="List your relevant skills"
              className={cn("form-input min-h-[80px]", errors.skills && "border-red-500")}
              value={formData.skills}
              onChange={handleChange}
            />
            {errors.skills && <p className="form-error">{errors.skills}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="resumeUpload" className="form-label">Upload Resume (PDF or DOCX)</Label>
            <div className="flex items-center gap-2">
              <label className={cn("w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors", errors.resumeFile && "border-red-500")}>
                <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">{fileName || "Click to upload your resume"}</p>
                <Input
                  id="resumeUpload"
                  type="file"
                  accept=".pdf,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {errors.resumeFile && <p className="form-error">{errors.resumeFile}</p>}
          </div>
          
          <Button type="submit" className="w-full primary-btn btn-transition h-11" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
          
        </form>
      )}
    </div>
  );
};

export default ApplyNowForm;
