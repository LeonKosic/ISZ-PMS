import AdminPanel from "../components/admin/AdminPanel"
import RightSidebar from "../components/RightSidebar"
import LeftSidebar from "../components/LeftSidebar"

export default function Admin(props) {
  // todo: auth
  
  return (
    <div>
      <RightSidebar />
      <LeftSidebar />
      <AdminPanel/>
    </div>
  )  
}