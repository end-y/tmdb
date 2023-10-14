import { get_credits, get_movie_by_id, get_videos } from '@/app/api'
import ActorCard from '@/app/Components/ActorCard'
import Image from 'next/image'
import React from 'react'

export default async function actor({params}) {
    let {poster_path,id,original_title,overview, vote_average, video, release_date} = await get_movie_by_id(params.slug)
    let {cast} = await get_credits(params.slug)
    let {results} = await get_videos(params.slug)
    results = results.filter(e => e.site == "YouTube")
    return (
        <section key={id}>
        <div className='flex flex-col text-center m-auto md:text-left md:flex-row space-x-5' >
            <Image unoptimized priority alt={original_title} className='rounded-lg overflow-hidden mb-3 object-cover w-96' style={{minWidth:250}} src={poster_path ? "http://image.tmdb.org/t/p/w500"+poster_path : "https://placehold.co/310x460?text=?"} width={150} height={150} />
            <div>
                 <h1 className='text-5xl mb-5 '>{original_title}</h1>
                 <p className='text-1xl '>{overview}</p>
                 <p className='text-1xl flex justify-center bg-amber-400 w-24 space-x-5 mt-5 rounded text-center text-black p-3'>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </span>
                    {vote_average?.toFixed(1)}
                </p>
                <p className='text-2xl mt-5'>Release Date: {new Date(release_date).toLocaleDateString()}</p>
            </div> 
        </div>
        {results && results.length > 0 && <><h1 className='text-5xl mt-7'>Videos</h1>
        <hr /></>}
        <div className='grid sm:grid-cols-1 md:grid-cols-3 xl:grid-col-3 mt-5 gap-8 sm:px-5'>
            {results && results.length > 0 && results.map(e => {
                return <iframe key={e.id} className='w-full h-96' src={`https://www.youtube.com/embed/${e.key}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            })}
        </div>
        
        {cast && cast.length > 0 && <><h1 className='text-5xl mt-7'>Actors</h1>
        <hr /></>}
        <div className='grid sm:grid-cols-1 md:grid-cols-3 xl:grid-col-10 mt-5 gap-8 sm:px-5'>
            {cast && cast.length > 0 && cast.map(e => {
                return(
                    <ActorCard key={e.id} character={true} e={e} />
                )
            })}
        </div>
        </section>
        
    )
}