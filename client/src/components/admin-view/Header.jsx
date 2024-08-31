import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function AdminHeader({ setOpen }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow">
          <span>
            <DotLottieReact
              src="https://lottie.host/56fa634d-3d38-42a3-9cd8-aaace663f633/sFmYBWSxbn.json"
              loop
              autoplay
              className="w-10 h-10"
            />
          </span>
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
