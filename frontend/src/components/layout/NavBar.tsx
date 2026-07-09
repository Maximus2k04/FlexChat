import React, { useState } from "react";

import {
  HiChat,
  HiLogout,
  HiMenu,
  HiUsers,
  HiX,
} from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { MdPalette } from "react-icons/md";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import routes from "../../constants/routes/routes";
import { useLogout } from "../../hooks/tanstackQuery/useAccountApi";

import ConfirmModal from "../common/ConfirmModal";

const NavBtn = ({
  icon,
  label,
  onClick,
  active = false,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  danger?: boolean;
}) => {
  if (danger) {
    return (
      <button
        onClick={onClick}
        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
      >
        {icon}
        {label}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 w-full md:w-auto px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer
        ${
          active
            ? "bg-black text-white"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        }`}
    >
      {icon}
      {label}
    </button>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logoutMutation = useLogout();

  const [confirmLogout, setConfirmLogout] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const isActive = (path: string) =>
    location.pathname === path;

  const handleLogout = () => {
    logoutMutation.mutate();
    setConfirmLogout(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-8 py-3">
        <div className="flex items-center justify-between">
          <div
            onClick={() =>
              handleNavigate(routes.chats)
            }
            className="cursor-pointer shrink-0"
          >
            <img
              src="/flexChatLogo.png"
              alt="FlexChat Logo"
              className="w-[90px] md:w-[110px] object-contain"
            />
          </div>

          <div className="hidden md:flex items-center gap-1">
            <NavBtn
              icon={<HiChat size={16} />}
              label="Chats"
              active={isActive(routes.chats)}
              onClick={() =>
                navigate(routes.chats)
              }
            />

            <NavBtn
              icon={<HiUsers size={16} />}
              label="Users"
              active={isActive(routes.users)}
              onClick={() =>
                navigate(routes.users)
              }
            />

            <NavBtn
              icon={<CgProfile size={16} />}
              label="Profile"
              active={isActive(
                routes.myProfile,
              )}
              onClick={() =>
                navigate(routes.myProfile)
              }
            />

            <div className="w-px h-5 bg-gray-200 mx-2" />

            <NavBtn
              icon={<MdPalette size={18} />}
              label="Themes"
              active={isActive(
                routes.themes,
              )}
              onClick={() =>
                navigate(routes.themes)
              }
            />

            <NavBtn
              icon={<HiLogout size={18} />}
              label="Logout"
              danger
              onClick={() =>
                setConfirmLogout(true)
              }
            />
          </div>

          <button
            onClick={() =>
              setMobileOpen((prev) => !prev)
            }
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? (
              <HiX size={22} />
            ) : (
              <HiMenu size={22} />
            )}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden flex flex-col gap-2 pt-4 pb-2">
            <NavBtn
              icon={<HiChat size={16} />}
              label="Chats"
              active={isActive(routes.chats)}
              onClick={() =>
                handleNavigate(routes.chats)
              }
            />

            <NavBtn
              icon={<HiUsers size={16} />}
              label="Users"
              active={isActive(routes.users)}
              onClick={() =>
                handleNavigate(routes.users)
              }
            />

            <NavBtn
              icon={<CgProfile size={16} />}
              label="Profile"
              active={isActive(
                routes.myProfile,
              )}
              onClick={() =>
                handleNavigate(
                  routes.myProfile,
                )
              }
            />

            <NavBtn
              icon={<MdPalette size={18} />}
              label="Themes"
              active={isActive(
                routes.themes,
              )}
              onClick={() =>
                handleNavigate(routes.themes)
              }
            />

            <div className="border-t border-gray-100 my-1" />

            <NavBtn
              icon={<HiLogout size={18} />}
              label="Logout"
              danger
              onClick={() => {
                setMobileOpen(false);
                setConfirmLogout(true);
              }}
            />
          </div>
        )}
      </nav>

      <ConfirmModal
        isOpen={confirmLogout}
        title="Log out"
        message="Are you sure you want to log out?"
        confirmText="Log out"
        variant="danger"
        onConfirm={handleLogout}
        onCancel={() =>
          setConfirmLogout(false)
        }
      />
    </>
  );
};

export default Navbar;