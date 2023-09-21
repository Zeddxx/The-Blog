import axios  from 'axios';
import { URL } from '../url.js'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'


export default function Comment({c, post}){

    const { user } = useContext(UserContext)

    return(
        <div className="flex gap-x-2">
            <div className="h-12 w-12 shrink-0 rounded-full font-bold uppercase text-2xl grid place-items-center text-white bg-indigo-800">
              {c.author.slice(0 ,1)}
            </div>
            <p className="mt-2 shadow-xl min-h-[3rem] items-center outline-dashed outline-1 outline-gray-400 w-full rounded-tr-xl rounded-br-xl rounded-bl-xl flex px-4 py-2">
              {c.comment}
            </p>
          </div>
    )
}