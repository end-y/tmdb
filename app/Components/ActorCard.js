import Image from 'next/image'
import Link from 'next/link'
const ActorCard = ({e,character=false}) => {
    return(
        <Link key={e.id} href={"/actor/"+e.id} className='border-2 flex flex-col justify-items-stretch items-stretch border-sky-500 overflow-hidden transition-all rounded hover:rounded-2xl'>
            <Image unoptimized priority alt={e.original_name} className='rounded-lg overflow-hidden mb-3 object-cover w-full' src={e.profile_path ? "http://image.tmdb.org/t/p/w500"+e.profile_path : "https://placehold.co/310x460?text=?"} width={150} height={150} />
            <p className='text-center pb-3'>{e.name}</p>
            {character && 
                <>
                    <hr className='mb-3' />
                    <p className='text-center pb-3'>Character: {e.character}</p>
                </>
                
            }
        </Link>
    )
}
export default ActorCard