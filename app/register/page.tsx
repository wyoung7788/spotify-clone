
import { signup } from "../actions/auth"
import { usersTable } from "../db/schema";
import { db } from "../db";


export const goHome = () => {
    const url = '/'
    window.location.href = url; // Redirect to home page
};

    // this handle function should call multiple types
    // first let's call artist 
    // define a function that let's us pass in a type 

export default async function Register(){

    return(
        <div></div>
    )
    const post = await db.query.usersTable.findMany();
    /*
    return(
        
        <div>
            
        <form action={async () => {
            'use server'
            await db.insert(usersTable).values({
                id: 1,
                age: 20,
                email: "test@example.com",
                name: "bob",
            })
        }} className="flex items-center justify-center min-h-screen ml-5 mr-5 font-semibold">
            <div>
                <div className="font-bold text-4xl mb-10 text-green-400">Register User</div>
            <div>
                <label htmlFor="username" className="block mb-1 mt-2">Username</label>
                <input id="username" name="username" className="block" placeholder= "username"/>
            </div>
            <div>
                <label htmlFor="email" className="block mb-1 mt-2 ">Email</label>
                <input id="email" name="email"  className="block" placeholder= "test@example.com"/>
            </div>
            <div>
                <label htmlFor="password" className="block mb-1 mt-2">Password</label>
                <input id="password" name="password" className="block" type="password"/>
            </div>
            <button className="mt- gap-5 justify-center" type="submit">Sign Up</button>
            <button onClick={goHome}className="mt-5 ml-5">Go Home</button>
            </div>
        </form>
        
        <div>
            
            </div>
        
        </div>


    )
        */
};
