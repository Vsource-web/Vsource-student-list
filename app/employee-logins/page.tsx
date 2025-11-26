"use client";

import React, { useMemo, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import { LoginLog, getISTDateISO, getISTTodayISO } from "@/types/loginLog";
import { loginLogService } from "@/services/loginLog.service";
import { EmployeeLoginTable } from "@/components/login/EmployeeLoginTable";
import { useQuery } from "@tanstack/react-query";

export default function EmployeeLoginPage() {
  const [collapsed, setCollapsed] = useState(false);

  const [search, setSearch] = useState("");
  const [pendingDate, setPendingDate] = useState<string>(() =>
    getISTTodayISO()
  );
  const [activeDate, setActiveDate] = useState<string>(() => getISTTodayISO());

  const [page, setPage] = useState(0); // 0-based
  const [pageSize, setPageSize] = useState(10);

  // -----------------------------
  // REAL-TIME FETCH (poll every 5 sec)
  // -----------------------------
  const { data: logs = [], isLoading } = useQuery<LoginLog[]>({
    queryKey: ["employee-login-logs"],
    queryFn: () => loginLogService.getAll(),
    refetchInterval: 5000, // 🔥 Auto-refresh every 5 seconds
    refetchOnWindowFocus: true, // refresh when user switches tab
  });

  const filtered = useMemo(() => {
    const byDate = logs.filter((log) => {
      if (!activeDate) return true;
      const logDateISO = getISTDateISO(log.timestamp);
      return logDateISO === activeDate;
    });

    if (!search.trim()) return byDate;

    const term = search.toLowerCase();

    return byDate.filter((log) => {
      return (
        log.employeeId.toLowerCase().includes(term) ||
        log.name.toLowerCase().includes(term) ||
        log.username.toLowerCase().includes(term) ||
        log.role.toLowerCase().includes(term) ||
        log.loginType.toLowerCase().includes(term)
      );
    });
  }, [logs, activeDate, search]);

  // -----------------------------
  // PAGINATION
  // -----------------------------
  const paginated = useMemo(() => {
    const start = page * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  const handleSubmitDate = () => {
    setActiveDate(pendingDate);
    setPage(0);
  };

  const todayDisplay = useMemo(() => {
    const [y, m, d] = activeDate.split("-");
    return `${d}-${m}-${y}`;
  }, [activeDate]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav
          sidebarCollapsed={collapsed}
          onToggleSidebar={() => setCollapsed((c) => !c)}
        />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Filters */}
            <div className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-xl font-semibold sm:text-2xl">
                  Employee Login History
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Today’s Login Details —
                  <span className="font-semibold text-slate-900">
                    {todayDisplay}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                {/* Date Filter */}
                <div className="flex flex-col text-sm">
                  <label className="text-xs mb-1 font-medium">Date</label>
                  <input
                    type="date"
                    value={pendingDate}
                    onChange={(e) => setPendingDate(e.target.value)}
                    className="rounded-lg border shadow-sm px-3 py-2"
                  />
                </div>

                <button
                  onClick={handleSubmitDate}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-red-700"
                >
                  Submit
                </button>

                {/* Search */}
                <div className="flex flex-col text-sm">
                  <label className="text-xs mb-1 font-medium">Search</label>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-lg border shadow-sm px-3 py-2 sm:w-64"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <EmployeeLoginTable
              items={paginated}
              loading={isLoading}
              page={page}
              pageSize={pageSize}
              total={filtered.length}
              onPageChange={setPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setPage(0);
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
