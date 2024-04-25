import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { genreDTO } from "./genres.model";
import { urlGenres } from "../endpoints";
import GenericList from "../utils/GenericList";
import Button from "../utils/Button";
import Pagination from "../utils/Pagination";


export default function IndexGenres() {

    // useEffect(()=>{
    //     axios.get('')
    //     .then((response:AxiosResponse<genreDTO>)=>{
    //         console.log(response.data);
    //     })
    // })

    const [genres, setGenres] = useState<genreDTO[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(1);
    const [page, setPage] = useState(1);

    useEffect(() => {
        axios.get(urlGenres, {
            params: { PageNumber: page, PageSize: recordsPerPage }
        })
            .then((response: AxiosResponse<any>) => {

                // const totalAmountOfrecords = parseInt(response.headers['totalAmountOfRecords']);
                const totalAmountOfrecords = response.data.totalCount;
                setTotalAmountOfPages(Math.ceil(totalAmountOfrecords / recordsPerPage));

                setGenres(response.data.data);
                console.log(response.data.data);
            })
    }, [page,recordsPerPage])

    return (
        <>
            <h3>Genres</h3>
            <Link className="btn btn-primary" to="/genres/create">Create Genre</Link>

            <Pagination
                currentPage={page}
                totalAmountOfPages={totalAmountOfPages}
                onChange={newPage => setPage(newPage)} />

            <GenericList list={genres} >
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres?.map(genre =>
                            <tr key={genre.id}>
                                <td>
                                    <Link style={{ marginRight: '5px' }} className="btn btn-success" to={`/genres/${genre.id}`}>Edit</Link>
                                    <Button className="btn btn-danger">
                                        Delete
                                    </Button>
                                </td>
                                <td>
                                    {genre.name}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </GenericList>
        </>
    );
}