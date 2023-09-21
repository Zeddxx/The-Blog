/* eslint-disable react/prop-types */
// import post1 from '../assets/post1.png'
import { GoArrowUpRight } from 'react-icons/go'
import { IF } from '../url.js'
import { useState } from 'react'
import {FcRemoveImage} from 'react-icons/fc'

export default function HomePosts({post}) {
  const [imageLoadError, setImageLoadError] = useState(false)

  const handleImageError = () => {
    setImageLoadError(true)
  }
  return (
    <div className="w-full flex flex-col gap-y-4 mt-4">
      <div className="flex flex-col w-full gap-y-4">
          <div className="h-64 xl:h-[16.5rem] w-full">
            {!imageLoadError ? (
              <img 
              src={IF + post.photo} 
              alt={post.title} 
              onError={handleImageError}
              className='object-cover h-full w-full' />
            ) : (
              <div className="h-full w-full bg-gray-300 grid place-items-center text-white">
                <FcRemoveImage size={120} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
                <p className='text-indigo-800 font-semibold'>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
                <p>@{post.username}</p>
            </div>
            <div className="flex justify-between items-center gap-x-2">
                <h2 className='text-3xl font-semibold'>{post.title}</h2>
                <GoArrowUpRight className='shrink-0' size={30} />
            </div>
            <p className='text-gray-500'>{post.description.length > 320 ? post.description.slice(0, 300) + '...read more' : post.description}</p>
            <div className="flex items-center gap-3">
                {post.categories?.map((c, i) => (
                  <span key={i} className='text-purple-700 bg-purple-400/20 px-4 rounded-full'>{c}</span>
                ))}
            </div>
          </div>
      </div>
    </div>
  );
}
