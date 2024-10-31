import { DiBackbone } from "react-icons/di";
import { SignupFormSchema, FormState } from "../lib/definitions";
import { hash } from "bcrypt";


export async function signup(state: FormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })


if (!validatedFields.success){
    return {
        errors: validatedFields.error.flatten().fieldErrors,
    }
}

const { name, email, password } = validatedFields.data
const hashedPassword = await hash(password,10)


}

