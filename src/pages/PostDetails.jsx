
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { BiMessageSquareEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { VscSend } from "react-icons/vsc";
import Comment from '../components/Comment'

export default function PostDetails() {
  const postId = useParams().id;
  // console.log(postId);
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(post);

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setPost(res.data);
      // console.log(post.title);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(URL + "/api/posts/" + postId, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + "/api/comments/post/" + postId);
      setComments(res.data);
    //   console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  const postComment=async(e)=>{
    e.preventDefault()
    try {
      if (!comment) {
        // Provide user feedback or handle the case where the comment is empty
        console.error("Comment is required.");
        return;
      }
      const res = await axios.post(
        URL + "/api/comments/create",
        { comment: comment, author: user.username, postId: postId, userId: user._id },
        { withCredentials: true }
      );
  
      // Assuming `res.data` contains the newly created comment
      setComments([...comments, res.data]); // Update the comments state with the new comment
      setComment(""); // Clear the comment input field
    }
    catch(err){
         console.log(err)
         if (err.response) {
          // The server responded with an error status code (4xx or 5xx)
          console.error("Server Error:", err.response.data);
        } else if (err.request) {
          // The request was made, but no response was received
          console.error("Request Error:", err.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Request Setup Error:", err.message);
        }
    }

  }
  return (
    <div className="flex flex-col gap-y-4 mt-4 max-w-7xl w-full mx-auto px-4 sm:px-8">
      <div className="sm:h-[36rem] relative w-full max-w-3xl mx-auto flex justify-center">
        {user && user._id === post?.userId && (
          <div className="flex absolute right-2 top-4 h-full gap-x-2">
            <h2
              onClick={handleDelete}
              className="cursor-pointer sticky top-24 bg-white h-fit px-3 rounded py-[5px] sm:py-1 group flex items-center gap-x-2"
            >
              <p className="hidden sm:flex">Delete</p>{" "}
              <AiOutlineDelete size={20} />
            </h2>
            <h2
              onClick={() => navigate("/edit/" + postId)}
              className=" cursor-pointer sticky top-24 bg-white h-fit px-3 rounded py-[5px] sm:py-1 flex items-center group gap-x-3 overflow-hidden text-md"
            >
              <p className="hidden sm:flex">Edit</p>{" "}
              <BiMessageSquareEdit size={20} />
            </h2>
          </div>
        )}
        <img src={IF + post.photo} className="h-full w-full object-cover" alt="post 1" />
      </div>
      <div className="flex flex-col max-w-3xl w-full mx-auto gap-y-3">
        <div className="flex w-full items-center gap-x-3">
          <p className="text-indigo-900 font-semibold">
            {new Date(post.updatedAt).toString().slice(0, 3) +
              "," +
              new Date(post.updatedAt).toString().slice(3, 15)}
          </p>
          <p>@{post.username}</p>
        </div>
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="text-gray-600">{post.description}</p>

        <div className="flex items-center gap-x-2">
          {post.categories?.map((c, i) => (
            <span
              key={i}
              className="text-purple-700 bg-purple-400/20 px-4 rounded-full"
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full mt-6 border-t pt-4">
        <h4 className="text-lg text-gray-600 flex items-center gap-x-2">
          <GoCommentDiscussion /> Comments:
        </h4>
        <div className="flex max-w-3xl gap-x-4 mx-auto items-center w-full mt-6">
          <input
            type="text"
            onChange={(e) => setComment(e.target.value)}
            className="w-full border-b focus:outline-none py-2 px-4 text-gray-700"
            placeholder="Add a comment"
          />
          <button
            onClick={postComment}
            className="h-8 mt-3 px-8 flex items-center gap-x-2 hover:bg-gray-400 duration-300 bg-black text-white rounded"
          >
            <p className="hidden sm:flex">Post</p> <VscSend />
          </button>
        </div>

        <h3 className="text-lg text-gray-400 mt-8 underline underline-offset-2">
          Related post comments
        </h3>

        <div className="flex flex-col gap-y-4 mt-6">
          {comments?.map((c, i) => (
            <Comment key={i} c={c} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
