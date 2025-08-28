import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { SettingsTabs } from "@/components/settings/settings-tabs"
import { ProfileForm } from "@/components/settings/profile-form"

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Setting</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <SettingsTabs>
          <ProfileForm />
        </SettingsTabs>
      </div>
    </DashboardLayout>
  )
}
