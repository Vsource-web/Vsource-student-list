// src/components/subadmin/SubAdminTable.tsx
"use client";

import React from "react";
import { SubAdmin, BRANCH_OPTIONS } from "@/types/subAdmin";

type Props = {
  items: SubAdmin[];
  loading?: boolean;
  onEdit: (item: SubAdmin) => void;
  onDelete: (item: SubAdmin) => void;
};

function getBranchLabel(code: string) {
  return BRANCH_OPTIONS.find((b) => b.code === code)?.label ?? code;
}

export const SubAdminTable: React.FC<Props> = ({
  items,
  loading,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50">
          <tr className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            <th className="px-4 py-3">S.No</th>
            <th className="px-4 py-3">Employee ID</th>
            <th className="px-4 py-3">Staff Name</th>
            <th className="px-4 py-3">Mobile</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Branch</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="py-5 text-center text-sm">
                Loading sub admins...
              </td>
            </tr>
          ) : items.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-5 text-center text-sm">
                No sub admins found.
              </td>
            </tr>
          ) : (
            items.map((item, idx) => (
              <tr key={item.id} className="border-t hover:bg-slate-100">
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3">{item.employeeId}</td>
                <td className="px-4 py-3 font-medium">{item.name}</td>
                <td className="px-4 py-3">{item.phone}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold">{item.branch}</div>
                  <div className="text-xs text-slate-500">
                    {getBranchLabel(item.branch)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-blue-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="bg-red-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
