import catImg from '../assets/7d691c444f998bb3c25bee55007edb3c.png'
import bgImg from '../assets/casual-life-3d-pink-chart-with-green-graph 1.png'
import avatarImg from '../assets/ada7dc67bbadb196265785cf180c48e8.png'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import axios from 'axios'
import {URL} from '../url.js'

export default function Signup(){
    const [isShown, setIsShown] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // Register user button
    const handleRegister = async() => {
        try {
            const res = await axios.post(URL + "/api/auth/register", {username, email, password})
            console.log(res);
            setUsername(res.data.username)
            setEmail(res.data.email)
            setPassword(res.data.password)
            setError('')
            // navigate('/signin')
            navigate("/signin")
        } catch (error) {
            setError(error)
            console.log(error);
        }
    }
    return(
        <>
            <div className="max-w-2xl -z-10 h-screen w-full absolute left-0 top-0 bg-pink-200 hidden xl:block"></div>
        <main className="h-screen z-10 max-w-7xl mx-auto flex md:flex-row relative flex-col">
            <div className="h-3/4 md:h-full relative w-full flex items-center justify-center md:w-1/2 bg-transparent md:bg-pink-200">
                    <img src={bgImg} className='h-64 drop-shadow-xl rounded-2xl hue-rotate-180' alt='background' />
                    <img className='absolute top-2/3 drop-shadow-xl -translate-y-1/2 w-64 -translate-x-[40%] xl:w-96 xl:-translate-y-2/3 md:w-80' src={avatarImg} alt='avatar image' />
                    <img className='absolute top-1/2 drop-shadow-xl -translate-y-[5%] w-64  translate-x-[50%] scale-[.7]' src={catImg} alt='cat image' />
            </div>
            <div className="h-full w-full flex justify-center items-center mt-8 md:mt-0 md:w-1/2">
                <div className='flex flex-col gap-y-4 items-center w-full px-8 xl:px-0 xl:w-2/3'>
                    <h1 className='text-2xl font-semibold'>Sign up</h1>
                    <div className="flex flex-col w-full gap-2 relative">
                        <p className='text-md font-medium'>Username</p>
                        <input onChange={(e) => setUsername(e.target.value)} type="name" name="name" id="name" className='rounded-md outline outline-2 outline-gray-600 focus:outline-[#7EBCC3] py-2 px-4' placeholder='Enter your username' />
                        <label htmlFor="name" className='absolute top-2/3 -translate-y-[30%] right-4 font-light'><AiOutlineUser size={20} /></label>
                    </div>
                    <div className="flex flex-col w-full gap-2 relative">
                        <p className='text-md font-medium'>Email Address</p>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className='rounded-md outline outline-2 outline-gray-600 focus:outline-[#7EBCC3] py-2 px-4' placeholder='Example@rocket.mail' />
                        <label htmlFor="email" className='absolute top-2/3 -translate-y-[30%] right-4 font-light'><HiOutlineMailOpen size={20} /></label>
                    </div>
                    <div className="flex flex-col w-full gap-2 relative">
                        <p className='text-md font-medium'>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} type={isShown ? 'text' : 'password'} name="password" id="password" className='rounded-md outline outline-2 outline-gray-600 focus:outline-[#7EBCC3] py-2 px-4' placeholder='Enter your password' />
                        <label htmlFor="password" onClick={() => setIsShown(!isShown)} className='absolute top-2/3 -translate-y-[30%] right-4 font-light'>{isShown ? <HiOutlineEye size={20} /> : <HiOutlineEyeSlash size={20} />}</label>
                    </div>
                    <button onClick={handleRegister} className='bg-[#7EBCC3] w-full text-lg py-2 rounded-md text-white mt-2'>Create Account</button>
                    {error && <h3 className='text-sm text-red-500'>{error}</h3>}
                    <p className='font-semibold'>Have an account? <Link to='/signin' className='text-[#7EBCC3]'>Sign up</Link></p>
                </div>
            </div>
        </main>
        </>
    )
}