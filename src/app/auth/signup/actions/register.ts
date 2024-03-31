"use server";

interface registerFormErrors {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirm: string;
    other?: string;
}

export async function register(formData: FormData) {
    try {
        

/*         const errors = validateForm(formData);

        if (Object.values(errors).some((error) => error !== "")) {
            handleErrors(errors);
            return;
        } */

        const bodi = {
          "firstName": formData.get("firstname"),
          "lastName": formData.get("lastname"),
          "email": formData.get("email"),
          "password": formData.get("password"),
          "phoneNumber": formData.get("phone"),
          "numberAndStreet": formData.get("address"),
          "postalCode": formData.get("zip"),
          "city": formData.get("city"),
          "country": formData.get("country"),
        };

        console.log(JSON.stringify(bodi));
        
        

        const response = await fetch(`${process.env.API_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodi),
        });

        const data = await response.json();

        console.log(data);

/*         if (data.errors) {
            errors.other = data.errors; 
            handleErrors(errors);
            return;
        }    */
    } catch (error) {
        throw error;
    }

    return formData;
}

function validateForm(formData: FormData) : registerFormErrors {
    const firstName = formData.get("firstname");
    const lastName = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    const errors: registerFormErrors = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    };

    if (!firstName) {
        errors.firstName = "First name is required";
    }

    if (!lastName) {
        errors.lastName = "Last name is required";
    }

    if (!email) {
        errors.email = "Email is required";
    }

    if (!password) {
        errors.password = "Password is required";
    }

    if (!passwordConfirm) {
        errors.passwordConfirm = "Confirm password is required";
    }

    if (password !== passwordConfirm) {
        errors.passwordConfirm = "Passwords do not match";
    }

    return errors;
}

function handleErrors(errors: registerFormErrors) {
    // Handle errors
    console.log(errors);
}