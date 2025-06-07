import { Bell, LogOut, NotebookIcon, Paintbrush } from "lucide-react";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { error, isPending, logoutMutation } = useLogout();

  return (
    <div className="bg-base-300 h-[4rem] w-full">
      <div className="flex justify-end items-center h-full space-x-8 mx-5">
        <Bell />
        <Paintbrush />
        <div className="cursor-pointer" onClick={() => logoutMutation()}>
          <LogOut />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
