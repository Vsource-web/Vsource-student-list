"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { TopNav } from "@/components/layout/top-nav";
import RegistrationForm from "@/components/student-registration/RegistrationForm";
import { useState } from "react";

export default function Page() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex w-full bg-slate-100">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />

      <div className="flex-1">
        <TopNav
          sidebarCollapsed={collapsed}
          onToggleSidebar={() => setCollapsed((c) => !c)}
        />
        <div className="p-4">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}
