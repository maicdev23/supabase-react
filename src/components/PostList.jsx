import { usePost } from "../context/PostContext"

const PostList = () => {
    const { posts, deletePost, updatePost } = usePost()

    const handleDelete = (id) => deletePost(id)

    const handleDone = (id, done) => updatePost(id, done)

    return <div>
        <h5 className="mt-4">POST LIST</h5><hr />
        {
            posts?.map(post => (
                <div key={post.id}>
                    <li>
                        <h6>{post.name} , {JSON.stringify(post.done)}</h6>
                        <div>
                            <button
                                onClick={() => handleDelete(post.id)}
                            >Delete</button>
                            <button
                                onClick={() => handleDone(post.id, { done: !post.done })}
                            >Done</button>
                        </div>
                    </li><hr />
                </div>
            ))
        }
    </div>
}

export default PostList