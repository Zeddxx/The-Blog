import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Create from "./pages/Create";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import PostDetails from './pages/PostDetails'
import { UserContextProvider } from "./context/UserContext";
import EditPost from './pages/EditPost'

export default function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route exact path="/create" element={<Create />} />
        <Route exact path="/posts/post/:id" element={<PostDetails />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
      </Routes>
      <Footer />
    </UserContextProvider>
  );
}
