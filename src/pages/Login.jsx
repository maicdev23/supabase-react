import { useAuth } from "../context/AuthContext"

function Login() {
    const { singInGoogle } = useAuth()

    return <>
        <div>
            <h4>Login</h4>
            <button
                onClick={singInGoogle}
                >Login with Google
            </button>
        </div>
    </>
}

export default Login;