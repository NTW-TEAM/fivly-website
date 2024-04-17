"use client";

import { login } from "@/app/auth/signin/actions/login";
import ToastHandler from "@/tools/ToastHandler";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { FaLock } from "react-icons/fa6";
import { LuMail } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { toast } from "react-toastify";

const SignInForm = () => { 

    const handleLogin = async (formData: FormData) => {
        const response = await login(formData);
        ToastHandler.toast(response.message, response.status);
    };

    return (
        <form action={handleLogin}>
            <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
                </label>
                <div className="relative">
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                />

                <span className="absolute right-4 top-5">
                    <LuMail />
                </span>
                </div>
            </div>

            <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                Mot de passe
                </label>
                <div className="relative">
                <input
                    type="password"
                    name="password"
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-white outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                />

                <span className="absolute right-4 top-5">
                    <FaLock />
                </span>
                </div>
            </div>

            <div className="mb-5">
                <input
                type="submit"
                value="Se connecter"
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
            </div>

            <div className="mt-6 text-center">
                <p>
                Pas encore de compte?{" "}
                <Link href="/auth/signup" className="text-primary">
                    Inscris toi ici
                </Link>
                </p>
            </div>
        </form>
    );

};

export default SignInForm;
