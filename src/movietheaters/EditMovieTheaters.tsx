import MovieTheaterForm from "./MovieTheaterForm";
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import EditEntity from "../utils/EditEntity";
import { movieTheaterCreationDTO, movieTheatersDTO } from './movieTheater.model';
import { urlMovieTheaters } from "../endpoints";

export default function EditMovieTheaters() {

    const { id }: any = useParams();
    return (
        <EditEntity<movieTheaterCreationDTO, movieTheatersDTO>
            url={urlMovieTheaters}
            returnUrl="/movietheaters"
            entityName="Movie Theater"
        >
            {(entity, edit) => (
                <MovieTheaterForm
                    model={entity}
                    onSubmit={edit}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('This field is required')
                            .firstLetterUppercase()
                    })}
                />
            )}
        </EditEntity>
    );
}