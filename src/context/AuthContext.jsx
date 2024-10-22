import { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "../config/supabase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) console.log("No post context")

    return context
}

export function AuthProvider({ children }) {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const usuario = supabaseClient.auth.onAuthStateChange(async (event, session) => {
            if (!session) navigate('/login')
            else {
                setUser(session.user.id)
                navigate('/')
            }
        }); return () => usuario
    }, [])

    const singInGoogle = async () => {
        try {
            const { data, error } = supabaseClient.auth.signInWithOAuth({
                provider: 'google',
                //options: {
                //    redirect_uri: 'http://localhost:3000/auth/callback'
                //}
            })
            if (error) throw new Error('Error signing in with Google')
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const singOutGoogle = async () => {
        const { error } = await supabaseClient.auth.signOut()

        if (error) throw new Error('Error signing out')
    }

    return (
        <AuthContext.Provider
            value={{
                setUser, singInGoogle, singOutGoogle, user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}