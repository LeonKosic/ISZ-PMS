import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import api from "../../../api/api";

export default function CreateProjectRequestButton() {
  const [showModal, setShowModal] = createSignal(false);
  const [latestRequestId, setLatestRequestId] = createSignal(null);
  const [formData, setFormData] = createSignal({ title: "", body: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, body } = formData();

    try {
      await api.post("/request", { title, body });
      setShowModal(false);
      const response = await api.get("/request/my");
      const latestRequest = response.data.slice(-1)[0];
      setLatestRequestId(latestRequest.id);
      navigate(`/post/${latestRequestId()}`);
    } catch (error) {
      console.error("Error creating project request:", error);
    }
  };

  return (
    <div class="items-center">
      <button
        onClick={() => setShowModal(true)}
        class="bg-accent-700 text-gray-50 px-4 py-2 rounded-xl border border-transparent hover:bg-accent-500 hover:border hover:border-white"
      >
        Create Project Request
      </button>
      {showModal() && (
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50 bg-primary from-current">
          <div class="bg-primary-400 p-14 rounded-3xl shadow-md w-full max-w-lg">
            <h2 class="text-2xl font-semibold mb-4 text-gray-50">Create Project Request</h2>
            <form onSubmit={handleSubmit}>
              <div class="mb-4">
                <input
                  type="text"
                  id="title"
                  class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 transition-all duration-500"
                  value={formData().title}
                  onInput={(e) => setFormData({ ...formData(), title: e.target.value })}
                  placeholder="Project Request Name"
                  required
                />
              </div>
              <div class="mb-4">
                <textarea
                  id="body"
                  class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 transition-all duration-500"
                  value={formData().body}
                  onInput={(e) => setFormData({ ...formData(), body: e.target.value })}
                  placeholder="Project Request Description"
                  required
                />
              </div>
              <div class="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  class="bg-gray-300 text-gray-700 px-4 py-2 rounded-xl mr-2 border border-transparent hover:border hover:border-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="bg-accent-700 text-gray-50 px-4 py-2 rounded-xl border border-transparent hover:bg-accent-500 hover:border hover:border-white"
                >
                  Create Project Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

