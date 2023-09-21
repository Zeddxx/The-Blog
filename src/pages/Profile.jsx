import { FaUser } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import ProfilePost from "../components/ProfilePosts";
import LoadingHomePosts from "../components/LoadingHomePosts";
import { IF, URL } from "../url.js";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const param = useParams().id;
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (isEdit === true) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isEdit]);

  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + param);
      setPosts(res.data);
      console.log(res.data);
      console.log(posts);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserPosts();
  }, [param]);

  return (
    <main className="max-w-7xl mx-auto px-4 w-full sm:px-8">
      <div className="h-56 w-full bg-gradient-to-r from-orange-300 to-indigo-200 relative">
        <div className="h-28 w-28 bg-blue-200 rounded-full outline outline-4 outline-white absolute translate-y-40 translate-x-4 grid place-items-center">
          {/* <FaUser className='text-5xl text-white'/> */}
          <h4 className="text-6xl capitalize font-bold">
            {user?.username?.slice(0, 1)}
          </h4>
        </div>
      </div>

      <div className="flex justify-between items-center px-3">
        <div className="flex flex-col mt-14">
          <h1 className="text-lg font-semibold capitalize">@{user.username}</h1>
          <p className="text-lg">{user.email}</p>
          <p className="mt-2 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Perferendis animi eveniet natus inventore? Amet minima veritatis
            sequi omnis harum illo exercitationem nihil.
          </p>
        </div>

        <h2
          onClick={() => setIsEdit(!isEdit)}
          className="text-blue-600 underline text-md cursor-pointer"
        >
          Edit
        </h2>
      </div>

      {isEdit && (
        <div className="fixed w-full h-screen bg-black/20 top-0 left-0 z-40 flex items-center justify-center">
          <div className="h-96 max-w-sm sm:max-w-lg md:max-w-2xl w-full bg-white rounded p-4 relative">
            <div
              onClick={() => setIsEdit(!isEdit)}
              className="outline outline-1 outline-gray-500 w-fit px-2 rounded absolute right-4 cursor-pointer hover:bg-gray-200 hover:outline-white duration-300"
            >
              close
            </div>
          </div>
        </div>
      )}

      {/* Users Blogs */}
      <div className="flex w-full px-3 mt-8 mb-8">
        <h2 className="text-2xl font-semibold">Your posts</h2>
      </div>
      <div className="w-full flex flex-wrap gap-6">
        {isLoading ? (
            <LoadingHomePosts />
        ) : (
          posts?.map((p) => (
            <Link key={p._id} className="sm:h-[26rem] shrink-0 min-w-[18rem] md:min-w-[22rem] max-w-full flex-1" to={`/posts/post/` + p._id}>
              <ProfilePost p={p} />
            </Link>
          ))
          )}
          </div>
    </main>
  );
}
