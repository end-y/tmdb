import Image from 'next/image'
import Link from 'next/link'
const MediaCard = ({e, type="movie"}) => {
    const slug = type == "movie" ? "/movie/" : "/tv/"
    return(
    <div className='border-2 flex flex-col justify-items-stretch items-stretch border-sky-500 overflow-hidden transition-all rounded hover:rounded-2xl' key={e.id}>
        <Image unoptimized priority alt={e.original_title} className='mb-3 object-cover w-full' src={e.backdrop_path ? "http://image.tmdb.org/t/p/w500"+e.backdrop_path : "https://placehold.co/500x280?text=?"} width={150} height={150} />
        <h1 className=' px-3 text-3xl mb-3 bg-clip-text text-transparent bg-gradient-to-r font-bold from-sky-200 to-sky-600'>{type == "tv" ? e.original_name : e.original_title}</h1>
        <p className='px-3 flex-1 pb-2 '>{e.overview.substring(0,150)}...</p>
        <Link className='self-end' href={slug+e.id}>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-blue-800">
                See Detail
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </Link>
      </div>
    )
}
export default MediaCard