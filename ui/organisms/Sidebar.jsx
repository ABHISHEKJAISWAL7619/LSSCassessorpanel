"use client";
import data from "@/public/db/data.json";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DashboardLink from "../molecules/DashboardLink";
import Image from "next/image";
import { logout } from "@/redux/slice/auth-slice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
import OverlayModal from "../common/OverlayModal"; // ✅ import modal

const SideBar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const path = usePathname();
  const router = useRouter();
  const { navigation, othernav } = data;
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true); // Show confirmation popup
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setShowModal(false);
    router.push("/");
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-30 transform bg-white shadow transition-transform duration-300 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-56`}
      >
        <nav className="flex h-full flex-col gap-3 py-3">
          <div className="flex px-4">
            <Link href="/">
              <Image
                alt="logo"
                className="w-[106px]"
                src={"/img/logo.png"}
                width={200}
                height={100}
              />
            </Link>
          </div>

          <ul className="vertical-scrollbar flex h-full w-full flex-col justify-between gap-2 overflow-y-auto px-6">
            <div className="flex w-full flex-col">
              {navigation?.map((item, index) => {
                const { route, label, icon, subMenu } = item;
                return (
                  <DashboardLink
                    key={index}
                    active={path === route}
                    route={route}
                    label={label}
                    heroIcon={icon}
                    handleClick={() => setIsSidebarOpen(false)}
                    subMenu={subMenu}
                  />
                );
              })}
            </div>

            <div className="flex w-full flex-col">
              {othernav?.map((item, index) => {
                const { route, label, icon, subMenu } = item;
                return (
                  <DashboardLink
                    key={index}
                    active={path === route}
                    route={route}
                    label={label}
                    heroIcon={icon}
                    handleClick={() => setIsSidebarOpen(false)}
                    subMenu={subMenu}
                  />
                );
              })}

              {/* Logout Option */}
              <DashboardLink
                label={"Logout"}
                heroIcon={"ri-logout-circle-line"}
                handleClick={handleLogoutClick}
                subMenu={[]}
              />
            </div>
          </ul>
        </nav>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <OverlayModal
          content={
            <div className="bg-white rounded-xl p-8 shadow-xl flex flex-col items-center text-center">
              <div className="text-5xl mb-4">👋</div>
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                Are you sure you want to log out from your account?
              </h2>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleConfirmLogout}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Confirm
                </button>
                <button
                  onClick={handleCancelLogout}
                  className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default SideBar;
