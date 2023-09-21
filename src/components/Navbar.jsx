import { Link, useLocation, useNavigate } from "react-router-dom";
// import { SiBloglovin } from 'react-icons/si'
import { CiLogout } from "react-icons/ci";
import logo from "../assets/logo.png";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url.js";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  // const path = useLocation.pathname

  const shouldShowNavbar = () => {
    return !["/signup", "/signin"].includes(location.pathname);
  };

  const { user } = useContext(UserContext);
  // console.log(user.username);
  const { setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      // console.log(res);
      setUser(null);
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!user) {
      setUsername("");
    } else {
      setUsername(user.username);
    }
  }, [user]);
  // const getUsername = async () => {
  //   try {
  //     const res = await axios.get(URL + '/api/users/' + user._id)
  //     setUsername(res.data.username)
  //     console.log(username);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // useEffect(() => {
  //   getUsername()
  // }, [])

  return (
    shouldShowNavbar() && (
      <nav className="h-20 flex sticky top-0 z-30 bg-white items-center justify-between max-w-7xl mx-auto w-full px-4 sm:px-8">
        {/* <Link to='/' className="text-xl font-semibold uppercase"><SiBloglovin size={30} /></Link> */}
        <Link to="/" className="text-xl font-semibold uppercase h-10 w-10">
          <img
            src={logo}
            alt="Our logo"
            className="h-full w-full object-contain"
          />
        </Link>
        <div className="flex gap-x-4 items-center">
          <Link className="capitalize tracking-wide" to="/blog">
            Blog
          </Link>
          {user ? (
            <>
              <Link
                className="capitalize tracking-wide flex items-center gap-x-2 hover:bg-gray-200 duration-300 p-2 rounded"
                to="/create"
              >
                <HiOutlinePencilSquare size={20} />
                <p className="hidden sm:block">Create</p>
              </Link>
              <Link
                className="capitalize tracking-wide flex items-center sm:gap-x-2 hover:bg-gray-200 duration-300 p-2 rounded"
                to={"/profile/" + user._id}
              >
                <AiOutlineUser size={22} />
                <p className="hidden sm:block">{username}</p>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-x-2 relative group hover:bg-gray-200 rounded duration-300 p-2"
                title="Logout"
              >
                <CiLogout size={24} />
              </button>
            </>
          ) : (
            <>
              <Link className="capitalize tracking-wide" to="/signin">
                Sign In
              </Link>
              <Link
                className="capitalize tracking-wide flex items-center gap-x-2"
                to="/create"
              >
                <HiOutlinePencilSquare size={20} />
                <p className="hidden sm:block">Create</p>
              </Link>
            </>
          )}
        </div>
      </nav>
    )
  );
}
