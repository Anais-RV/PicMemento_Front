import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from '../layouts/Layout';

const RouterItem = () => {
    return(
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Layout/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterItem;