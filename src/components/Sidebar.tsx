"use client"; // ✅ Required for client-side hooks

import { useState } from "react";
import Link from "next/link";
import { Home, ShoppingBag, BarChart2, Settings, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex top-4 left-4 z-50    bg-transparent p-2 "
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-black" />
        )}
      </button>
      <aside
        className={`bg-gray-900 text-white w-64 space-y-6 py-7 px-2 fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40 shadow-xl`}
      >
        <Link href="/" className="flex items-center space-x-2 px-4">
          <ShoppingBag className="w-8 h-8 text-yellow-500" />
          <span className="text-2xl font-extrabold ">Honest-Bazar</span>
        </Link>

        <nav className="mt-5">
          <NavItem
            href="/"
            label="Dashboard"
            icon={<Home />}
            active={pathname === "/"}
            onClick={closeSidebar}
          />
          <NavItem
            href="/orders"
            label="Orders"
            icon={<ShoppingBag />}
            active={pathname === "/orders"}
            onClick={closeSidebar}
          />
          <NavItem
            href="/products"
            label="Products"
            icon={<BarChart2 />}
            active={pathname === "/products"}
            onClick={closeSidebar}
          />
          <NavItem
            href="/settings"
            label="Settings"
            icon={<Settings />}
            active={pathname === "/settings"}
            onClick={closeSidebar}
          />
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={closeSidebar}
          role="button"
          aria-label="Close sidebar"
        />
      )}
    </>
  );
};

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  icon,
  active,
  onClick,
}) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center py-2.5 px-4 rounded transition duration-200 ${
        active
          ? "bg-gray-700 text-white"
          : "text-gray-400 hover:bg-gray-700 hover:text-white"
      }`}
      aria-label={label}
    >
      <span className="w-5 h-5 mr-2">{icon}</span>
      {label}
    </Link>
  );
};

export default Sidebar;
