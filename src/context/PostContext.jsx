import { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "../config/supabase";

export const PostContext = createContext()

export const usePost = () => {
    const context = useContext(PostContext)

    if (!context) console.log("No post context")

    return context
}

export const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState([])
    const [adding, setAdding] = useState(false)

    useEffect(() => {
        const getPosts = async () => {
            const user = await supabaseClient.auth.getUser()
            const { error, data } = await supabaseClient.from('posts').select()
                .eq('userId', user.data.user.id)
                .order('id', { ascending: false })

            if (error) throw error;
            setPosts(data);
        }; getPosts()
    }, [])

    const addPost = async (postName) => {
        setAdding(true)
        try {
            const user = await supabaseClient.auth.getUser()
            const { data, error } = await supabaseClient.from('posts').insert({
                name: postName, userId: user.data.user.id
            }).select().single()

            if (error) throw error

            setPosts([...posts, data])
            
        } catch (error) { alert(error) }
        setAdding(false)
    }

    const deletePost = async (_id) => {
        const user = await supabaseClient.auth.getUser()
        await supabaseClient.from('posts').delete()
            .eq('id', _id)
            .eq('userId', user.data.user.id)

        setPosts(posts.filter((post) => post.id !== _id))
    }

    const updatePost = async (_id, data) => {
        const user = await supabaseClient.auth.getUser()
        await supabaseClient.from('posts').update(data)
            .eq('id', _id)
            .eq('userId', user.data.user.id)
    }

    return (
        <PostContext.Provider value={{
            posts, addPost, adding, deletePost, updatePost
        }}>
            {children}
        </PostContext.Provider>
    )
}