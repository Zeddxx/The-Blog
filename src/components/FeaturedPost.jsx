import { GoArrowUpRight } from 'react-icons/go'
import post1 from '../assets/post1.png'
import {IF } from '../url.js'

export default function FeaturedPost({post}){
    return(
        <div className="flex flex-col w-full gap-y-4 mt-6">
          <div className="sm:h-64 bg-black">
            <img src={IF + post.photo} alt={post.title} className='object-cover h-full w-full' />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
                <p className='text-indigo-800 font-semibold'>Sunday , 1 Jan 2023</p>
                <p>@{post.username}</p>
            </div>
            <div className="flex justify-between items-center">
                <h2 className='text-3xl font-semibold text-clip'>{post.title}</h2>
                <GoArrowUpRight className='shrink-0' size={28} />
            </div>
            <p className='text-gray-500'>{post.description.length > 300 ? post.description.slice(0, 300) + ' ' +'...Read more': post.description}</p>
            <div className="flex items-center gap-3 mt-2">
                <span className='text-purple-700 bg-purple-400/20 px-4 rounded-full'>{post.categories[0]}</span>
                <span className='text-blue-700 bg-blue-400/20 px-4 rounded-full'>{post.categories[1]}</span>
                <span className='text-red-700 bg-red-400/20 px-4 rounded-full'>{post.categories[2]}</span>
            </div>
          </div>
          </div>
    )
}