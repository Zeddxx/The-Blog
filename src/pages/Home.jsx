/* eslint-disable no-unused-vars */
import HomePosts from "../components/HomePosts";
import FeaturedPost from "../components/FeaturedPost";
import { useState, useContext } from "react";
import AllBlogs from "../components/AllBlogs";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
// import Loader from "../components/Loader";
import LoadingHomePosts from "../components/LoadingHomePosts";
import { Link, useLocation } from 'react-router-dom'
import { UserContext } from "../context/UserContext"
import {IF, URL} from '../url.js'
import axios from 'axios'
import { useEffect } from 'react';
import LatestPost from '../components/LatestPost'


export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([])
  const [noResults, setNoResults] = useState(false)
  const {search} = useLocation()
  const { user } = useContext(UserContext)

  const fetchPosts = async() => {
    setIsLoading(true)
    try {
        const res = await axios.get(URL + '/api/posts/' + search)
        console.log(res.data);

        setPosts(res.data)
        if(res.data.length === 0){
            setNoResults(true)
        }else{
            setNoResults(false)
        }
        setIsLoading(false)
    } catch (error) {
        console.log(error);
        setIsLoading(false)
    }
}

useEffect(() => {
    fetchPosts()
}, [search])

// console.log(posts.length > 6);

  return (
    <main className="max-w-7xl mx-auto h-auto mt-6">
      <h1 className="uppercase font-sans text-9xl font-bold text-center w-full border-t-2 border-b-2 border-black/20 leading-none">
        the blog
      </h1>

      {isLoading ? (
        <div className="flex w-full items-center justify-center">
          <LoadingHomePosts />
        </div>
      ) :!noResults?(
        <div className="flex flex-col gap-y-4 mt-12 px-4 sm:px-8">
              <h2 className="text-3xl font-semibold">Recent blog posts</h2>
          <div className="flex flex-col xl:flex-row gap-x-4 h-full items-center gap-y-8">
            <div className="flex flex-col">
              {/* Post heading */}
              {/* Post Image here */}
                      {posts.length > 0 && (
                    <Link to={user?`/posts/post/${posts[0]._id}`:"/signin"}>
                      <HomePosts post={posts[0]} />
                    </Link>
                      )}
            </div>
            {/* {posts.map((post) => (
            <Link key={post._id} to={user?`/posts/post/${post._id}`:"/signin"}><HomePosts post={post} /></Link>
            ))} */}
            <div className="flex flex-col justify-between h-full xl:gap-4 gap-y-6">
              {posts.length > 1 && (
                <Link className='h-[calc(100%/2)]' to={user?`/posts/post/${posts[1]._id}`:"/signin"}>
                  <LatestPost post={posts[1]}/>
              </Link>
              )}
              {posts.length > 2 && (
                <Link className='h-[calc(100%/2)]' to={user?`/posts/post/${posts[2]._id}`:"/signin"}>
                  <LatestPost post={posts[2]}/>
              </Link>
              )}
            </div>
          </div>
          {posts.length > 3 ? (
            <Link to={user?`/posts/post/${posts[3]._id}`: "/signin" }>
              <FeaturedPost post={posts[3]} />
            </Link>
          ) : <h2>No Posts to show</h2>}

          {/* All blogs section */}
          <h2 className="text-2xl font-bold mt-4">All blog posts</h2>
          <div className="w-full flex flex-wrap gap-6">
          {posts.slice(4).map((post) => (
            <Link className='sm:h-[26rem] shrink-0 min-w-[18rem] md:min-w-[22rem] max-w-full flex-1' key={post._id} to={user ? `/posts/post/${post._id}`: '/signin'}>
              <AllBlogs post={post} />
            </Link>
          ))}
          </div>
          {/* <AllBlogs /> */}
        </div>
      ) : <h3>No Posts available</h3>}
    </main>
  );
}
