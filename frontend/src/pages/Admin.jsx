import AdminPanel from "../components/admin/AdminPanel"
import RightSidebar from "../components/sidebars/right/RightSidebar"
import LeftSidebar from "../components/sidebars/left/LeftSidebar"

export default function Admin(props) {
  // todo: auth

  return (
    <div>
      <RightSidebar />
      <LeftSidebar />
      <AdminPanel />
    </div>
  )
}