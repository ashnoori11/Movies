import axios, { AxiosResponse } from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import customConfirm from "./customConfirm";
import GenericList from "./GenericList";
import Pagination from "./Pagination";
import RecordsPerPageSelect from "./RecordsPerPageSelect";


export default function IndexEntity<T>(props: indexEntityProps<T>) {

    const [data, setData] = useState<T[]>();
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
    const [recordsPerPage, setRecordsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    const loadData = (): void => {
        try {
            axios.get(props.url, {
                params: { PageNumber: page, PageSize: recordsPerPage }
            })
                .then((response: AxiosResponse<any>) => {

                    const totalAmountOfrecords = response.data.totalCount;
                    setTotalAmountOfPages(Math.ceil(totalAmountOfrecords / recordsPerPage));
                    setData(response.data.data);
                })
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        loadData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, recordsPerPage])

    const deleteData = async (id: number) => {
        try {
            await axios.delete(`${props.url}/${id}`);
            loadData();

        } catch (error: any) {

            if (error && error.response) {
                console.error(error.response.data);
            }
        }
    }

    const buttons = (editUrl: string, id: number) => <>
        <Link style={{ marginRight: '5px' }} className='btn btn-success' to={`${editUrl}`}>Edit</Link>
        <Button
            onClick={() => {
                customConfirm(() => deleteData(id));
            }}
            className='btn btn-danger'>
            Delete
        </Button>
    </>;

    return (

        <>
            <h3>{props.title}</h3>
            <Link className={props.createNewLinkClasses} to={props.createNewUrl}>{props.createNewLinkText}</Link>

            <RecordsPerPageSelect onChange={amountOfRecord => {
                setRecordsPerPage(amountOfRecord);
                setPage(1);
            }} />

            <Pagination
                currentPage={page}
                totalAmountOfPages={totalAmountOfPages}
                onChange={newPage => setPage(newPage)} />

            <GenericList list={data} >
                <table className="table table-striped">
                    {props.children(data!, buttons)}
                </table>
            </GenericList >
        </>

    );
}

interface indexEntityProps<T> {
    url: string;
    title: string;
    createNewUrl: string;
    createNewLinkText: string;
    createNewLinkClasses: string;
    children(data: T[], buttons: (editUrl: string, id: number,) => ReactElement): ReactElement;
}

IndexEntity.defaultProps = {
    createNewLinkClasses: "btn btn-primary",
}