import { get_all_fav_movies, get_all_searchs } from './api'
import LoadButton from './Components/LoadMore'
import MovieList from './Components/MovieList'
import SearchForm from './Components/SearchForm'

import MediaCard from './Components/MediaCard'
import ActorCard from './Components/ActorCard'
export default async function Home({searchParams}) {
  let {results} = !searchParams.hasOwnProperty("q") ? (await get_all_fav_movies(searchParams.page)) : (await get_all_searchs(searchParams.q))
  let people = false;
  let movie = false;
  let tv_shows = false;
  if(searchParams.hasOwnProperty("q")){
    people = results.filter(e => e.media_type == "person")
    movie = results.filter(e => e.media_type == "movie")
    tv_shows = results.filter(e => e.media_type == "tv")
  }

  return (
    <>
      <SearchForm value={searchParams.q} />
      {
          results && results.length == 0 &&
          <div className='text-center'>No found anything...</div>
      }
      {!searchParams.hasOwnProperty("q") ? 
        <MovieList results={results} />
      :
        <>{
          <div>
            {people && people.length > 0 && <><h1 className='text-5xl'>Actors</h1>
            <hr /></>}
            <div key={"people"} className='grid sm:grid-cols-3 md:grid-cols-5 xl:grid-col-10 mt-5 gap-8 sm:px-5'>
              { people && 
                people.length > 0 &&
                people.map(e => {
                  return(
                    <ActorCard key={e.id} e={e} />
                  )
                })
              }
            </div>
          </div>
          
          }

          {
          <div className='mt-8'>
          {movie && movie.length > 0 && <><h1 className='text-5xl'>Movies</h1>
          <hr /></>}
          <div key={"movie"} className='grid sm:grid-cols-2 md:grid-cols-3 mt-3 gap-8 sm:px-5'>
            { movie && 
              movie.length > 0 &&
              movie.map(e => {
                return(
                  <MediaCard key={e.id} e={e} />
                )
              })
            }
          </div>
        </div>
          }
          {
          <div className='mt-8'>
            {tv_shows && tv_shows.length > 0 && <><h1 className='text-5xl'>TV Shows</h1>
            <hr /></>}
            <div key={"tv_shows"} className='grid sm:grid-cols-2 md:grid-cols-3 mt-3 gap-8 sm:px-5'>
              { tv_shows && 
                tv_shows.length > 0 &&
                tv_shows.map(e => {
                  return(
                   <MediaCard type='tv' key={e.id} e={e} />
                  )
                })
              }
            </div>
          </div>
          }
          </>
      }
      
     {!searchParams.hasOwnProperty("q") &&
        <div className='flex justify-between mt-5 w-full'>
          <LoadButton value="dec" page={searchParams.page || searchParams.page == 1 ? 1 : (+searchParams.page)-1 || 1} />
          <LoadButton value="inc" page={searchParams.page ? (+searchParams.page)+1 : 2} />
        </div>
     }
  </>
  )
}
