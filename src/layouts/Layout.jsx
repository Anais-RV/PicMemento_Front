import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

const layout = () => {
    return (
        <>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default layout