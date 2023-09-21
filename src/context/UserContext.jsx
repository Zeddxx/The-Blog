import axios from 'axios'
import {createContext, useEffect, useState } from 'react'
import { URL } from '../url.js'

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user, setUser] = useState(false)
     useEffect(() => {
        getUser()
     }, [])

     const getUser = async () => {
        try {
            const res = await axios.get(URL + '/api/auth/refetch', {withCredentials: true})
            console.log(res);
            setUser(res.data)
        } catch (error) {
            console.log(error);
        }
     }
    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}