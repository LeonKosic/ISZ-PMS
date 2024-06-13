import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import api from "../api/api";

export default function Login() {
  const [formData, setFormData] = createSignal({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = formData();
    api.login( { username, password });
    navigate('/');
  };

  return (
    <div class="flex justify-center items-center h-screen overflow-hidden">
      <div class="bg-primary-400 p-14 rounded-3xl shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-gray-50">Login</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <input
              type="text"
              id="username"
              class="form-input mt-1 block w-full border-white rounded-md placeholder-primary-100 text-primary"
              value={formData().username}
              onInput={(e) => setFormData({ ...formData(), username: e.target.value })}
              placeholder="Username"
              required
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              id="password"
              class="form-input mt-1 block w-full border-white rounded-md placeholder-primary-100 text-primary"
              value={formData().password}
              onInput={(e) => setFormData({ ...formData(), password: e.target.value })}
              placeholder="Password"
              required
            />
          </div>
          <div>
            <button type="submit" class="bg-accent-700 text-gray-50 px-4 py-2 rounded-xl border border-transparent hover:bg-accent-500 hover:border hover:border-white">
              Login
            </button>
          </div>
          <div>
            <A href="/register" class="text-xs text-accent-400 hover:underline">Don't have an account? Register here!</A>
          </div>
        </form>
      </div>
    </div>
  );
}
