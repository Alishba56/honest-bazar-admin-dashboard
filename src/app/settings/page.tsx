import { ProfileSettings } from "@/components/ProfileSettings"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="justify-center items-center flex flex-col py-20">
      <h1 className="text-3xl font-bold">Profile Settings </h1>
        <div className="pt-10">
          <ProfileSettings />
          </div>
        
    </div>
  )
}
