import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { genreDTO } from "./genres.model";


export default function IndexGenres() {

    // useEffect(()=>{
    //     axios.get('')
    //     .then((response:AxiosResponse<genreDTO>)=>{
    //         console.log(response.data);
    //     })
    // })

    useEffect(() => {
        axios.get('/WeatherForecast')
            .then((response: AxiosResponse<any>) => {
                console.log(response.data);
            })
    })

    return (
        <>
            <h3>Genres</h3>
            <Link className="btn btn-primary" to="/genres/create">Create Genre</Link>
        </>
    );
}