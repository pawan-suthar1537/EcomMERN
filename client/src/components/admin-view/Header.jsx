import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "@/config";
import { useDispatch } from "react-redux";
import { logout, setUser } from "@/store/authslice";

function AdminHeader({ setOpen }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlelogout = () => {
    try {
      const res = axios.post(
        `${API_URL}/api/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res) {
        dispatch(logout());
        toast.success("Logout successful");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.success("Logout failed");
    }
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button onClick={() => setOpen(true)} className="lg:hidden sm:block">
        <AlignJustify />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handlelogout}
          className="inline-flex gap-1 items-center rounded-md  py-2 text-sm font-medium shadow"
        >
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
