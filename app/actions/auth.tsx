import { SignupFormSchema, FormState } from "../lib/definitions";

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
const hashedPassword = await 
}

