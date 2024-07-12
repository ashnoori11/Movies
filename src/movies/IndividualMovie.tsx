import { movieDTO } from "./movies.model";
import css from './IndividualMovie.module.css';
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import axios from "axios";
import { urlMovies } from "../endpoints";
import { useContext, useState } from "react";
import AlertContext from "../utils/AlertContext";
import Authorized from "../auth/Authorized";
import { RoleHelper } from "../helpers/RoleHelper";

export default function IndividualMovie(props: movieDTO) {

    const customAlert = useContext(AlertContext);
    const buildLink = () => `/movie/${props.id}`;
    const deleteMovie = () => {
        axios.delete(`${urlMovies}/${props.id}`)
            .then(() => {
                customAlert();
            })
            .catch(errors => {
                alert(errors.response.data);
            });
    }
    return (
        <div className={css.div}>
            <Link to={buildLink()}>
                <img alt={props.title} src={props.poster} />
            </Link>
            <p>
                <Link to={buildLink()}>{props.title}</Link>
            </p>

            <Authorized

                authorized={<>
                    <div>
                        <Link style={{ marginRight: '1rem', color: 'white' }} className="btn btn-info" to={`/movies/edit/${props.id}`}>Edit</Link>
                        <Button
                            onClick={() => customConfirm(() => deleteMovie())}
                            className="btn btn-danger"
                        >Delete</Button>
                    </div>
                </>}
                role={RoleHelper.getAdminRole()}
            />
        </div>
    );
}