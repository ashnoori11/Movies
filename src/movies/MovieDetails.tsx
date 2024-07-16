import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlMovies, urlRatings } from "../endpoints";
import { movieDTO } from "./movies.model";
import DisplayErrors from "../utils/DisplayErrors";
import Loading from "../utils/Loading";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import coordinateDTO from '../utils/coordinate.model';
import Map from '../utils/Map';
import Ratings from "../utils/Ratings";
import Swal from "sweetalert2";

export default function MovieDetails(pros: movieDetailsProps) {

    const { id }: any = useParams();
    const [errors, setErrors] = useState<string[]>();
    const [movie, setMovieDto] = useState<movieDTO>();

    useEffect(() => {

        try {
            axios.get(`${urlMovies}/${id}`)
                .then((response: AxiosResponse<movieDTO>) => {

                    //@ts-ignore
                    let theData = response.data[0];

                    theData.releaseDate = new Date(theData.releaseDate);
                    setMovieDto(theData);
                })
                .catch(errors => {
                    if (errors.response.data) {
                        setErrors(errors.response.data);
                    }
                })
        }
        catch (error) {
            console.log(error);
        }

    }, [id])

    const generateEmbeddedVideoYoutubeUrl = (trailer: string): string => {

        if (!trailer) {
            return '';
        }

        let videoId = trailer.split('v=')[1];
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }

        return `https://www.youtube.com/embed/${videoId}`;
    }

    const generateEmbeddedVideoAparatUrl = (trailer: string): string => {
        if (!trailer) {
            return '';
        }

        let videoId = '';
        let splitedUrl = trailer.split('/v/');
        videoId = splitedUrl[splitedUrl.length - 1]

        return `https://www.aparat.com/video/video/embed/videohash/${videoId}/vt/frame`;
    }

    const transformCoordinates = (): coordinateDTO[] => {

        if (movie?.movieTheaters) {
            const coordinates = movie.movieTheaters.map(mt => {
                return { lat: mt.latitude, lng: mt.longitude, name: mt.name } as coordinateDTO
            })

            return coordinates;
        }

        return [];
    }

    const handleRate = (rate: number) => {
        try {
            axios.post(`${urlRatings}`, { rating: rate, movieId: id })
                .then(response => {

                    console.log(response);
                    if (response.status) {
                        Swal.fire({ icon: 'success', title: 'Rating received' });
                    }
                    else {
                        Swal.fire({ icon: 'error', title: 'an error occured pleas try again' });
                    }

                })
                .catch(errors => {
                    console.log(errors.data);
                    Swal.fire({ icon: 'error', title: 'There is a problem and it is not possible to rate at the moment' });
                });
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        errors ? <DisplayErrors errors={errors} /> :
            movie ?
                <div>
                    <h2>{movie.title} ({movie.releaseDate.getFullYear()})</h2>
                    {movie.genres?.map(genre =>
                        <Link key={genre.id} style={{ marginRight: '5px', marginTop: '5px' }} className="btn btn-primary btn-sm rounded-pill"
                            to={`/movie/filter?genreId=${genre.id}`} >{genre.name}</Link>

                    )} | {movie.releaseDate.toDateString()}
                    | Your vote: <Ratings maximumValue={5} selectedValue={0} onChange={handleRate} />
                    | Average Vote: {movie.averageVote}

                    <div style={{ display: 'flex', marginTop: '3rem' }}>
                        <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                            <img src={movie.poster} style={{ width: '225px', height: '315px' }}
                                alt="poster" />
                        </span>

                        {movie.trailer ? <div>
                            <iframe
                                title="youtube-trailer"
                                width="560"
                                height='315'
                                src={generateEmbeddedVideoAparatUrl(movie.trailer)}
                                frameBorder={0}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            >

                            </iframe>
                        </div> : null}
                    </div>

                    {movie.summery ?
                        <div style={{ marginTop: '3rem' }}>
                            <hr />
                            <h3>Summery</h3>
                            <div>
                                <ReactMarkdown>{movie.summery}</ReactMarkdown>
                            </div>
                        </div> : null}

                    {movie.actors && movie.actors.length > 0 ?
                        <div style={{ marginTop: '3rem' }}>
                            <hr />
                            <h3>Actors</h3>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {movie.actors?.map(actor =>
                                    <div key={actor.id} style={{ marginBottom: '2px' }}>
                                        <img alt={actor.character} src={actor.picture} style={{ width: '50px', verticalAlign: 'middle' }} />
                                        <span style={{
                                            display: 'inline-block',
                                            width: '200px',
                                            marginLeft: '1rem'
                                        }}>{actor.name}</span>

                                        <span style={{
                                            display: 'inline-block',
                                            width: '45px'
                                        }}>...</span>

                                        <span>
                                            {actor.character}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div> : null}


                    {movie.movieTheaters && movie.movieTheaters.length > 0 ?
                        <div style={{ marginTop: '3rem' }}>
                            <hr />
                            <h2>Showing on</h2>
                            <Map coordinates={transformCoordinates()} readOnly={true} />
                        </div>
                        : null}

                </div> : <Loading />
    );
}


interface movieDetailsProps {

}


MovieDetails.defaultProps = {

}

function UseParams(): any {
    throw new Error("Function not implemented.");
}
