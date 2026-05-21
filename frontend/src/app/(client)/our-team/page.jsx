import { BlogSection } from "@/components/client/HomeComponents/BlogSection";
import JoinOurTeam from "@/components/client/Our-Team/JoinOurTeam";

import WhoWeAre from "@/components/client/Our-Team/WhoWeAre";
import Marque from "@/shared/Marque";
import OurTeam from "@/shared/OurTeam";
import PageHeader from "@/shared/PageHeader";

const page=() =>{
    return(
        <div className="container ">
    <PageHeader title="Our Team"/>   
    <WhoWeAre/>
    <JoinOurTeam/>
    <OurTeam/>
    <Marque/>
    <BlogSection/>
    </div>
    )
}
export default page;
