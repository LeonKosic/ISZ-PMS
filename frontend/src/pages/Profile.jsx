import ProfileActivityCard from "~/components/ProfileActivityCard";
import ProfileHeader from "~/components/ProfileHeader";
import ProjectBanner from "~/components/ProfileProjectBanner";
import ProfileRepositoryBanner from "~/components/ProfileRepositoryCard";

export default function Profile(props) {
  const redirectRepository = (url) => {
    return;
  } 
  
  return (
    <div class="user-profile">
      <div class="activities">
        <ProfileActivityCard />
        <ProfileActivityCard />
        <ProfileActivityCard />
        <ProfileActivityCard />
      </div>
      
      <div class="info">
        <ProfileHeader/>
        
        <div class="social">
          <div class="following">
            Following: <br/>
            Jane Doe <br/>
            Joe Biden <br/>
            Joe Biden <br />
            Joe Biden <br/>
          </div>
          <div class="popular-projects">
            Most popular projects: <br/>
            ProjectA<br/>
            ProjectB<br/>
            ProjectC<br/>
          </div>
        </div>
        
        <div class="project-listings">
          <ProjectBanner />
          <ProjectBanner />
          <ProjectBanner />
          <ProjectBanner />
        </div>
      </div>
      
      <div class="repositories">
        {/* grabe se repozitorijumi i prikazuju u <For> komponenti (sa limitom, tipa top 3) */}
        <ProfileRepositoryBanner />
        <ProfileRepositoryBanner />
        <ProfileRepositoryBanner />
        <ProfileRepositoryBanner />
        <ProfileRepositoryBanner />
        <ProfileRepositoryBanner />
        <ProfileRepositoryBanner />
        <ProfileRepositoryBanner />
        <ProfileRepositoryBanner />
      </div>
    </div>
  )
}