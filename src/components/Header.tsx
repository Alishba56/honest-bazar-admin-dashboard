import {  Search } from "lucide-react"

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="flex items-center justify-center">
        <div className="flex items-center">
         
          <Search className="text-gray-500" />
        </div>
        
      </div>
    </header>
  )
}

export default Header

