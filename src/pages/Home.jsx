import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { supabaseClient } from "../config/supabase";

function Home() {
    return <>
        <div>
            <h4>Home Page</h4>
            <button
                onClick={() => supabaseClient.auth.signOut()}>
                Logout
            </button>
        </div><hr />

        <div>
            <div> <PostForm /> </div>
            <div> <PostList /> </div>
        </div>
    </>
}

export default Home;