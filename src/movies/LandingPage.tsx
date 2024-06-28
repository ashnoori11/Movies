import React, { useState, useEffect } from "react";
import MoviesList from "./MoviesList";
import { landingPageDTO } from './movies.model';
import axios, { AxiosResponse } from "axios";
import { urlMovies } from "../endpoints";


export default function LandingPage() {

    const [movies, setMovies] = useState<landingPageDTO>({});
    const [errors, setErrors] = useState<string[]>();


    useEffect(() => {

        try {
            axios.get(urlMovies)
                .then((response: AxiosResponse<landingPageDTO>) => {

                    //@ts-ignore
                    let theData = response.data.data[0];
                    setMovies(theData);
                }).catch(errors => {

                    if (errors.response.data) {
                        setErrors(errors.response.data);
                    }
                });
        } catch (e: unknown) {
            console.log(e);
        }

    }, []);

    return (
        <>
            <h3>In Theaters</h3>
            <MoviesList movies={movies.inTheaters} />

            <h3>UpComming Releases</h3>
            <MoviesList movies={movies.upCommingReleases} />
        </>
    );
}