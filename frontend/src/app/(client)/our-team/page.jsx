import { BlogSection } from "@/components/client/HomeComponents/BlogSection";
import JoinOurTeam from "@/components/client/Our-Team/JoinOurTeam";

import WhoWeAre from "@/components/client/Our-Team/WhoWeAre";
import HeroBanner from "@/shared/HeroBanner";
import Marque from "@/shared/Marque";
import OurTeam from "@/shared/OurTeam";


const page=() =>{
    return(
        <>
    <HeroBanner/>   
    <WhoWeAre/>
    <JoinOurTeam/>
    <OurTeam/>
    <Marque/>
    <BlogSection/>
    </>
    )
}
export default page;
