'use client'

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, UserPlus, Mail, Lock, User, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from "sonner";
import { userSchema } from '@/utils/userType';
import {useDebounce} from 'use-debounce';



const Register = () => {
  const router = useRouter();
 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userMainId, setUserMainId] = useState<string>('');
  const [debouncedserMainId] = useDebounce(userMainId, 500);

 const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    userType: 'Student' as 'Student' | 'Registrar' | 'Teacher' | 'Department' | 'President',
    gender: 'M' as 'M' | 'F',
    nationality: '',
    userMainId: debouncedserMainId, // Use debounced value for userMainId
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Update the fetchStudent function to handle errors properly
const fetchStudent = async (debouncedserMainId: string) => {
  if (!debouncedserMainId) return;
  try {
    setIsLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tempstudents/student-main-id/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentMainId: debouncedserMainId }),
    });

    if (!response.ok) {
      setErrors(prev => ({ ...prev, userMainId: 'User Main ID not found' }));
      return;
    }
    const data = await response.json();
    setFormData(prev => ({
      ...prev,
      firstName: data.firstName,
      middleName: data.middleName || '',
      lastName: data.lastName,
      userMainId: data.userMainId || debouncedserMainId, // always set userMainId
    }));
    setErrors(prev => ({ ...prev, userMainId: '' })); // clear userMainId error after success
  } catch (error) {
    setErrors(prev => ({ ...prev, userMainId: 'Failed to fetch student data' }));
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
  if (debouncedserMainId) {
    fetchStudent(debouncedserMainId);
  }
}, [debouncedserMainId]);



  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserMainId(value);
    setFormData(prev => ({ ...prev, userMainId: value }));
    if (errors.userMainId) {
      setErrors(prev => ({ ...prev, userMainId: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsed = userSchema.safeParse(formData);
    if (!parsed.success) {
      const filledErrors: Record<string, string> = {};
      parsed.error.errors.forEach(error => {
        filledErrors[error.path[0] as string] = error.message;
      });
      setErrors(filledErrors);
      return;
    }

    // Confirm password check (frontend only)
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return;
    }

    setIsLoading(true);
    
    try {
      // Exclude confirmPassword from API payload
      const { confirmPassword,  ...apiData } = formData;

      console.log(apiData);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
        if (!response.ok) {
            throw new Error('Registration failed');
            }

        const responseData = await response.json();
        console.log(responseData);
      toast("Registration Successful",{
        description: "Your account has been created successfully!",
      });
      
      router.push('/auth/login');
    } catch (error) {
      toast("Registration Failed", {
        description: "Something went wrong. Please try again.",
        style: {
            backgroundColor: '#f8d7da',
            color: '#721c24',
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Join the student portal to get started
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pb-5">
            {/* Basic Information */}

            <div className="space-y-4 relative">
              <Label className="text-sm font-medium text-gray-700">
                Put your Unique ID here <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                 name='userMainId'
                  type="text"
                  placeholder="Enter your Unique ID"
                  value={userMainId}
                  onChange={handleIdChange}
                  className={`${isLoading ? "rounded-full" : "w-full h-10 px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"}`}
                />
                {errors.uniqueId && (
                  <p className="text-red-500 text-sm absolute top-full left-0 mt-1">
                    {errors.uniqueId}
                  </p>
                )}
                
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium flex items-center gap-2">
                    <User className="w-4 h-4" />
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    readOnly={!!userMainId}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="middleName" className="text-sm font-medium">
                    Middle Name
                  </Label>
                  <Input
                    id="middleName"
                    name="middleName"
                    type="text"
                    value={formData.middleName}
                    onChange={handleChange}
                    readOnly={!!userMainId}
                  />
                  {errors.middleName && (
                    <p className="text-red-500 text-sm">{errors.middleName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    readOnly={!!userMainId}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`w-full h-10 px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 ${errors.gender ? "border-red-500" : "border-input"}`}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm">{errors.gender}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationality" className="text-sm font-medium">
                    Nationality <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nationality"
                    name="nationality"
                    type="text"
                    placeholder="Ethiopian"
                    value={formData.nationality}
                    onChange={handleChange}
                    className={errors.nationality ? "border-red-500" : ""}
                  />
                  {errors.nationality && (
                    <p className="text-red-500 text-sm">{errors.nationality}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="+251912345678"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={errors.phoneNumber ? "border-red-500" : ""}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
            </div>

           

            {/* Security Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Security Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-12">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  href="/auth/login" 
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                >
                  Sign In
                </Link>
              </span>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;