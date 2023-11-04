import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from '../layouts/Layout';
import Landing from '../pages/Landing';

const RouterItem = () => {
    return(
        <BrowserRouter>
            <Routes>
            <Route path='/' element={<Layout/>}>
            <Route path='/' element={<Landing/>}></Route>
            </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterItem;