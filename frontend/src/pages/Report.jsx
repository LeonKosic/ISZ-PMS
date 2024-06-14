
export default function Report(props){

  return (
    <div class="flex justify-center items-center h-screen">
      <div class="bg-primary-400 p-14 rounded-3xl shadow-md">
        <h2 class="text-2xl font-semibold mb-4 text-gray-50">Report an error</h2>
        <div class="mb-4">
            <input
              type="text"
              id="email"
              class="form-input mt-1 block w-full border-white rounded-md placeholder-primary-100 text-primary"
              placeholder="E-mail"
              required
            />
          </div>
          <div class="mb-4">
            <input
              type="text"
              id="title"
              class="form-input mt-1 block w-full border-white rounded-md placeholder-primary-100 text-primary"
              placeholder="Error name"
              required
            />
          </div>
          <div class="mb-4 h-16">
            <input
              type="text"
              id="body"
              class="form-input h-full mt-1 text-wrap text-start block w-full border-white rounded-md placeholder-primary-100 text-primary"
              placeholder="Describe the error"
              required
            />
          </div>         
          <div>
            <button class="bg-accent-700 text-gray-50 px-4 py-2 rounded-xl border border-transparent hover:bg-accent-500 hover:border hover:border-white"
            onClick = {() => {window.location.href = "/"}}
            >
              Submit
            </button>
          </div>
      </div>
    </div>
  )
}
