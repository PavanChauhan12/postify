import Hero from "../../components/Hero"
import RoadmapSection from "@/components/RoadMapSection"
// import { ModelCard } from "@/components/ModelCard"
import FeaturedBlogsFolderStyle from "@/components/FeaturedBlogs"
import Navbar from "../../components/NavBar"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div className="bg-[#f5f1eb] overflow-hidden">
      <Navbar />
      <Hero />
      {/* <ModelCard /> */}
      <FeaturedBlogsFolderStyle />
      <RoadmapSection />
      <Footer/>
    </div>
  )
}
