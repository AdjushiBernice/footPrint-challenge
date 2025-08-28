"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setCurrentPage, setSidebarOpen } from "@/lib/slices/uiSlice";
import logo from "../../../public /logo.svg";
import HomeIcon from "../../../public /home.svg";
import TransactionIcon from "../../../public /transactions.svg";
import AccountIcon from "../../../public /accounts.svg";
import InvestmentIcon from "../../../public /investments.svg";
import CreditCardIcon from "../../../public /creditCards.svg";
import LoanIcon from "../../../public /loans.svg";
import ServiceIcon from "../../../public /services.svg";
import PriviledgeIcon from "../../../public /priviledges.svg";
import SettingsIcon from "../../../public /settings.svg";
import Image from "next/image";
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: HomeIcon,
    id: "dashboard",
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: TransactionIcon,
    id: "transactions",
  },
  {
    name: "Accounts",
    href: "/accounts",
    icon: AccountIcon,
    id: "accounts",
  },
  {
    name: "Investments",
    href: "/investments",
    icon: InvestmentIcon,
    id: "investments",
  },
  {
    name: "Credit Cards",
    href: "/credit-cards",
    icon: CreditCardIcon,
    id: "credit-cards",
  },
  {
    name: "Loans",
    href: "/loans",
    icon: LoanIcon,
    id: "loans",
  },
  {
    name: "Services",
    href: "/services",
    icon: ServiceIcon,
    id: "services",
  },
  {
    name: "My Privileges",
    href: "/privileges",
    icon: PriviledgeIcon,
    id: "privileges",
  },
  {
    name: "Setting",
    href: "/settings",
    icon: SettingsIcon,
    id: "settings",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  const handleNavClick = (id: string) => {
    dispatch(setSidebarOpen(true)); // Ensure sidebar remains open after clicking a link
  };
  const handleMenuToggle = () => {
    dispatch(setSidebarOpen(!sidebarOpen)); // Toggle the sidebar open state
  };
  return (
    <div className="relative">
      {/* Menu Button for mobile screens only */}
      {/* <Button
        className="lg:hidden absolute top-4 left-4 z-50"
        onClick={handleMenuToggle}
      >
        <MenuIcon className="text-gray-600" />
      </Button> */}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 lg:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100">
          <div className="w-8 h-8">
            <Image src={logo} alt="logo" />
          </div>
          <span className="text-xl font-semibold text-gray-900">Flow</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                      isActive
                        ? " text-[#232323] bg-gray-50 "
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Image
                      src={item.icon} // Use the imported image icon
                      alt={item.name}
                      className={cn(
                        isActive ? "text-[#232323]" : "text-gray-400"
                      )}
                    />
                    <span className={cn(isActive ? "text-[#232323]" : "")}>
                      {item.name}
                    </span>{" "}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
