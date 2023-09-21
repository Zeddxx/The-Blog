import { PiInfoLight } from "react-icons/pi";
import { useState, useRef, useEffect, useContext } from "react";
import { CiImageOn } from "react-icons/ci";
import { FcRemoveImage } from "react-icons/fc";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { URL } from "../url";
import { useNavigate } from "react-router-dom";
import { IoIosCloseCircleOutline } from 'react-icons/io'

export default function Create() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [description, setDesc] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const catRef = useRef(null);

  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log(selectedFile);
  //   For file input
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // setSelectedFile(file.name);
      setSelectedFile(file)
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
    let updatedCats = [...cats]
    updatedCats.splice(index, 1)
    setCats(updatedCats)
  }
  const handleCreate = async (e) => {
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
      console.log(data);
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.post(URL + "/api/posts/create", post, {
        withCredentials: true,
      });
      navigate("/posts/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(cats);
  return (
    <div className="h-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center">
      <div className="flex items-center gap-4 mt-5 h-fit relative">
        <h2 className="text-3xl">Create posts</h2>
        <span className="cursor-pointer peer">
          <PiInfoLight className="mt-2" size={24} />
        </span>
        {/* Info container */}
        <div
          className={`absolute w-64 h-56 shadow-xl top-10 sm:translate-x-3/4 bg-white rounded p-4 border flex flex-col gap-y-2 opacity-0 peer-hover:opacity-100 pointer-events-none peer-hover:pointer-events-auto`}
        >
          <h1 className="text-xl uppercase font-semibold">Info</h1>
          <p className="text-gray-500">
            Abusive content, including hate speech, insults, or threats, not
            only harms others but also undermines our platforms integrity.
          </p>
          <p>With regards, Blog</p>
        </div>
      </div>

      <form className="mt-6 flex flex-col gap-y-4 w-full max-w-lg">
        <label htmlFor="title" className="text-md">
          Enter Title
        </label>
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          className="px-2 outline outline-1 rounded h-8 outline-gray-400"
          placeholder=""
        />
        {imagePreview ? (
          <div className="mt-2 w-full max-w-lg h-64 rounded overflow-hidden outline-dashed outline-gray-400 outline-2">
            <img
              src={imagePreview}
              alt="Selected Image Preview"
              className=" w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="mt-2 max-w-lg h-64 w-full grid place-items-center  rounded  outline-dashed outline-gray-400 outline-2">
            <FcRemoveImage className="text-9xl" />
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
        {/* {selectedFile && <p>Selected File: {selectedFile}</p>} */}
        {/*  */}
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

        {/* Categories */}
        <div className="flex mt-3 w-full">
          {cats?.map((c, index) => {
            return (
              <div key={index} className="flex justify-start items-center mr-2">
                <p
                  ref={catRef}
                  className="bg-blue-400/30 items-center relative gap-x-2 group text-indigo-700 px-4 max-w-[8rem] flex justify-center rounded-full py-1 overflow-hidden"
                >
                  {c}
                <span onClick={() => deleteCategory(index)} className='text-black text-lg absolute w-full flex justify-center bg-red-300 h-full items-center group-hover:opacity-100 opacity-0 duration-300 cursor-pointer'><IoIosCloseCircleOutline /></span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Description */}
        <TextareaAutosize
          onChange={(e) => setDesc(e.target.value)}
          minRows={3}
          maxRows={6}
          placeholder="Enter post description!"
          className="outline rounded outline-gray-500 outline-1 p-2 text-gray-700"
        />
        <button
          // onClick={handleCreate}
          onClick={handleCreate}
          className="outline hover:bg-gray-200 hover:outline-gray-200 duration-300 outline-1 py-2 text-lg rounded outline-gray-500"
        >
          Create
        </button>
      </form>
    </div>
  );
}
