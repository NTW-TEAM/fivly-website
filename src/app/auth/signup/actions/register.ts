"use server";

interface registerFormErrors {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export async function register(formData: FormData) {
    try {
        console.log(formData);
        
    } catch (error) {
        console.log("feuuuuuur");
        
        throw error;
    }

    return formData;
}

function validateFormData(formData: FormData) {
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return false;
    }


}