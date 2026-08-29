import Link from 'next/link'
import { Home, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import getMe from '@/service/get-me'
import UserMenu from './user-menu'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Spinner } from "@/components/ui/spinner"
import { User } from '@/types'
import { Suspense } from 'react'
import NavLink from './nav-link'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Resources', href: '#' },
]

export async function Navbar() {

  const myProfile = await getMe()
  const userData = myProfile?.data;

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/75">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-6 px-6 bg-white"
      >
        <Link href="/" className="flex items-center gap-2.5 justify-self-start" aria-label="Northstar home">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            <Home className="h-4 w-4" />
          </span>
          <span className="font-semibold tracking-tight">Basha</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex grow justify-center">
          {navItems.map((item, index) => (
            <NavLink key={index} item={item} />
          ))}
        </div>
        <div className="flex items-center gap-1 justify-self-end">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon" className="size-8 md:hidden" />}
            >
              <Menu aria-hidden="true" />
              <span className="sr-only">Open navigation menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuGroup>
                {navItems.map((item) => (
                  <DropdownMenuItem key={item.label} render={<Link href={item.href} />}>
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {
            userData ? (
              <Suspense fallback={<Spinner />}>
                <UserMenu user={userData as User} />
              </Suspense>
            ) : (
              <Link href="/auth/login">
                <Button size={'lg'}>Login</Button>
              </Link>
            )
          }
        </div>
      </nav>
    </header>
  )
}
