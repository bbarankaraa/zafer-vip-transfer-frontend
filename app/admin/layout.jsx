"use client"

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }) {

  return (
    <div className="min-h-screen bg-charcoal flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}