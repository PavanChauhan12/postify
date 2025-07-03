import Hero from "../../components/Hero"
import AboutSection from "../../components/AboutSection"
import { ModelCard } from "@/components/ModelCard"
import FeaturedBlogsFolderStyle from "@/components/FeaturedBlogs"

export default function HomePage() {
  return (
    <div className=" bg-[#f5f1eb]">
      <Hero />
      <ModelCard />
      <FeaturedBlogsFolderStyle/>
      <AboutSection />
    </div>
  )
}
