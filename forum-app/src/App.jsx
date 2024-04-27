import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Notfound from "./pages/Notfound";
import Register from "./pages/Register";
import SingleThread from "./components/SingleThread";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/single-thread" element={<SingleThread/>}/>
            <Route path="/leaderboards" element={<Leaderboard/>}/>
            <Route path="*" element={<Notfound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;