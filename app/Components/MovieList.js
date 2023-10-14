import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MediaCard from './MediaCard'
const MovieList = ({results}) => {
    return (
        <Suspense key={"suspense"} fallback={<p>Loading feed...</p>}>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:px-5'>
            {results && results.map(e => {
            return(
                <MediaCard key={e.id} e={e} />
            )
            })}
            </div>
        </Suspense>
    )
}
export default MovieList