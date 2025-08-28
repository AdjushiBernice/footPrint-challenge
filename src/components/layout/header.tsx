"use client";
import React from "react";
import { Button, Input, Avatar, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { toggleSidebar } from "@/lib/slices/uiSlice";
import SettingsIcon from "../../../public /settingsIcon.svg"; // Settings SVG as img
import NotificationsIcon from "../../../public /notification.svg"; // Notifications SVG as img
import SearchIcon from "../../../public /search.svg"; // Search SVG as img
import Image from "next/image";
import ProfilePicture from "../../../public /christina.png";
export function Header() {
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const { profile } = useAppSelector((state) => state.user);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Page title and search */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
        </div>

        {/* Right side - Settings, notifications, and profile */}
        <div className="flex items-center gap-4">
        <div className="flex-1 max-w-md">
          <TextField
            variant="outlined"
            placeholder="Search for something"
            size="small"
            fullWidth
            InputProps={{
              className: "bg-gray-100 rounded",
              startAdornment: (
                <span className="ml-2 mr-2">
                  {/* Search icon using SVG image */}
                  <Image
                    src={SearchIcon} // Add your search icon path here
                    alt="Search Icon"
                    className="h-4 w-4 text-gray-400"
                  />
                </span>
              ),
            }}
          />
        </div>
          <Button variant="text" size="small" className="p-2">
            <Image
              src={SettingsIcon} // Custom settings icon from public folder
              alt="Settings"
              className="w-5 h-5 text-gray-600"
            />
          </Button>

          <Button variant="text" size="small" className="p-2 relative">
            <Image
              src={NotificationsIcon} // Custom notifications icon from public folder
              alt="Notifications"
              className="w-5 h-5 text-gray-600"
            />
          </Button>

          <Avatar className="w-10 h-10">
            <Image
              src={ProfilePicture} // Use the avatar from public folder or fallback to ProfileIcon
              alt="profile"
              className="w-full h-full rounded-full"
            />
          </Avatar>
        </div>
      </div>
    </header>
  );
}
