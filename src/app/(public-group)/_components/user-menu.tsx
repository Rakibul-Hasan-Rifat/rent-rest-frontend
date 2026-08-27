"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ChevronDown, LogOut, Settings, UserRound } from 'lucide-react'
import { User } from '@/types'
import logoutAction from '../_actions/logout-action';


const UserMenu = ({ user }: { user: User }) => {

    const { name, email } = user;

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={<Button variant="ghost" size="lg" className="gap-2 px-2" />}
                >
                    <Avatar size="default">
                        <AvatarFallback>{name.split(" ").map(word => word.charAt(0))}</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-sm font-medium sm:inline">{name}</span>
                    <ChevronDown className="hidden sm:inline" aria-hidden="true" />
                    <span className="sr-only">Open user menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>
                            <span className="block">{name}</span>
                            <span className="block font-normal text-muted-foreground">{email}</span>
                        </DropdownMenuLabel>
                        <DropdownMenuItem className={"cursor-pointer"}>
                            <UserRound aria-hidden="true" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className={"cursor-pointer"}>
                            <Settings aria-hidden="true" />
                            Settings
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" className="cursor-pointer" onClick={() => logoutAction()}>
                        <LogOut aria-hidden="true" />
                        Sign out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
};

export default UserMenu;