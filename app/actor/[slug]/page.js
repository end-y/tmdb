import { get_actor_by_id, get_films_by_actor, get_movie_by_id } from '@/app/api'
import MediaCard from '@/app/Components/MediaCard'
import Image from 'next/image'
import React from 'react'

export default async function actor({params}) {
    let {name,profile_path,id, original_name, birthday, place_of_birth} = await get_actor_by_id(params.slug)
    let {cast} = await get_films_by_actor(params.slug)
    return (
        <section key={id}>
            <div className='flex space-x-5' >
                <Image unoptimized priority alt={original_name} className='rounded-lg overflow-hidden mb-3 object-cover w-64' src={profile_path ? "http://image.tmdb.org/t/p/w500"+profile_path : "https://placehold.co/310x460?text=?"} width={150} height={150} />
                <div className='bg-white rounded p-3 w-full space-y-5 opacity-80'>
                    <h1 className='text-3xl text-black'>Full Name: {name}</h1>
                    <p className='text-3xl text-black'>Birthday: {new Date(birthday).toLocaleDateString()}</p>
                    <p className='text-3xl text-black'>Place of Birth: {place_of_birth}</p>
                </div>
            </div>
            {cast && cast.length > 0 && <><h1 className='text-5xl mt-7'>Movies</h1>
            <hr /></>}
            <div className='grid sm:grid-cols-1 md:grid-cols-3 xl:grid-col-10 mt-5 gap-8 sm:px-5'>
                {cast && cast.length > 0 && cast.map(e => {
                    return(
                        <MediaCard key={e.id} e={e} />
                    )
                })}
            </div>
        </section>
        
    )
}