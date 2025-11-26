"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const mockStudent = {
  id: "1",
  studentName: "KUCHIPATLA AKSHITHA REDDY",
  email: "akshithareddy@gmail.com",
  serviceFee: 10000,
  due: 0,
};

export default function PaymentFormPage({ params }: any) {
  const { id } = params;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1">
        <TopNav />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Make Payments</h1>

          <div className="rounded-xl bg-white p-6 shadow-md mb-8">
            <h2 className="text-lg font-semibold mb-4">Payment Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* LEFT SIDE — STUDENT INFO */}
              <div className="space-y-3">
                <p>
                  <strong>Student Name :</strong> {mockStudent.studentName}
                </p>
                <p>
                  <strong>Email :</strong> {mockStudent.email}
                </p>
                <p>
                  <strong>Service Fee :</strong> {mockStudent.serviceFee}{" "}
                  <span className="text-red-600">
                    (Bal - {mockStudent.due})
                  </span>
                </p>
                <p>
                  <strong>Due :</strong> {mockStudent.due}
                </p>
              </div>

              {/* RIGHT SIDE — PAYMENT FORM */}
              <div className="space-y-4">
                {/* Fee Type */}
                <div>
                  <label className="text-sm font-medium">Select Fee Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Fee Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="service-fee">Service Fee</SelectItem>
                      <SelectItem value="application-fee">
                        Application Fee
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="text-sm font-medium">Payment Method</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Payment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bank Details */}
                <div>
                  <label className="text-sm font-medium">
                    Company Bank Details
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose Bank Details" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      <SelectItem value="icici">ICICI Bank</SelectItem>
                      <SelectItem value="sbi">SBI Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount */}
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <Input placeholder="Enter Amount" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700">Submit</Button>
              <Button variant="destructive">Cancel</Button>
            </div>
          </div>

          {/* BELOW SECTION — PAYMENT HISTORY */}
          <div className="rounded-xl bg-white p-6 shadow-md">   
            <h2 className="text-lg font-semibold mb-4">Make Payments</h2>

            <table className="min-w-full text-sm border rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">S.NO</th>
                  <th className="p-2 border">Student Name</th>
                  <th className="p-2 border">Fee Type</th>
                  <th className="p-2 border">Sub Fee Type</th>
                  <th className="p-2 border">Paid Amount</th>
                  <th className="p-2 border">Type of Pay</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Invoice</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className="p-2 border">1</td>
                  <td className="p-2 border">{mockStudent.studentName}</td>
                  <td className="p-2 border">Service Fee</td>
                  <td className="p-2 border">S.C (GST)</td>
                  <td className="p-2 border">10000</td>
                  <td className="p-2 border">OnlinePayment</td>
                  <td className="p-2 border">27-11-2023</td>
                  <td className="p-2 border">
                    <Button className="bg-green-600 hover:bg-green-700">
                      Generate
                    </Button>
                  </td>
                  <td className="p-2 border text-green-600">Approved</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
