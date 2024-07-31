import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Components/Common/Navbar";


function App(){


    return(
        <div className="w-screen min-h-screen bg-black flex flex-col font-inter overflow-x-hidden">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    )
}
export default App;