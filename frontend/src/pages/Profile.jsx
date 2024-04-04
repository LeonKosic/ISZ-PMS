import ProfileActivityCard from "~/components/ProfileActivityCard";
import ProfileHeader from "~/components/ProfileHeader";
import ProjectBanner from "~/components/ProfileProjectBanner";
import ProfileRepositoryBanner from "~/components/ProfileRepositoryCard";

import api from "~/api/api";

export default function Profile(props) {
  return (
    <div class="user-profile">
      <div class="activities">
        <ProfileActivityCard />
      </div>
      
      <div class="info">
        <ProfileHeader/>
        
        <div class="social">
          <div class="following">
          </div>
          <div class="popular-projects">
          </div>
        </div>
        
        <div class="project-listings">
          <ProjectBanner />
        </div>
      </div>
      
      <div class="repositories">
        <h1 class="text-huge">Spotlight</h1>
        {/* grabe se repozitorijumi i prikazuju u <For> komponenti (sa limitom, tipa top 3) */}
        <ProfileRepositoryBanner/>
      </div>
    </div>
  )
}