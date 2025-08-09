"use client";

import React, { useState, useMemo } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WalletCards } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";


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
  class:number;
  monthlyFee: number;
  feeMonths: FeeMonth[];
}

const demoChildren: ChildStudent[] = [
  {
    id: "stu-1001",
    name: "Abel Mekonnen",
    program: "Natural Science",
     class:12,
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
    class:12,
    monthlyFee: 2800,
    feeMonths: [
      { id: "2024-09", month: "September", year: "2024", amount: 2800, status: "paid" },
      { id: "2024-10", month: "October", year: "2024", amount: 2800, status: "overdue", dueDate: "2024-10-05" },
      { id: "2024-11", month: "November", year: "2024", amount: 2800, status: "unpaid" },
    ]
  },
];

const PaymentPage = () => {
  const params = useSearchParams();
  const studentId = params.get("studentId") || demoChildren[0].id;
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(studentId);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("telebirr");

  const router = useRouter();

  const selectedStudent = useMemo(
    () => demoChildren.find(c => c.id === selectedStudentId) || demoChildren[0],
    [selectedStudentId]
  );

  // Auto-select current month on load
  useMemo(() => {
    const currentMonth = new Date().toISOString().slice(0, 7).replace('-', '');
    const currentMonthData = selectedStudent.feeMonths.find(m => 
      m.id === `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
    );
    
    if (currentMonthData && currentMonthData.status !== 'paid') {
      setSelectedMonths([currentMonthData.id]);
    }
  }, [selectedStudent]);

  const toggleMonthSelection = (monthId: string) => {
    setSelectedMonths(prev => 
      prev.includes(monthId)
        ? prev.filter(id => id !== monthId)
        : [...prev, monthId]
    );
  };

  const selectAllUnpaid = () => {
    const unpaidMonths = selectedStudent.feeMonths
      .filter(month => month.status !== 'paid')
      .map(month => month.id);
      
    setSelectedMonths(unpaidMonths);
  };

  const clearSelection = () => {
    setSelectedMonths([]);
  };

  const totalAmount = useMemo(() => {
    return selectedMonths.reduce((sum, monthId) => {
      const month = selectedStudent.feeMonths.find(m => m.id === monthId);
      return sum + (month?.amount || 0);
    }, 0);
  }, [selectedMonths, selectedStudent]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid": return <Badge variant="default">Paid</Badge>;
      case "overdue": return <Badge variant="destructive">Overdue</Badge>;
      default: return <Badge variant="outline">Pending</Badge>;
    }
  };

  const handleCheckout = () => {
    // Redirect to checkout page with selected data
    router.push(`/parent/payment/checkout?studentId=${selectedStudentId}&months=${selectedMonths.join(",")}&total=${totalAmount}&method=${paymentMethod}`);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <WalletCards className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-slate-800">Student Fee Payment</h1>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Select Student</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <Select 
                  value={selectedStudentId} 
                  onValueChange={v => {
                    setSelectedStudentId(v);
                    setSelectedMonths([]);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose student" />
                  </SelectTrigger>
                  <SelectContent>
                    {demoChildren.map(child => (
                      <SelectItem key={child.id} value={child.id}>
                        {child.name} • {child.program}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {demoChildren.map(child => (
                    <Card 
                      key={child.id} 
                      className={`${child.id === selectedStudentId 
                        ? "border-blue-400 bg-blue-50" 
                        : "bg-white"}`}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg">{child.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 mb-2">{child.program}</p>
                        <p className="font-semibold">
                          Monthly Fee: ETB {child.monthlyFee.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle>Payment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold text-lg mb-2">{selectedStudent.name}</h3>
                  <p className="text-slate-600">{selectedStudent.program}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Selected Months:</span>
                    <span className="font-medium">{selectedMonths.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Amount:</span>
                    <span className="font-bold text-lg text-blue-700">
                      ETB {totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="telebirr">TeleBirr</SelectItem>
                      <SelectItem value="cbe">CBE Birr</SelectItem>
                      <SelectItem value="awash">Awash Bank</SelectItem>
                      <SelectItem value="visa">Visa/Mastercard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>


                <Button 
                  className="w-full py-6 text-lg font-bold shadow-lg"
                  disabled={selectedMonths.length === 0}
                  onClick={handleCheckout}
                >
                  Pay Now
                </Button>
          
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <CardTitle>Fee Schedule</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={selectAllUnpaid}>
                    Select All Unpaid
                  </Button>
                  <Button variant="outline" onClick={clearSelection}>
                    Clear Selection
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Select</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedStudent.feeMonths.map(month => (
                    <TableRow 
                      key={month.id} 
                      className={month.status === 'overdue' ? "bg-rose-50" : ""}
                    >
                      <TableCell>
                        <Checkbox 
                          checked={selectedMonths.includes(month.id)}
                          onCheckedChange={() => toggleMonthSelection(month.id)}
                          disabled={month.status === 'paid'}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">
                          {month.month} {month.year}
                        </div>
                        {month.status === 'overdue' && (
                          <div className="text-xs text-rose-500">
                            Past due
                          </div>
                        )}
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

              {selectedMonths.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <h3 className="font-bold text-blue-800">Payment Summary</h3>
                      <p className="text-blue-600">
                        {selectedMonths.length} months selected • Total: ETB {totalAmount.toLocaleString()}
                      </p>
                    </div>
                   
                      <Button 
                      className="min-w-[200px] py-5 text-base font-bold"
                      onClick={handleCheckout}

                    >
                      Confirm Payment
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>

     
    </div>
  );
};

export default PaymentPage;