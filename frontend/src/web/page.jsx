import Hero from "../../components/Hero"
import AboutSection from "../../components/AboutSection"
// import { ModelCard } from "@/components/ModelCard"
import FeaturedBlogsFolderStyle from "@/components/FeaturedBlogs"
import Navbar from "../../components/NavBar"
import Footer from "@/components/Footer"

export default function HomePage() {
  return (
    <div className=" bg-[#f5f1eb]">
      <Navbar />
      <Hero />
      {/* <ModelCard /> */}
      <FeaturedBlogsFolderStyle />
      <AboutSection />
      <Footer/>
    </div>
  )
}
