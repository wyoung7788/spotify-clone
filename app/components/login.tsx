

export const REDIRECT_URI = "http://localhost:3000/api/auth/callback";

const authorizeUser = () => {
    const url = `/api/auth/login`;
    window.location.href = url; // Redirect to login API
};

export default function Login() {
    return (
        <div>
            <button onClick={authorizeUser}>Log in</button>
        </div>
    );
}
