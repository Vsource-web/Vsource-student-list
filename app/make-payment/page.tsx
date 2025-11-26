"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const mockPayments = [
  {
    id: "1",
    studentName: "KUCHIPATLA AKSHITHA REDDY",
    mobile: "6281223792",
    email: "akshithareddy@gmail.com",
    masters: "ABROADMASTERS-USA",
    serviceFee: 10000,
    status: "Approved",
  },
  {
    id: "2",
    studentName: "CHEEDALLA ASHWITHA",
    mobile: "6281364596",
    email: "cheedalla@gmail.com",
    masters: "ABROADMASTERS-USA",
    serviceFee: 10000,
    status: "Approved",
  },
];

export default function MakePaymentPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <TopNav />

        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Make Payments</h1>

          <div className="overflow-x-auto rounded-xl bg-white shadow-md">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="p-3 border">S.No</th>
                  <th className="p-3 border">Student Name</th>
                  <th className="p-3 border">Mobile</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Abroad-Masters</th>
                  <th className="p-3 border">Service Fee</th>
                  <th className="p-3 border text-center">Make Payment</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>

              <tbody>
                {mockPayments.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3 border">{index + 1}</td>
                    <td className="p-3 border">{item.studentName}</td>
                    <td className="p-3 border">{item.mobile}</td>
                    <td className="p-3 border">{item.email}</td>
                    <td className="p-3 border">{item.masters}</td>
                    <td className="p-3 border">{item.serviceFee}</td>

                    <td className="p-3 border text-center">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => router.push(`/make-payment/${item.id}`)}
                      >
                        +
                      </Button>
                    </td>

                    <td className="p-3 border text-green-600 font-semibold">
                      {item.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {mockPayments.length === 0 && (
            <p className="text-center text-slate-500 mt-6">
              No payments found.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}
