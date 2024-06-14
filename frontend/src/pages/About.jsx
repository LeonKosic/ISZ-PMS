
export default function About(props){

    return (
      <div class="grid grid-cols-1 gap-3 gap-y-3 my-3 justify-center text-center place-items-center object-top h-5/6">
          <h2 class="text-2xl py-3 my-3 font-semibold text-gray-50">About us</h2>
          <div>
            <img class="py-3" src="../src/assets/team.jpg"/>
          </div>
          <div>
            <p>We are a team of 6 software engineering students at the Faculty of Electrical engineering, University of Banja Luka.
            This web application is our project for the subject Software design.
            </p>
          </div>
        </div>   
    )
  }
  