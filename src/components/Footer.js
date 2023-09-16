import React from 'react'

export default function Footer() {
    return (
        <footer className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='text-center py-4'>
                <p className='text-sm text-gray-500'>Bunix Movie App {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}
