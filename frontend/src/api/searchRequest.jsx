import RequestList from "../components/generic/request/RequestList";
import api from "./api"

export const searchRequest = async (requestName, toRequestList = false) => {
  const response = await api.post("/request/search", { title: requestName })
  const data = await response.data;

  if (toRequestList == false)
    return data
  else return <RequestList requests={data.requests}
                cardClickAction={(id) => { window.location.href = `/requests/${id}` }}
                cardStyle={"hover:cursor-pointer rounded-lg border-2 border-accent-600 my-1 ms-2 mr-2 hover:bg-accent-600 duration-300 transition-all"}
               />
}