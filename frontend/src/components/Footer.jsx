
export default function Navbar(props) {

  return (
    <div class="absolute bottom-0 bg-primary-800 pb-0 z-50 w-full">
      <hr class="mt-4 pb-0 text-accent-700" />
      <div class="grid grid-rows-1 grid-cols-3 text-center items-center align-middle italic">
        <div>
          <p>
            © PMS 2024 <br />
            University of Banja Luka <br />
            Faculty of Electrical Engineering
          </p>
        </div>
        <div class="hover:underline transition-all duration-300">
          <button onClick={() => { window.location.href = "/report" }}>Report a problem</button>
        </div>
        <div class="hover:underline transition-all duration-300">
          <button onClick={() => { window.location.href = "/about" }}>Meet the team</button>
        </div>
      </div>
    </div>
  );
}