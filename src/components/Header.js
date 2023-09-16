"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'

export default function Header() {
    const searchParams = useSearchParams();
    const [search, setSearch] = useState('')

    const router = useRouter()

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/?search=${search}`)
    }

    useEffect(() => {
        const search = searchParams.get('search') || ''
        setSearch(search)
    }
        , [searchParams])

    return (
        <header className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-zinc-800 background-color: rgb(39 39 42);'>
            <div className='py-4 flex items-center justify-between'>
                <Link href='/'>
                    <span className='text-primary text-2xl font-bold'><img src="/Logo.png" alt="Logo" /></span>
                </Link>

                <div>
                    <form onSubmit={handleSearch} >
                        <input value={search} onChange={(e) => setSearch(e.target.value)} className='border text-sm px-4 outline py-4 rounded-lg' placeholder="Search Movie" />
                    </form>
                </div>
            </div>
        </header>
    )
}
