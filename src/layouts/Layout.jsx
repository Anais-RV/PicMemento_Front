import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const layout = () => {
    return (
        <>
            <Outlet/>
            <Navbar/>
            <Footer/>
        </>
    )
}

export default layout