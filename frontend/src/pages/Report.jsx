
export default function Report(props) {

  return (
    <div class="flex justify-center items-center h-screen">
      <div class="bg-primary-400 p-14 rounded-3xl shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-gray-50">Report an error</h2>
        <div class="mb-4">
          <input
            type="text"
            id="email"
            class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 transition-all duration-500"
            placeholder="E-mail"
            required
          />
        </div>
        <div class="mb-4">
          <input
            type="text"
            id="title"
            class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 transition-all duration-500"
            placeholder="Title"
            required
          />
        </div>
        <div class="mb-4 h-16">
          <input
            type="text"
            id="body"
            class="mt-1 p-2 block w-full border-accent-600 rounded-lg placeholder-primary-100 text-primary text-lg 
                bg-accent-100
                bg-opacity-50 hover:bg-opacity-75 focus:bg-opacity-100 transition-all duration-500"
            placeholder="Describe the error"
            required
          />
        </div>
        <div>
          <button class="bg-accent-700 text-gray-50 px-4 py-2 rounded-xl border border-transparent hover:bg-accent-500 hover:border hover:border-white"
            onClick={() => { window.location.href = "/" }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
