import { useState } from "react"
import { usePost } from "../context/PostContext"

const PostForm = () => {

    const { addPost, adding } = usePost()

    const [postName, setPostName] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        addPost(postName);
    }

    return <div>
        <h5>POST FORM</h5><hr />
        <form onSubmit={handleSubmit}>
            <input type="text" name="postName"
                onChange={(e) => setPostName(e.target.value)}
            />
            <button disabled={adding}>
                {adding ? 'Saving...' : 'Save'}
            </button>
        </form>
    </div>
}

export default PostForm