"use client"
import React, { useState, useEffect } from 'react'
import Loader from '@/components/Loader'
import Link from 'next/link'

export default function MovieDetails({ params }) {
    const [loading, setLoading] = useState(false)
    const [movie, setMovie] = useState({})

    const API_DOMAIN = 'https://api.themoviedb.org/3/'
    const API_MOVIE_DETAILS = `${API_DOMAIN}movie/`
    const API_KEY = 'd91a8bff2f8fff82a0c47ec660d5bb9f'
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'


    useEffect(() => {
        setLoading(true)

        fetch(`${API_MOVIE_DETAILS}${params.id}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(data => {
                setMovie(data)
                setLoading(false)
            })
            .catch(err => {
                setError(err)
                setLoading(false)
            })
    }
        , [API_MOVIE_DETAILS, params])

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[80vh] py-8">
            {
                loading ? <Loader /> : (
                   <>
                  
                   <div className='md:grid grid-cols-12 gap-x-6' >
                        <div className='col-span-3'>
                            <div className='bg-primary rounded p-2' >
                                <img
                                    src={IMAGE_URL + movie.poster_path}
                                    alt={movie.title}
                                    className="w-full h-72 object-cover object-center"
                                />
                            </div>
                        </div>
                        <div className='col-span-9 mt-10 md:mt-0'>
                            <Link href='/' className='text-primary text-sm'>Back to Home</Link>

                            <div className='my-5'>
                                <h1 className='text-5xl text-primary font-bold' data-testid= 'movie-title'>
                                    {movie.title}
                                </h1>
                                <p className='text-xs italic mt-3 text-gray-700'>
                                    {movie.tagline}
                                </p>
                            </div>

                            <p className='uppercase text-sm tracking-widest'>Overview</p>
                            <p className='my-3' data-testid='movie-overview'>
                                {movie.overview}
                            </p>

                            <div className='my-5'>
                                <p className='text-sm'data-testid='movie-release-date'><span className='text-primary'>Release date:</span> {movie.release_date}</p>
                                <p className='text-sm'><span className='text-primary'>Status:</span> {movie.status}</p>
                                <p className='text-sm'><span className='text-primary'>Rating:</span> {movie.vote_average}</p>
                                <p className='text-sm'><span className='text-primary'>Popularity:</span> {movie.popularity}</p>
                                <p className='text-sm'><span className='text-primary'>Budget:</span> {movie.budget}</p>
                                <p className='text-sm'><span className='text-primary'>Revenue:</span> {movie.revenue}</p>
                                <p className='text-sm' data-testid='movie-runtime'><span className='text-primary'>Runtime:</span> {movie.runtime}</p>
                                <p className='text-sm'><span className='text-primary'>Original Language:</span> {movie.original_language}</p>


                            </div>

                            <div className="space-x-1 flex flex-wrap pt-3">
                                {
                                    movie.genres && movie.genres.map((genre, i) => (
                                        <span key={i} className="mb-2 uppercase text-[10px] bg-primary text-white p-2 rounded-md">{
                                            genre ? genre.name : ''
                                        }</span>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                   </>
                    
                )
            }
        </div>
    )
}
