"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { formSchema } from "./validation";
import axiosInstance from "../../../../../lib/axios";
import { setCookie } from "cookies-next";


const SubmitButton = () => {
    const {pending} = useFormStatus()

    return (
        <Button
        disabled= {pending} className="w-full" type="submit"> 
            {pending ? 'Loading...' : 'Submit'}
        </Button>
    )
}

const FormSignIn = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string[]>([]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        const validation = formSchema.safeParse({
            email,
            password
        })

        if (!validation.success) {
            const errorMessage = validation.error.issues.map(issue => issue.message)
            setError(errorMessage)
            return;
        }

        await axiosInstance.post('/login', {email: email, password: password})
            .then((response) => {
                setCookie('accessToken', response.data.access_token)
                router.push('/dashboard');
            }).catch((error) => {
                setError(['Login gagal, periksa akun anda kembali', error.message])
                return;
            });
    }

    return (
        <div className="w-full h-screen">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-9">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign In to Dashboard
                    </h2>
                </div>

                {error.length > 0 && (
                    <div className="mx-auto my-7 bg-red-500 w-[400px] py-4 rounded-lg text-white">
                        <div className="list-disc list-inside">
                            {error.map((value, index) => (
                                <li key={index}>{value}</li>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input type="email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email} placeholder="E-mail.." name="email" required />
                        <Input type="password" placeholder="Password..."
                        onChange={(e) => setPassword(e.target.value)} value={password} name="password" required />
                        <div className="flex justify-center">
                        <SubmitButton/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FormSignIn;
