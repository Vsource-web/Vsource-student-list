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
import { useState } from "react";
const paymentOptions = [
  { value: "online", label: "By Online Payment" },
  { value: "cash", label: "By Cash" },
  { value: "cash-deposit", label: "By Cash-Deposit" },
  { value: "neft", label: "By NEFT" },
  { value: "card-swipe", label: "By Card Swipe" },
  { value: "cheque", label: "By Cheque" },
  { value: "link", label: "By Link" },
  { value: "cash-swipe", label: "By Cash & Swipe" },
  { value: "online-cash", label: "By Online & Cash" },
];

export default function PaymentFormPage({ params }: any) {
  const { id } = params;

  const [collapsed, setCollapsed] = useState(false);
  const [feeType, setFeeType] = useState<string | undefined>();
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>();
  const needsReferenceNo = [
    "online",
    "neft",
    "cheque",
    "link",
    "cash-swipe",
    "online-cash",
  ].includes(paymentMethod || "");
  return (
    <div className="flex w-full bg-slate-100">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <div className="flex-1">
        <TopNav
          sidebarCollapsed={collapsed}
          onToggleSidebar={() => setCollapsed((c) => !c)}
        />
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Make Payments</h1>

          <div className="rounded-xl bg-white border shadow-sm p-4 sm:p-6 lg:p-8 mb-8">
            {/* Header */}
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
              <h2 className="text-base sm:text-lg font-semibold">
                Payment Information
              </h2>
              <p className="text-xs text-muted-foreground">
                VSource Education · Billing & Collections
              </p>
            </div>

            {/* Content */}
            <div className="grid gap-6 lg:gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)] items-start">
              {/* LEFT SIDE — STUDENT INFO */}
              <div className="space-y-3 rounded-lg bg-slate-50/60 p-4">
                <p className="text-sm">
                  <span className="font-medium text-slate-700">
                    Student Name :
                  </span>{" "}
                  <span className="text-slate-900">
                    {mockStudent.studentName}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-slate-700">Email :</span>{" "}
                  <span className="text-slate-900 break-all">
                    {mockStudent.email}
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-slate-700">
                    Service Fee :
                  </span>{" "}
                  <span className="text-slate-900">
                    {mockStudent.serviceFee}
                  </span>
                  <span className="ml-2 text-xs font-semibold text-red-600">
                    (Bal - {mockStudent.due})
                  </span>
                </p>
                <p className="text-sm">
                  <span className="font-medium text-slate-700">Due :</span>{" "}
                  <span className="text-slate-900">{mockStudent.due}</span>
                </p>
              </div>

              {/* RIGHT SIDE — PAYMENT FORM */}
              <div className="space-y-4">
                {/* Row 1: Fee Type + Payment Method */}
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  {/* Fee Type */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                      Fee Type
                    </label>
                    <Select onValueChange={setFeeType}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select fee type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="service-fee">Service Fee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                      Payment Method
                    </label>
                    <Select onValueChange={setPaymentMethod}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Choose payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 2: Company Bank + Amount */}
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  {/* Company Bank Details */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                      Company Bank
                    </label>
                    <Select>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hdfc">HDFC Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Amount */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                      Amount
                    </label>
                    <Input className="h-9" placeholder="Enter amount" />
                  </div>
                </div>

                {/* GST fields – only when Service Fee is selected */}
                {feeType === "service-fee" && (
                  <div className="space-y-2 rounded-md border border-dashed border-slate-200 bg-slate-50/60 p-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                        GST Details
                      </label>
                      <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        Optional
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Input className="h-9" placeholder="GST %" />
                      <Input className="h-9" placeholder="GST Amount" />
                    </div>
                  </div>
                )}

                {/* Reference No – only for specific payment methods */}
                {needsReferenceNo && (
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                      Reference No
                    </label>
                    <Input
                      className="h-9"
                      placeholder="Enter reference number"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="mt-2 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs text-muted-foreground">
                    Please verify all payment details before submitting. Once
                    saved, this entry will be logged in the payment history.
                  </p>
                  <div className="flex gap-2 sm:gap-3">
                    <Button className="h-9 px-4 text-sm">Submit</Button>
                    <Button variant="outline" className="h-9 px-4 text-sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
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
