import { Outlet } from "react-router-dom"

export const AccessContainer = () => {
  return (
    <div className="w-96 mx-auto mt-20">
      <Outlet />
    </div>
  )
}
