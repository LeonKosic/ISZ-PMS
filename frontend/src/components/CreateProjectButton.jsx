import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import api from "../api/api";

export default function CreateProjectButton() {
  const [showModal, setShowModal] = createSignal(false);
  const [latestProjectId, setLatestProjectId] = createSignal(null);
  const [formData, setFormData] = createSignal({ title: "", body: "" });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, body } = formData();
    
    try {
      await api.post("/projects", { title, body });
      setShowModal(false);
      const response = await api.get("projects/my");
      const latestProject = response.data.slice(-1)[0]; // Get the latest project
      setLatestProjectId(latestProject.id);
      navigate(`/post/${latestProjectId()}`);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div class="items-center">
      <button
        onClick={() => setShowModal(true)}
        class="bg-accent-700 text-gray-50 px-4 py-2 rounded-xl border border-transparent hover:bg-accent-500 hover:border hover:border-white"
      >
        Create Project
      </button>
      {showModal() && (
        <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50 bg-primary from-current">
          <div class="bg-primary-400 p-14 rounded-3xl shadow-md w-full max-w-lg">
            <h2 class="text-2xl font-semibold mb-4 text-gray-50">Create Project</h2>
            <form onSubmit={handleSubmit}>
              <div class="mb-4">
                <input
                  type="text"
                  id="title"
                  class="form-input mt-1 block w-full border-white rounded-md placeholder-primary-100 text-primary"
                  value={formData().title}
                  onInput={(e) => setFormData({ ...formData(), title: e.target.value })}
                  placeholder="Project Name"
                  required
                />
              </div>
              <div class="mb-4">
                <textarea
                  id="body"
                  class="form-input mt-1 block w-full border-white rounded-md placeholder-primary-100 text-primary"
                  value={formData().body}
                  onInput={(e) => setFormData({ ...formData(), body: e.target.value })}
                  placeholder="Project Description"
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
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}