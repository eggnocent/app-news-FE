"use client"

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";


const ButtonLogout = () => {
    const router = useRouter()

    const handleLogout = () => {
        deleteCookie("accessToken")

        router.push("/login")
    };

    return (
        <div className="space-y-2">
        <form action={handleLogout}>
                <Button type="submit" variant={"destructive"}>
                    <LogOut className="mr-2 h-4 w-full"/>
                    Logout
                </Button>
            </form>
        </div>
    )
}

export default ButtonLogout;