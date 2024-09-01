import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import AdminHeader from "./Header";
import { useState } from "react";

function AdminLayout() {
  const [Opensidebar, setOpensidebar] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSidebar Open={Opensidebar} setOpen={setOpensidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setOpensidebar} />
        <main className="flex flex-col flex-1 bg-muted/40 p-4 md-p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
