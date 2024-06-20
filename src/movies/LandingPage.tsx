import React, { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import { landingPageDTO } from './movies.model';


export default function LandingPage() {

    const [movies, setMovies] = useState<landingPageDTO>({});
    useEffect(() => {

    },[]);

    return (
        <>
            <h3>In Theaters</h3>
            <MoviesList movies={movies.inTheaters} />

            <h3>UpComming Releases</h3>
            <MoviesList movies={movies.upCommingReleases} />
        </>
    );
}