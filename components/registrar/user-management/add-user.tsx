"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  Plus,
  X,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { userSchema } from "@/utils/userType";
import { sendUserCredentials, logEmailAttempt } from "@/utils/emailService";

interface Department {
  id: number;
  collegeId: number;
  name: string;
  code: string;
  createdAt: string;
}

const Register = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userMainId, setUserMainId] = useState<string>("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<Department[]>(
    []
  );
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [authority, setAuthority] = useState<string>("");
  const [departmentSearch, setDepartmentSearch] = useState<string>("");
  const [showDepartmentResults, setShowDepartmentResults] = useState(false);
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);

  const initialFormData = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    userType: "" as "" | "Teacher" | "Department" | "Registrar",
    gender: "M" as "M" | "F",
    nationality: "",
    userMainId: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  // Fetch all departments on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/departments`
        );
        if (response.ok) {
          const data = await response.json();
          setAllDepartments(data);
        }
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Filter departments based on search input
  useEffect(() => {
    if (departmentSearch.trim() === "") {
      setDepartments([]);
      setShowDepartmentResults(false);
      return;
    }

    const filtered = allDepartments.filter(
      (dept) =>
        dept.name.toLowerCase().includes(departmentSearch.toLowerCase()) ||
        dept.code.toLowerCase().includes(departmentSearch.toLowerCase())
    );
    setDepartments(filtered);
    setShowDepartmentResults(true);
  }, [departmentSearch, allDepartments]);

  // Function to add department to the list (for Teacher)
  const addDepartment = (department: Department) => {
    if (!selectedDepartments.find((d) => d.id === department.id)) {
      setSelectedDepartments([...selectedDepartments, department]);
    }
    setDepartmentSearch("");
    setShowDepartmentResults(false);
  };

  // Function to remove department from the list (for Teacher)
  const removeDepartment = (deptId: number) => {
    setSelectedDepartments(selectedDepartments.filter((d) => d.id !== deptId));
  };

  // Function to select department (for Department user type)
  const selectDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setDepartmentSearch(department.name);
    setShowDepartmentResults(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Regenerate user ID and password if first name or last name changes and user type is selected
    if ((name === "firstName" || name === "lastName") && formData.userType) {
      const newFirstName = name === "firstName" ? value : formData.firstName;
      const newLastName = name === "lastName" ? value : formData.lastName;
      if (newFirstName && newLastName) {
        const generatedId = generateUserId(
          newFirstName,
          newLastName,
          formData.userType
        );
        const generatedPassword = generatePassword(
          newFirstName,
          newLastName,
          formData.userType
        );
        setUserMainId(generatedId);
        setFormData((prev) => ({
          ...prev,
          userMainId: generatedId,
          password: generatedPassword,
          confirmPassword: generatedPassword,
        }));
      }
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Function to generate user ID
  const generateUserId = (
    firstName: string,
    lastName: string,
    userType: string
  ) => {
    if (!firstName || !lastName || !userType) return "";

    // Get current day number
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");

    // Format: Abebe-Kebede-08
    return `${firstName}-${day}`;
  };

  // Function to generate password based on name, user type, and date
  const generatePassword = (
    firstName: string,
    lastName: string,
    userType: string
  ) => {
    if (!firstName || !lastName || !userType) return "";

    // Get first 4 letters of first name (capitalize first letter)
    const firstNamePart =
      firstName.charAt(0).toUpperCase() + firstName.slice(1, 4).toLowerCase();

    // Get first 4 letters of last name (lowercase)
    const lastNamePart = lastName.slice(0, 4).toLowerCase();

    // Get user type abbreviation (lowercase)
    const userTypePart = userType.toLowerCase();

    // Get current date in DD-MM-YYYY format
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const datePart = `${day}${month}${year}`;

    // Format: Ruphkass@dep05082021
    return `${firstNamePart}${lastNamePart}@${userTypePart}${datePart}`;
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserMainId(value);
    setFormData((prev) => ({ ...prev, userMainId: value }));
    if (errors.userMainId) {
      setErrors((prev) => ({ ...prev, userMainId: "" }));
    }
  };

  // Auto-generate user ID and password when user type is selected and names are available
  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear previous user type specific data
    setSelectedDepartments([]);
    setSelectedDepartment(null);
    setAuthority("");
    setDepartmentSearch("");

    // Generate user ID and password if all required fields are available
    if (value && formData.firstName && formData.lastName) {
      const generatedId = generateUserId(
        formData.firstName,
        formData.lastName,
        value
      );
      const generatedPassword = generatePassword(
        formData.firstName,
        formData.lastName,
        value
      );
      setUserMainId(generatedId);
      setFormData((prev) => ({
        ...prev,
        userMainId: generatedId,
        password: generatedPassword,
        confirmPassword: generatedPassword,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Function to send credentials email
  const sendCredentialsToUser = async () => {
    console.log("sendCredentialsToUser called");
    console.log("Form data:", {
      ...formData,
      password: "***",
      confirmPassword: "***",
    });
    console.log("User Main ID:", userMainId);

    if (!formData.email) {
      console.error("No email address provided");
      toast("Email Not Sent", {
        description: "No email address provided for the user",
        style: {
          backgroundColor: "#fff3cd",
          color: "#856404",
        },
      });
      return;
    }

    console.log("Calling sendUserCredentials...");
    const emailResult = await sendUserCredentials(
      userMainId,
      formData.password,
      formData.firstName,
      formData.lastName,
      formData.userType,
      formData.email
    );

    console.log("Email result:", emailResult);

    // Log the email attempt
    logEmailAttempt(
      emailResult.success,
      formData.email,
      formData.userType,
      emailResult.success ? undefined : emailResult.message
    );

    if (emailResult.success) {
      toast("Credentials Sent", {
        description: emailResult.message,
        style: {
          backgroundColor: "#d4edda",
          color: "#155724",
        },
      });
    } else {
      toast("Email Failed", {
        description: emailResult.message,
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
        },
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const parsed = userSchema.safeParse(formData);
    if (!parsed.success) {
      const filledErrors: Record<string, string> = {};
      parsed.error.errors.forEach((error) => {
        filledErrors[error.path[0] as string] = error.message;
      });
      setErrors(filledErrors);
      return;
    }

    // Confirm password check (frontend only)
    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    // Validate user type specific requirements
    if (formData.userType === "Teacher" && selectedDepartments.length === 0) {
      toast("Validation Error", {
        description: "Please add at least one department for Teacher",
      });
      return;
    }

    if (
      formData.userType === "Department" &&
      (!selectedDepartment || !authority)
    ) {
      toast("Validation Error", {
        description:
          "Please select a department and enter authority for Department user",
      });
      return;
    }

    if (formData.userType === "Registrar" && !authority) {
      toast("Validation Error", {
        description: "Please enter authority for Registrar user",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Exclude confirmPassword from API payload
      const { confirmPassword, ...apiData } = formData;

      console.log(apiData);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );
      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const responseData = await response.json();

      // Create specific user type based on user type
      if (formData.userType === "Teacher") {
        const teacherResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/teachers`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: await responseData.id,
              departments: selectedDepartments.map((d) => d.id),
            }),
          }
        );
        if (!teacherResponse.ok) {
          throw new Error("Teacher creation failed");
        }
        toast("Registration Successful", {
          description: `A Teacher user account has been created successfully!`,
        });
      } else if (formData.userType === "Department") {
        const departmentResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/department-users`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: responseData.id,
              departmentId: selectedDepartment?.id,
              authority: authority,
            }),
          }
        );
        if (!departmentResponse.ok) {
          throw new Error("Department user creation failed");
        }
        toast("Registration Successful", {
          description: `A Department user account has been created successfully!`,
        });
      } else if (formData.userType === "Registrar") {
        const registrarResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/registrars`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: responseData.id,
              authority: authority,
            }),
          }
        );
        if (!registrarResponse.ok) {
          throw new Error("Registrar creation failed");
        }
        toast("Registration Successful", {
          description: `A Registrar user account has been created successfully!`,
        });
      }

      // Send credentials email after successful user creation
      await sendCredentialsToUser();

      //router.push("/auth/login");
    } catch (error) {
      toast("Registration Failed", {
        description: "Something went wrong. Please try again.",
        style: {
          backgroundColor: "#f8d7da",
          color: "#721c24",
        },
      });
    } finally {
      setSelectedDepartments([]);
      setSelectedDepartment(null);
      setAuthority("");
      setDepartmentSearch("");
      setUserMainId("");
      setFormData(initialFormData);
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
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
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
                    className={`w-full h-10 px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 ${
                      errors.gender ? "border-red-500" : "border-input"
                    }`}
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

            {/* User Type Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                User Type
              </h3>

              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm font-medium">
                  User Type <span className="text-red-500">*</span>
                </Label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleUserTypeChange}
                  className={`w-full h-10 px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 ${
                    errors.userType ? "border-red-500" : "border-input"
                  }`}
                >
                  <option value="">Select User Type</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Department">Department</option>
                  <option value="Registrar">Registrar</option>
                </select>
                {errors.userType && (
                  <p className="text-red-500 text-sm">{errors.userType}</p>
                )}
              </div>

              {/* Conditional UI based on user type */}
              {formData.userType === "Teacher" && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800">
                    Teacher Configuration
                  </h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Search Departments{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Search departments by name or code..."
                          value={departmentSearch}
                          onChange={(e) => setDepartmentSearch(e.target.value)}
                          className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      </div>
                      {showDepartmentResults && departments.length > 0 && (
                        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                          {departments.map((dept) => (
                            <div
                              key={dept.id}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                              onClick={() => addDepartment(dept)}
                            >
                              <div className="font-medium">{dept.name}</div>
                              <div className="text-sm text-gray-500">
                                {dept.code}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    {selectedDepartments.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Selected Departments:
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {selectedDepartments.map((dept) => (
                            <div
                              key={dept.id}
                              className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full"
                            >
                              <span className="text-sm">
                                {dept.name} ({dept.code})
                              </span>
                              <button
                                type="button"
                                onClick={() => removeDepartment(dept.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {formData.userType === "Department" && (
                <div className="space-y-4 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">
                    Department Configuration
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="departmentId"
                        className="text-sm font-medium"
                      >
                        Department <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="departmentId"
                          type="text"
                          placeholder="Search and select department..."
                          value={departmentSearch}
                          onChange={(e) => setDepartmentSearch(e.target.value)}
                          className="pr-10"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        {showDepartmentResults && departments.length > 0 && (
                          <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {departments.map((dept) => (
                              <div
                                key={dept.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                                onClick={() => selectDepartment(dept)}
                              >
                                <div className="font-medium">{dept.name}</div>
                                <div className="text-sm text-gray-500">
                                  {dept.code}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="authority"
                        className="text-sm font-medium"
                      >
                        Authority <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="authority"
                        type="text"
                        placeholder="e.g., Head Department"
                        value={authority}
                        onChange={(e) => setAuthority(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {formData.userType === "Registrar" && (
                <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-800">
                    Registrar Configuration
                  </h4>
                  <div className="space-y-2">
                    <Label
                      htmlFor="registrarAuthority"
                      className="text-sm font-medium"
                    >
                      Authority <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="registrarAuthority"
                      type="text"
                      placeholder="e.g., Reg Officer"
                      value={authority}
                      onChange={(e) => setAuthority(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Generated Unique ID
              </h3>
              <div className="space-y-2">
                <Label htmlFor="userMainId" className="text-sm font-medium">
                  User ID <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="userMainId"
                    name="userMainId"
                    type="text"
                    placeholder="Auto-generated based on name and user type"
                    value={userMainId}
                    onChange={handleIdChange}
                    readOnly={!!formData.userType}
                    className={`${
                      isLoading
                        ? "rounded-full"
                        : "w-full h-10 px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-50"
                    }`}
                  />
                  {errors.userMainId && (
                    <p className="text-red-500 text-sm absolute top-full left-0 mt-1">
                      {errors.userMainId}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  User ID will be auto-generated when you select a user type and
                  enter your name
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium flex items-center gap-2"
                  >
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
                  <p className="text-xs text-gray-500">
                    Credentials will be sent to this email address
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="phoneNumber"
                    className="text-sm font-medium flex items-center gap-2"
                  >
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
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Security Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Auto-generated based on name and user type"
                      value={formData.password}
                      onChange={handleChange}
                      readOnly={!!formData.userType}
                      className={`${errors.password ? "border-red-500" : ""} ${
                        formData.userType ? "bg-gray-50" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    Password will be auto-generated when you select a user type
                    and enter your name
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Auto-generated based on name and user type"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      readOnly={!!formData.userType}
                      className={`${
                        errors.confirmPassword ? "border-red-500" : ""
                      } ${formData.userType ? "bg-gray-50" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Confirm password will be auto-generated when you select a
                    user type and enter your name
                  </p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-12">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
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
