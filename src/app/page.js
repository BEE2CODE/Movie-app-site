"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Loader from '@/components/Loader'
import MovieCard from '@/components/MovieCard'
import { useSearchParams } from 'next/navigation'


export default function Page() {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const API_KEY = 'd91a8bff2f8fff82a0c47ec660d5bb9f'
  const API_DOMAIN = 'https://api.themoviedb.org/3/'

  const API_TOP_RATED = `${API_DOMAIN}movie/top_rated?api_key=${API_KEY}`
  const API_GENRE = `${API_DOMAIN}genre/movie/list?api_key=${API_KEY}`
  const API_SEARCH = `${API_DOMAIN}search/movie?api_key=${API_KEY}`



  useEffect(() => {
    setLoading(true)
    const search = searchParams.get('search') || false

    if (search) {
      fetch(`${API_SEARCH}&query=${search}`)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results)
          setLoading(false)
        })
        .catch(err => {
          setError(err)
          setLoading(false)
        })
    } else {
      fetch(API_TOP_RATED)
        .then(res => res.json())
        .then(data => {
          setMovies(data.results)
          setLoading(false)
        })
        .catch(err => {
          setError(err)
          setLoading(false)
        })
    }

    fetch(API_GENRE)
      .then(res => res.json())
      .then(data => {
        setGenres(data.genres)
      })
      .catch(err => {
        setError(err)
      })

  }
    , [API_TOP_RATED, API_GENRE, searchParams, API_SEARCH])

  return (
    <>
       <div className='bg-cover' data-testid='movie-poster'>
        <img src='https://shorturl.at/yKS26' />
      </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[20em] py-8">
      {
        loading ? <Loader /> : (
          <div data-testid='movie-card'>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {
                movies.map((movie, i) => (
                  <MovieCard key={i} movie={movie} genres={genres} />
                ))
              }
            </div>
            {
              movies.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-2xl text-gray-700 mb-5">No movies found</p>
                  <Link href="/" className="text-primary">Clear Search</Link>
                </div>
              )
            }
          </div>
        )
      }
    </div>
    </>
  )
}