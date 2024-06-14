import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import api from "../api/api";

export default function Login() {
  const [formData, setFormData] = createSignal({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = formData();
    api.login({ username, password });
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
              class="form-input mt-1 p-2 block w-full border-white rounded-md placeholder-primary text-primary bg-accent-200 bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 duration-300 transition-all"
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
              class="form-input mt-1 p-2 block w-full border-white rounded-md placeholder-primary text-primary bg-accent-200 bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 duration-300 transition-all"
              value={formData().password}
              onInput={(e) => setFormData({ ...formData(), password: e.target.value })}
              placeholder="Password"
              required
            />
          </div>
          <div class="flex flex-row items-center justify-center">
            <button type="submit" class="bg-accent-700 text-gray-50 px-4 py-2 rounded-xl border border-transparent hover:bg-accent-500 hover:border hover:border-white transition-all duration-300 w-full">
              Login
            </button>
          </div>
          <div class="pt-2">
            <A href="/register" class="text-md text-accent-400 hover:text-accent duration-300">Don't have an account? Register here!</A>
          </div>
        </form>
      </div>
    </div>
  );
}
