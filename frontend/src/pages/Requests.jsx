import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import api from "../api/api";
import RightSidebar from "../components/RightSidebar";
import LeftSidebar from "../components/LeftSidebar"

export default function Requests() {
  const [requests, setRequests] = createSignal([]);
  const navigate = useNavigate();

  onMount(async () => {
    const response = await api.get("/request");
    setRequests(response.data);
  });

  const handleRequestClick = (requestId) => {
    navigate(`/requests/${requestId}`);
  };

  return (
    <div>
    <RightSidebar />
    <LeftSidebar />
    <div class="min-h-screen bg-primary-800 flex flex-col items-center p-8">
      <h1 class="text-3xl font-bold text-gray-50 mb-8">Project Requests</h1>
      {requests().length === 0 ? (
        <p class="text-gray-400">No project requests found</p>
        ) : (
          requests().map((request) => (
            <div 
            class="bg-primary-400 p-4 mb-4 rounded-lg shadow-md cursor-pointer w-full max-w-sm"
            key={request.id}
            onClick={() => handleRequestClick(request.id)}
            >
            <h2 class="text-lg font-semibold text-gray-50 mb-2">{request.title}</h2>
            <p class="text-gray-200">{request.body}</p>
          </div>
        ))
        )}
    </div>
    </div>
  );
}
