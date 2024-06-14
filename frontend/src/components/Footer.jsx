
export default function Navbar(props) {
  
  return (
    <div class="sticky bottom-0 bg-primary-800 pb-0 z-50">
      <hr class="mt-4 pb-0 w-full text-accent-700" />
        <div class="grid grid-rows-1 grid-cols-3 text-center">
            <div>
                <p>© PMS 2024 University of Banja Luka Faculty of Electrical Engineering</p>
            </div>
            <div>
                <button onClick = {() => {window.location.href = "/report"}}>Report a problem</button>
            </div>
            <div>
                <button onClick = {() => {window.location.href = "/about"}}>About us</button>
            </div>
        </div>
    </div>
  );
}