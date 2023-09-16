import React from 'react'
import Link from 'next/link'

export default function MovieCard({ movie, genres }) {
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/'

    const getGenre = (id) => {
        const genre = genres.find(genre => genre.id === id)
        return genre?.name || ''
    }


    return (
        <Link href={`/movies/${movie.id}`} className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer">
            <img
                src={IMAGE_URL + movie.poster_path}
                alt={movie.title}
                className="w-full h-72 object-cover object-center"
            />

            <div className="p-4 space-y-2">
                <p className="uppercase tracking-wide text-xs text-gray-400">
                    2020 . Action . 2h 4m
                </p>

                <p className="text-lg text-gray-900">{movie.title}</p>
                <p className="text-gray-700 text-xs">
                    {movie.overview}
                </p>

                <div className="space-x-1 flex flex-wrap pt-3">
                    {
                        movie.genre_ids.map((genre, i) => (
                            <span key={i} className="mb-2 uppercase text-[10px] bg-primary text-white p-2 rounded-md">{
                                genre && getGenre(genre)
                            }</span>
                        ))
                    }
                </div>
            </div>
        </Link>
    )
}
