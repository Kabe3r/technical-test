import { Navigate, Outlet, useLocation } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../features/auth/authSlice"
import { useState } from "react"
import { selectSidebar } from "../features/toggle/NavHeroSlice"


function PrivateOutlet() {
  const user = useSelector(selectCurrentUser);
  const sidebar = useSelector(selectSidebar);
  const location = useLocation();

  console.log(user)

  return user ? (
      <main className="px-5 pt-5 flex gap-x-10">
    <Sidebar sidebar={sidebar} name={user?.name} />
    <div className={`ml-auto lg:w-3/4 ${sidebar ? 'w-3/4' : 'w-full'}`}>
    <Navbar sidebar={sidebar} user={user?.name}  />
    <Outlet />
    </div>
    </main>
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  )
}

export default PrivateOutlet