import { useLocation } from 'react-router-dom'

export default function Footer(){
    const location = useLocation();
    const shouldShowFooter = () => {
        return !['/signup', '/signin'].includes(location.pathname)
    }
    return shouldShowFooter() && (
        <footer className='max-w-7xl h-16 flex items-center px-4 sm:px-8 text-md mt-12 text-blue-950'>
            <p>&#169; 2023</p>
        </footer>
    )
}