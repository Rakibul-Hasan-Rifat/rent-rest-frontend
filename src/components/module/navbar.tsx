import Link from 'next/link'
import { ChevronDown, LogOut, Menu, Settings, UserRound } from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Resources', href: '#' },
]

export function Navbar() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/75">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-6 px-6"
      >
        <Link href="#" className="flex items-center gap-2.5 justify-self-start" aria-label="Northstar home">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            N
          </span>
          <span className="font-semibold tracking-tight">Northstar</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex grow justify-center">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted hover:text-foreground ${
                index === 0 ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'
              }`}
              aria-current={index === 0 ? 'page' : undefined}
            >
              {item.label}
            </Link>
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
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="sm" className="gap-2 px-2" />}
            >
              <Avatar size="sm">
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline">Alex Lee</span>
              <ChevronDown className="hidden sm:inline" aria-hidden="true" />
              <span className="sr-only">Open user menu</span>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <span className="block">Alex Lee</span>
                <span className="block font-normal text-muted-foreground">alex@example.com</span>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <UserRound aria-hidden="true" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings aria-hidden="true" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut aria-hidden="true" />
              Sign out
            </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  )
}
