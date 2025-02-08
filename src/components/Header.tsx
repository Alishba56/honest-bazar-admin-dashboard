import { UserButton } from "@clerk/nextjs"

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-center">
        <div className="flex items-center  text-gray-500">
        <UserButton  />

        </div>
        
      </div>
    </header>
  )
}

export default Header

