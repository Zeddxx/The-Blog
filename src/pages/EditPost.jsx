import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { URL, IF } from "../url";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CiImageOn } from "react-icons/ci";
import TextareaAutosize from "react-textarea-autosize";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function EditPost() {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [error, setError] = useState("");
  const [cats, setCats] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const catRef = useRef(null);
  const navigate = useNavigate();


  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/" + postId);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setFile(res.data.photo);
      //   console.log(res.data);
      setCats(res.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  //   Handle the file change to show the uploaded image...
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setSelectedFile(file.name);
      setSelectedFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePreview(reader.result);
        // console.log(reader.result);
      };
      reader.onerror = (error) => {
        console.log("Error: " + error);
      };
      // console.log(file);
    }
    // console.log(file);
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const addCategory = () => {
    let updatedCats = [...cats];

    if (!cat) {
      setError("categories can't be empty");
    } else if (cat.length > 12) {
      setError("Categories must be of max 12 characters");
    } else if (cat.length < 3) {
      setError("Categories must be of min 3 characters");
    } else {
      updatedCats.push(cat);
      setCat("");
      setCats(updatedCats);
      setError("");
    }
  };

  const deleteCategory = (index) => {
    let updatedCats = [...cats];
    updatedCats.splice(index, 1);
    setCats(updatedCats);
  };

  //   Handle the update posts button
  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      description,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (selectedFile) {
        const data = new FormData();
        const filename = Date.now() + selectedFile.name;
        data.append("img", filename);
        data.append("file", selectedFile);
        post.photo = filename;
        // console.log(data);
        try {
          const imgUpload = await axios.post(URL + "/api/upload", data);
        } catch (error) {
          console.log(error);
        }
      }

    try {
      const res = await axios.put(URL + "/api/posts/" + postId, post, {
        withCredentials: true,
      });
      navigate(`/posts/post/${res.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl mt-4 font-bold">Update the post</h2>
        <form className="w-full flex flex-col gap-y-2 mt-6 mb-8">
          <label htmlFor="text">Edit Title :</label>
          <input
            className="text-gray-400 outline rounded px-2 h-8 outline-1"
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
          />
          {/* <img src={IF + file} /> */}
          {imagePreview ? (
            <div className="mt-2 w-full max-w-lg h-64 min-h-64 rounded overflow-hidden outline-dashed outline-gray-400 outline-2">
              <img
                src={imagePreview}
                alt="Selected Image Preview"
                className=" w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="mt-2 max-w-lg min-h-64 h-full w-full grid place-items-center  rounded  outline-dashed outline-gray-400 outline-2">
              <img
                src={IF + file}
                alt={title}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <label
            htmlFor="file"
            onClick={() => openFileInput}
            className="cursor-pointer w-fit px-4 hover:bg-gray-200 py-2 rounded flex items-center gap-4 group"
          >
            {imagePreview ? "Change Image" : "Add Image"}
            <CiImageOn
              className="group-hover:text-black duration-300"
              size={26}
            />
          </label>
          <input
            type="file"
            id="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            // onChange={(e) => setSelectedFile(e.target.files[0])}
            className="hidden"
          />
          <div className="flex flex-col sm:flex-row gap-y-4 gap-x-3 w-full">
            <input
              type="text"
              name="cats"
              id="cats"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addCategory();
                }
              }}
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              placeholder="Enter Categories"
              className="w-full py-2 px-2 outline-1 outline outline-gray-400 rounded"
            />
            <div
              onClick={addCategory}
              className="px-12 w-full flex justify-center cursor-pointer rounded py-2 hover:bg-gray-200 outline outline-1 outline-gray-400"
            >
              Add
            </div>
          </div>

          {error && <p className="text-red-500 font-semibold">{error}</p>}

          <div className="flex mt-3 w-full">
            {cats?.map((c, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-start items-center mr-2"
                >
                  <p
                    ref={catRef}
                    className="bg-blue-400/30 items-center relative gap-x-2 group text-indigo-700 px-4 max-w-[8rem] flex justify-center rounded-full py-1 overflow-hidden"
                  >
                    {c}
                    <span
                      onClick={() => deleteCategory(index)}
                      className="text-black text-lg absolute w-full flex justify-center bg-red-300 h-full items-center group-hover:opacity-100 opacity-0 duration-300 cursor-pointer"
                    >
                      <IoIosCloseCircleOutline />
                    </span>
                  </p>
                </div>
              );
            })}
          </div>

          <label htmlFor="desc">Edit Description</label>
          <TextareaAutosize
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            minRows={4}
            maxRows={18}
            placeholder="Enter post description!"
            className="outline rounded outline-gray-500 outline-1 p-2 text-gray-700"
          />
          <button
            onClick={handleUpdate}
            className="h-12 bg-gray-200 rounded mt-4 hover:outline-gray-400 outline outline-1 outline-white hover:bg-transparent duration-300"
          >
            Update post
          </button>
        </form>
      </div>
    </div>
  );
}
