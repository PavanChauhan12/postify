import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./web/page"
import SignUp from "../components/SignUp"
import SignIn from "../components/SignIn"
// import Dashboard from "../components/Dashboard"
// import CreateBlog from "../components/CreateBlog"

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-blog" element={<CreateBlog />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
