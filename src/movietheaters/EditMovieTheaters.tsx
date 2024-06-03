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

            {(entity, edit) =>

                <MovieTheaterForm

                    model={entity}
                    onSubmit={async values => await edit(values)}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .required('this is field is required')
                            .firstLetterUppercase()
                    })}
                >

                </MovieTheaterForm>

            }

        </EditEntity>
    );
}