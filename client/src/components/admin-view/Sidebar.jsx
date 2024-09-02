import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ListOrdered,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Adminsidebar = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <ListOrdered />,
  },
];

function Menuitems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {Adminsidebar.map((item) => {
        return (
          <div
            key={item.id}
            className="flex text-xl items-center gap-2 cursor-pointer rounded-md px-3 py-2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              navigate(item.path);
              setOpen ? setOpen(false) : null;
            }}
          >
            {item.icon}
            <span className="">{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSidebar({ Open, setOpen }) {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={Open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 ">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-3">
                <ChartNoAxesCombined /> <span>Admin Panel</span>
              </SheetTitle>
            </SheetHeader>
            <Menuitems />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 bg-background border-r  p-6 lg:flex  flex-col">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span>
            <DotLottieReact
              className="w-12 h-11"
              src="https://lottie.host/8ea3d7bb-3e31-4daa-8aed-9fd24f66c50b/Wu1rP4eu7g.json"
              loop
              autoplay
            />
          </span>
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <Menuitems setOpen={setOpen} />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
