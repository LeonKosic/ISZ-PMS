import { createSignal } from "solid-js";
import { A, useNavigate } from "@solidjs/router";
import api from "../api/api"

export default function RegisterPage() {
  const [formData, setFormData] = createSignal({ username: "", email: "", password: "", name: "", surname: "" });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password, name, surname } = formData();
    api.post("/users/register", { username, email, password, name, surname })
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
              type="email"
              id="email"
              class="form-input mt-1 block w-full border-white rounded-md placeholder-primary-100 text-primary"
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
              class="form-input mt-1 block w-full border-white rounded-md placeholder-primary-100 text-primary"
              value={formData().password}
              onInput={(e) => setFormData({ ...formData(), password: e.target.value })}
              placeholder="Password"
              required
            />
          </div>
          <div class="mb-4">
            <input
              type="text"
              id="name"
              class="form-input mt-1 block w-full border-white rounded-md placeholder-primary-100 text-primary"
              value={formData().name}
              onInput={(e) => setFormData({ ...formData(), name: e.target.value })}
              placeholder="Name"
              required
            />
          </div>
          <div class="mb-4">
            <input
              type="text"
              id="surname"
              class="form-input mt-1 block w-full border-white rounded-md placeholder-primary-100 text-primary"
              value={formData().surname}
              onInput={(e) => setFormData({ ...formData(), surname: e.target.value })}
              placeholder="Surname"
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
