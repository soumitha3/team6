
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { cn } from '@/lib/utils';

interface ParentRegistrationFormProps {
  onBack: () => void;
  onClose: () => void;
  backToRegister: () => void; 
}

// Define a validation schema
const parentRegistrationSchema = z.object({
  parentName: z.string().min(2, "Parent name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  childName: z.string().min(2, "Child name must be at least 2 characters"),
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  primaryDiagnosis: z.string().min(1, "Please select a diagnosis"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  motherName: z.string().min(2, "Mother's name must be at least 2 characters"),
  bloodGroup: z.string().min(1, "Please select a blood group"),
  contactNumber: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please provide a complete address"),
  strengths: z.string().min(3, "Please provide your child's strengths"),
  weaknesses: z.string().min(3, "Please provide areas where your child needs support"),
});

type ParentRegistrationFormData = z.infer<typeof parentRegistrationSchema>;

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const diagnoses = [
  'Autism Spectrum Disorder',
  'Asperger\'s Syndrome',
  'Learning Disability',
  'Down syndrome',
  'Attention Deficit Hyperactivity Disorder'
];

const ParentRegistrationForm: React.FC<ParentRegistrationFormProps> = ({ onBack, onClose }) => {
  const [formData, setFormData] = useState<ParentRegistrationFormData>({
    parentName: '',
    email: '',
    childName: '',
    gender: 'male',
    dateOfBirth: '',
    primaryDiagnosis: '',
    fatherName: '',
    motherName: '',
    bloodGroup: '',
    contactNumber: '',
    address: '',
    strengths: '',
    weaknesses: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user selects
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

  const validateForm = () => {
    try {
      parentRegistrationSchema.parse(formData);
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
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you'd typically send this data to your backend
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Child registration submitted successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to submit registration. Please try again.");
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
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="parentName" className="form-label">Parent Name</Label>
          <Input
            id="parentName"
            name="parentName"
            placeholder="Enter parent's full name"
            className={cn("form-input", errors.parentName && "border-red-500")}
            value={formData.parentName}
            onChange={handleChange}
          />
          {errors.parentName && <p className="form-error">{errors.parentName}</p>}
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
          <Label htmlFor="childName" className="form-label">Child's Name</Label>
          <Input
            id="childName"
            name="childName"
            placeholder="Enter child's full name"
            className={cn("form-input", errors.childName && "border-red-500")}
            value={formData.childName}
            onChange={handleChange}
          />
          {errors.childName && <p className="form-error">{errors.childName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label className="form-label">Gender</Label>
          <RadioGroup 
            value={formData.gender} 
            onValueChange={handleRadioChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="child-male" />
              <Label htmlFor="child-male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="child-female" />
              <Label htmlFor="child-female">Female</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="child-other" />
              <Label htmlFor="child-other">Other</Label>
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
          <Label htmlFor="primaryDiagnosis" className="form-label">Primary Diagnosis</Label>
          <Select 
            value={formData.primaryDiagnosis} 
            onValueChange={(value) => handleSelectChange('primaryDiagnosis', value)}
          >
            <SelectTrigger id="primaryDiagnosis" className={cn("w-full", errors.primaryDiagnosis && "border-red-500")}>
              <SelectValue placeholder="Select a diagnosis" />
            </SelectTrigger>
            <SelectContent>
              {diagnoses.map((diagnosis) => (
                <SelectItem key={diagnosis} value={diagnosis}>
                  {diagnosis}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.primaryDiagnosis && <p className="form-error">{errors.primaryDiagnosis}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="childName" className="form-label">UDID</Label>
          <Input
            id="UDID"
            name="UDID"
            placeholder="Enter UDID"
            className={cn("form-input", errors.childName && "border-red-500")}
            value={formData.childName}
            onChange={handleChange}
          />
          {errors.childName && <p className="form-error">{errors.childName}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fatherName" className="form-label">Father's Name</Label>
            <Input
              id="fatherName"
              name="fatherName"
              placeholder="Enter father's name"
              className={cn("form-input", errors.fatherName && "border-red-500")}
              value={formData.fatherName}
              onChange={handleChange}
            />
            {errors.fatherName && <p className="form-error">{errors.fatherName}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="motherName" className="form-label">Mother's Name</Label>
            <Input
              id="motherName"
              name="motherName"
              placeholder="Enter mother's name"
              className={cn("form-input", errors.motherName && "border-red-500")}
              value={formData.motherName}
              onChange={handleChange}
            />
            {errors.motherName && <p className="form-error">{errors.motherName}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bloodGroup" className="form-label">Blood Group</Label>
          <Select 
            value={formData.bloodGroup} 
            onValueChange={(value) => handleSelectChange('bloodGroup', value)}
          >
            <SelectTrigger id="bloodGroup" className={cn("w-full", errors.bloodGroup && "border-red-500")}>
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.bloodGroup && <p className="form-error">{errors.bloodGroup}</p>}
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
          <Label htmlFor="strengths" className="form-label">Child's Strengths</Label>
          <Textarea
            id="strengths"
            name="strengths"
            placeholder="Describe your child's strengths"
            className={cn("form-input min-h-[80px]", errors.strengths && "border-red-500")}
            value={formData.strengths}
            onChange={handleChange}
          />
          {errors.strengths && <p className="form-error">{errors.strengths}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="weaknesses" className="form-label">Areas Needing Support</Label>
          <Textarea
            id="weaknesses"
            name="weaknesses"
            placeholder="Describe areas where your child needs support"
            className={cn("form-input min-h-[80px]", errors.weaknesses && "border-red-500")}
            value={formData.weaknesses}
            onChange={handleChange}
          />
          {errors.weaknesses && <p className="form-error">{errors.weaknesses}</p>}
        </div>
        
        <Button type="submit" className="w-full primary-btn btn-transition h-11" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Registration"
          )}
        </Button>
        <button onClick={backToRegister}>Back to Register</button>
      </form>
    </div>
  );
};

export default ParentRegistrationForm;
