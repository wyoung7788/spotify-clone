
import { signup } from "../actions/auth"
import { usersTable } from "../db/schema";
import { db } from "../db";

export default async function Register(){

    const post = await db.query.usersTable.findMany();
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
        }} className="flex items-center justify-center min-h-screen gap-5">
            <div>
                <div className="font-bold">Register User</div>
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
            <button className="bg-slate-500 gap-5" type="submit">Sign Up</button>
            </div>
        </form>
        <div>
        
        </div>

        </div>

    )
};
