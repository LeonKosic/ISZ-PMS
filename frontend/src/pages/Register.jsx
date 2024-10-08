import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import api from "../api/api"

export default function RegisterPage() {
  const [formData, setFormData] = createSignal({ username: "", email: "", password: "", password2: "", name: "" });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, password2, name } = formData();
    api.post("/users/register", { name, username, email, password, password2 })
    navigate("/login");
  };

  return (
    <div class="flex justify-center items-center h-screen">
      <div class="bg-primary-400 p-14 rounded-3xl shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-gray-50">Register</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-4">
            <input
              type="text"
              id="name"
              class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100"
              value={formData().name}
              onInput={(e) => setFormData({ ...formData(), name: e.target.value })}
              placeholder="Name"
              required
            />
          </div>
          <div class="mb-4">
            <input
              type="text"
              id="username"
              class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100"
              value={formData().username}
              onInput={(e) => setFormData({ ...formData(), username: e.target.value })}
              placeholder="Username"
              required
            />
          </div>
          <div class="mb-4">
            <input
              type="email"
              id="email"
              class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100"
              value={formData().email}
              onInput={(e) => setFormData({ ...formData(), email: e.target.value })}
              placeholder="Email"
              required
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              id="password"
              class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100"
            value={formData().password}
            onInput={(e) => setFormData({ ...formData(), password: e.target.value })}
            placeholder="Password"
            required
            />
          </div>
          <div class="mb-4">
            <input
              type="password"
              id="password"
              class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100"
              value={formData().password2}
              onInput={(e) => setFormData({ ...formData(), password2: e.target.value })}
              placeholder="Repeat password"
              required
            />
          </div>
          <div>
            <button type="submit" class="bg-accent-700 text-gray-50 px-4 py-2 rounded-xl border border-transparent hover:bg-accent-500 hover:border hover:border-white">
              Register
            </button>
          </div>
          <div>
            <A href="/login" class="text-xs text-accent-400 hover:underline">Already have an account? Login here!</A>
          </div>
        </form>
      </div>
    </div>
  );
}
