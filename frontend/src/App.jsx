import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./web/page"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
import Dashboard from "@/components/DashBoard"
import CreateBlog from "@/components/CreateBlog"
import WriteContent from "@/components/WriteContent"
import BlogsPage from "@/components/BlogsPage"
function App() {
  return (
    <>
      <Router>
        <Routes>
         <Route path="/blogs" element={<BlogsPage/>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<CreateBlog />} />
<Route path="/create/content" element={<WriteContent/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
