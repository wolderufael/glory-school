"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  WalletCards, CreditCard, Smartphone, Banknote, 
  CheckCircle, ArrowLeft, Loader2 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

interface FeeMonth {
  id: string;
  month: string;
  year: string;
  amount: number;
  status: 'paid' | 'unpaid' | 'overdue';
  dueDate?: string;
}

interface ChildStudent {
  id: string;
  name: string;
  program: string;
  class: number;
  monthlyFee: number;
  feeMonths: FeeMonth[];
}

const demoChildren: ChildStudent[] = [
  {
    id: "stu-1001",
    name: "Abel Mekonnen",
    program: "Natural Science",
    class: 12,
    monthlyFee: 2500,
    feeMonths: [
      { id: "2024-09", month: "September", year: "2024", amount: 2500, status: "paid" },
      { id: "2024-10", month: "October", year: "2024", amount: 2500, status: "overdue", dueDate: "2024-10-05" },
      { id: "2024-11", month: "November", year: "2024", amount: 2500, status: "unpaid" },
      { id: "2024-12", month: "December", year: "2024", amount: 2500, status: "unpaid" },
    ]
  },
  {
    id: "stu-1002",
    name: "Sena Kebede",
    program: "Social Science",
    class: 12,
    monthlyFee: 2800,
    feeMonths: [
      { id: "2024-09", month: "September", year: "2024", amount: 2800, status: "paid" },
      { id: "2024-10", month: "October", year: "2024", amount: 2800, status: "overdue", dueDate: "2024-10-05" },
      { id: "2024-11", month: "November", year: "2024", amount: 2800, status: "unpaid" },
    ]
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "paid": return <Badge variant="default">Paid</Badge>;
    case "overdue": return <Badge variant="destructive">Overdue</Badge>;
    default: return <Badge variant="outline">Pending</Badge>;
  }
};

const PaymentIcons = {
  telebirr: <Image src="/tellebirr.png" alt="Telebirr" width={20} height={20} />,
  cbe: <Image src="/cbe.jpeg" alt="CBE" width={30} height={30} />,
  awash: <Image src="/awash.png" alt="Awash" width={20} height={20} />, 
  Mpessa: <Image src="/m-pesa.png" alt="Mpesa" width={40} height={20} />,
};

const CheckoutPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [paymentMethod, setPaymentMethod] = useState("telebirr");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState("");
  
  // Get data from query parameters
  const studentId = params.get("studentId") || "";
  const monthIds = params.get("months")?.split(",") || [];
  const totalAmount = Number(params.get("total")) || 0;
  
  // Find selected student
  const selectedStudent = demoChildren.find(c => c.id === studentId) || demoChildren[0];
  
  // Get selected months data
  const selectedMonths = selectedStudent.feeMonths
    .filter(month => monthIds.includes(month.id));
  
  // Generate confirmation number
  useEffect(() => {
    if (isConfirmed) {
      const confNum = `PAY-${Date.now().toString(36).toUpperCase()}`;
      setConfirmationNumber(confNum);
    }
  }, [isConfirmed]);

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsConfirmed(true);
      
      // In real app: update payment status in backend
    }, 2000);
  };

  const handleBackToPayments = () => {
    router.push(`/parent/payment?studentId=${studentId}`);
  };

  const handleGoToDashboard = () => {
    router.push("/parent");
  };

  if (!studentId || monthIds.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle>Payment Information Missing</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-slate-600">
              We couldn't find the payment details. Please go back and select months to pay.
            </p>
            <Button onClick={handleBackToPayments}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Payments
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <WalletCards className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800">
            {isConfirmed ? "Payment Confirmed" : "Complete Payment"}
          </h1>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-between items-center mb-10 relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 z-0"></div>
          
          <div className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${isConfirmed ? 'bg-green-500' : 'bg-blue-600'}`}>
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <span className="mt-2 text-sm font-medium">Payment Details</span>
          </div>
          
          <div className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${isConfirmed ? 'bg-green-500' : isProcessing ? 'bg-blue-600' : 'bg-slate-200'}`}>
              {isProcessing ? (
                <Loader2 className="h-5 w-5 text-white animate-spin" />
              ) : (
                <span className={`text-lg font-bold ${isConfirmed ? 'text-white' : isProcessing ? 'text-white' : 'text-slate-500'}`}>
                  2
                </span>
              )}
            </div>
            <span className="mt-2 text-sm font-medium">Processing</span>
          </div>
          
          <div className="flex flex-col items-center z-10">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center 
              ${isConfirmed ? 'bg-green-500' : 'bg-slate-200'}`}>
              <span className={`text-lg font-bold ${isConfirmed ? 'text-white' : 'text-slate-500'}`}>
                3
              </span>
            </div>
            <span className="mt-2 text-sm font-medium">Confirmation</span>
          </div>
        </div>

        {isConfirmed ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Payment Successful!</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Thank you for your payment. Your transaction has been completed successfully.
                </p>
                
                <div className="bg-green-50 rounded-xl p-6 max-w-md mx-auto mb-8">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    <div className="font-medium">Student:</div>
                    <div>{selectedStudent.name}</div>
                    
                    <div className="font-medium">Amount:</div>
                    <div>ETB {totalAmount.toLocaleString()}</div>
                    
                    <div className="font-medium">Payment Method:</div>
                    <div className="flex items-center">
                      {PaymentIcons[paymentMethod as keyof typeof PaymentIcons]}
                      <span className="ml-2 capitalize">{paymentMethod}</span>
                    </div>
                    
                    <div className="font-medium">Confirmation:</div>
                    <div className="font-mono font-bold text-green-700">
                      {confirmationNumber}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    onClick={handleGoToDashboard}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Go to Dashboard
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleBackToPayments}
                  >
                    Make Another Payment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg mb-8">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{selectedStudent.name}</h3>
                        <p className="text-slate-600">{selectedStudent.program} • Grade {selectedStudent.class}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-700">
                          ETB {totalAmount.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-500">
                          {selectedMonths.length} month{selectedMonths.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedMonths.map(month => (
                        <TableRow key={month.id}>
                          <TableCell>
                            {month.month} {month.year}
                          </TableCell>
                          <TableCell>
                            {month.dueDate ? (
                              new Date(month.dueDate).toLocaleDateString()
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            ETB {month.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(month.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Select Payment Method</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Object.entries(PaymentIcons).map(([method, icon]) => (
                          <div
                            key={method}
                            className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                              paymentMethod === method
                                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                                : "border-slate-200 hover:bg-slate-50"
                            }`}
                            onClick={() => setPaymentMethod(method)}
                          >
                            {icon}
                            <span className="mt-2 capitalize">{method}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Payment Details</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm mb-2">Card Number</label>
                            <div className="border border-slate-200 rounded-lg p-3 bg-white">
                              **** **** **** 1234
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm mb-2">Expiry Date</label>
                            <div className="border border-slate-200 rounded-lg p-3 bg-white">
                              12/2025
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm mb-2">Cardholder Name</label>
                          <div className="border border-slate-200 rounded-lg p-3 bg-white">
                            Ato Bekele
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right Column - Payment Confirmation */}
            <div>
              <Card className="border-0 shadow-lg sticky top-6">
                <CardHeader>
                  <CardTitle>Confirm Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>ETB {totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Processing Fee:</span>
                        <span>ETB 0.00</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-200">
                        <span>Total:</span>
                        <span>ETB {totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="ml-2 text-sm">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                      </label>
                    </div>
                    
                    <Button 
                      className="w-full py-6 text-lg font-bold"
                      onClick={handleConfirmPayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        "Confirm Payment"
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleBackToPayments}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;