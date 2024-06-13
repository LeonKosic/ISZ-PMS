import { createSignal, onMount } from "solid-js";
import api from "../api/api";

export default function Requests() {
  const [requests, setRequests] = createSignal([]);

  onMount(async () => {
    const response = await api.get("/requests");
    setRequests(response.data);
  });

  return (
    <div class="min-h-screen bg-primary-800 flex flex-col items-center p-8">
      <h1 class="text-3xl font-bold text-gray-50 mb-8">Project Requests</h1>
      {requests().length === 0 ? (
        <p class="text-gray-400">No project requests found</p>
      ) : (
        requests().map((request) => (
          <div 
            class="bg-primary-400 p-6 mb-6 rounded-lg shadow-md w-full max-w-2xl"
            key={request.id}
          >
            <h2 class="text-xl font-semibold text-gray-50 mb-2">{request.title}</h2>
            <p class="text-gray-200">{request.body}</p>
          </div>
        ))
      )}
    </div>
  );
}
