import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { PostProvider } from "./context/PostContext"
import { AuthProvider } from "./context/AuthContext"

export default function App() {
    return <AuthProvider>
        <PostProvider>
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </PostProvider>
    </AuthProvider>
}