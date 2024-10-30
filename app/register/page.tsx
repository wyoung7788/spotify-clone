
import { signup } from "../actions/auth"

const Register = () => {

    return(
        <form className="flex items-center justify-center min-h-screen">
            <div>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" placeholder= "Name"/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" placeholder= "Email"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"/>
            </div>
            <button type="submit">Sign Up</button>
            </div>
        </form>
    )
};
export default Register;