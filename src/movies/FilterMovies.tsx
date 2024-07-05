import { Field, Form, Formik } from "formik";
import { genreDTO } from "../genres/genres.model";
import Button from "../utils/Button";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlGenres, urlMovies } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { movieDTO } from "./movies.model";
import MoviesList from "./MoviesList";
import { useHistory, useLocation } from "react-router-dom";
import Pagination from "../utils/Pagination";

export default function FilterMovies() {

    const initialValues: filterMoviesForm = {
        title: '',
        genreId: 0,
        upComingRelasses: false,
        inTheaters: false,
        page: 1,
        recordsPerPage: 10
    }

    const history = useHistory();
    const [errors, setErrors] = useState();
    const [genres, setGenres] = useState<genreDTO[]>([]);
    const [movies, setMovies] = useState<movieDTO[]>([]);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const query = new URLSearchParams(useLocation().search);

    const searchMovies = (values: filterMoviesForm) => {
        try {
            modifyUrl(values);
            axios.get(`${urlMovies}/Filter`, { params: values })
                .then((response: AxiosResponse<movieDTO[]>) => {

                    const totalAmountOfrecords = response.data.length;
                    console.log(totalAmountOfrecords);
                    console.log(Math.ceil(totalAmountOfrecords / initialValues.recordsPerPage));
                    setTotalAmountOfPages(Math.ceil(totalAmountOfrecords / initialValues.recordsPerPage));
                    setMovies(response.data);

                }).catch(errors => {

                    if (errors.response) {

                        setErrors(errors.response.data);
                    }
                })

        }
        catch (e) {
            console.log(e);
        }
    }

    const modifyUrl = (values: filterMoviesForm) => {
        const queryStrings: string[] = [];

        if (values.title) {
            queryStrings.push(`title=${values.title}`);
        }

        if (values.genreId != 0) {
            queryStrings.push(`genreId=${values.genreId}`);
        }

        if (values.inTheaters) {
            queryStrings.push(`inTheaters=${values.inTheaters}`);
        }

        if (values.upComingRelasses) {
            queryStrings.push(`upComingRelasses=${values.upComingRelasses}`);
        }

        queryStrings.push(`page=${values.page}`);
        history.push(`/movies/filter?${queryStrings.join('&')}`);
    }

    useEffect(() => {
        try {
            axios.get(`${urlGenres}/All`)
                .then((response: AxiosResponse<genreDTO[]>) => {
                    setGenres(response.data);
                })
                .catch(errors => {
                    if (errors.response) {
                        setErrors(errors.response.data);
                    }
                });
        }
        catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {

        if (query.get('title')) {
            initialValues.title = query.get('title')!;
        }

        if (query.get('genreId')) {
            initialValues.genreId = parseInt(query.get('genreId')!, 10);
        }

        if (query.get('inTheaters')) {
            initialValues.inTheaters = true;
        }

        if (query.get('upComingRelasses')) {
            initialValues.upComingRelasses = true;
        }

        if (query.get('page')) {
            initialValues.page = parseInt(query.get('page')!, 10);
        }

        searchMovies(initialValues);
    }, []);



    return (
        <>
            <h3>Filter Movies</h3>
            <DisplayErrors errors={errors} />

            <Formik initialValues={initialValues}
                onSubmit={values => {
                    values.page = 1;
                    searchMovies(values);
                }}
            >

                {(formikProps) => (

                    <>
                        <Form>
                            <div className="row gx-3 align-items-center mb-3">
                                <div className="col-auto">
                                    <input type="text" className="form-control" id="title" placeholder="title of the movie"
                                        {...formikProps.getFieldProps('title')}
                                    />
                                </div>
                                <div className="col-auto">
                                    <select className="form-select"
                                        {...formikProps.getFieldProps('genreId')}
                                    >
                                        <option value="0">--Choose a genre--</option>
                                        {
                                            genres.map(genre =>
                                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-auto">
                                    <div className="form-check">
                                        <Field className="form-check-input" id='upComingRelasses'
                                            name="upComingRelasses" type="checkbox" />
                                        <label className="form-check-label"
                                            htmlFor="upComingRelasses">Upcoming Releases</label>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="form-check">
                                        <Field className="form-check-input" id='inTheaters'
                                            name="inTheaters" type="checkbox" />
                                        <label className="form-check-label"
                                            htmlFor="inTheaters">In Theaters</label>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <Button className="btn btn-primary"
                                        onClick={() => { formikProps.submitForm() }}>Filter</Button>
                                    <Button className="btn btn-danger ms-3"
                                        onClick={() => {
                                            formikProps.setValues(initialValues);
                                            searchMovies(initialValues);

                                        }}>Clear</Button>
                                </div>
                            </div>
                        </Form>

                        <MoviesList movies={movies} />
                        <Pagination
                            totalAmountOfPages={totalAmountOfPages}
                            currentPage={formikProps.values.page}
                            onChange={newPage => {
                                formikProps.values.page = newPage;
                                searchMovies(formikProps.values);
                            }}
                        />
                    </>

                )}

            </Formik>
        </>
    );
}

interface filterMoviesForm {
    title: string;
    genreId: number;
    upComingRelasses: boolean;
    inTheaters: boolean;
    recordsPerPage: number;
    page: number;
}