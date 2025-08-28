"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface SettingsTabsProps {
  children: React.ReactNode
}

const tabs = [
  { id: "edit-profile", label: "Edit Profile" },
  { id: "preferences", label: "Preferences" },
  { id: "security", label: "Security" },
]

export function SettingsTabs({ children }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState("edit-profile")

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "edit-profile" && children}
        {activeTab === "preferences" && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
            <p className="text-gray-600">Preferences settings will be implemented here.</p>
          </div>
        )}
        {activeTab === "security" && (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
            <p className="text-gray-600">Security settings will be implemented here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
