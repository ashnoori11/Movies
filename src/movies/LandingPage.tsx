import React, { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import { landingPageDTO } from './movies.model';


export default function LandingPage() {

    const [movies, setMovies] = useState<landingPageDTO>({});
    useEffect(() => {
        const timerId = setTimeout(() => {

            setMovies({
                inTheaters: [
                    {
                        id: 1,
                        title: 'dune',
                        poster: 'https://sm.ign.com/ign_nordic/gallery/d/dune-part-/dune-part-2-character-posters_mbt6.jpg'
                    },
                    {
                        id: 2,
                        title: 'dune',
                        poster: 'https://sm.ign.com/ign_nordic/gallery/d/dune-part-/dune-part-2-character-posters_mbt6.jpg'
                    },
                    {
                        id: 3,
                        title: 'dune',
                        poster: 'https://sm.ign.com/ign_nordic/gallery/d/dune-part-/dune-part-2-character-posters_mbt6.jpg'
                    },
                    {
                        id: 4,
                        title: 'dune',
                        poster: 'https://sm.ign.com/ign_nordic/gallery/d/dune-part-/dune-part-2-character-posters_mbt6.jpg'
                    }
                ],
                upCommingReleases: [
                    {
                        id: 5,
                        title: 'dune',
                        poster: 'https://sm.ign.com/ign_nordic/gallery/d/dune-part-/dune-part-2-character-posters_mbt6.jpg'
                    },
                    {
                        id: 6,
                        title: 'dune',
                        poster: 'https://sm.ign.com/ign_nordic/gallery/d/dune-part-/dune-part-2-character-posters_mbt6.jpg'
                    },
                    {
                        id: 7,
                        title: 'dune',
                        poster: 'https://sm.ign.com/ign_nordic/gallery/d/dune-part-/dune-part-2-character-posters_mbt6.jpg'
                    },
                    {
                        id: 8,
                        title: 'dune',
                        poster: 'https://sm.ign.com/ign_nordic/gallery/d/dune-part-/dune-part-2-character-posters_mbt6.jpg'
                    }
                ]

            });

        }, 2000);

        return () => clearTimeout(timerId);
    });

    return (
        <>
            <h3>In Theaters</h3>
            <MoviesList movies={movies.inTheaters} />

            <h3>UpComming Releases</h3>
            <MoviesList movies={movies.upCommingReleases} />
        </>
    );
}