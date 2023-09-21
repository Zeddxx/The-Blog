import post2 from '../assets/post2.png'
import post3 from '../assets/post3.png'
import { IF } from '../url.js'

export default function latestPost({post}){
    return(
        <>
        <div className="flex flex-col sm:flex-row xl:min-h-full xl:h-[14.9rem] justify-center sm:h-44 w-full gap-x-4">
        <div className="sm:w-1/2">
            <img src={IF + post.photo} alt="post 2" className='h-full w-full object-cover' />
        </div>
        <div className="sm:w-2/3 flex flex-col gap-2 justify-center">
        <p className='text-indigo-800 font-semibold'>{new Date(post.updatedAt).toString().slice(0, 3) + ',' + new Date(post.updatedAt).toString().slice(3, 15)}</p>
            <h3 className='text-2xl font-semibold leading-0'>{post.title.length > 40 ? post.title.slice(0, 45) + '...' : post.title}</h3>
            <p className='text-gray-500'>{post.description.length > 58 ? post.description.slice(0, 120) + '...Read more' : post.description}</p>
        </div>
      </div>
      {/* <div className="flex flex-col sm:flex-row sm:h-44 mt-4 w-full gap-x-4">
        <div className="sm:w-1/2">
            <img src={post3} alt="post 3" className='h-full w-full object-cover' />
        </div>
        <div className="sm:w-2/3 flex flex-col gap-2">
        <p className='text-indigo-800 font-semibold mt-2'>Sunday , 1 Jan 2023</p>
            <h3 className='text-2xl font-semibold'>Building your API Stack</h3>
            <p className='text-gray-500'>The rise of RESTful APIs has been met by a rise in tools for creating, testing, and manag...</p>
        </div>
      </div> */}
      </>
    )
}