import Button from "../utils/Button";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import TextField from "../foms/TextField";
import { Link, useHistory } from "react-router-dom";
import { genreCreationDTO } from "./genres.model";

export default function GenreForm(props: genreFormProps) {
    return (

        <Formik initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={props.validationSchema}
        >

            {(formikProps) => (
                <Form>
                    <TextField field="name" displayName="Name" placeholder="enter name" />

                    <Button type="submit" className="btn btn-primary" disabled={formikProps.isSubmitting}>
                        Save
                    </Button>
                    <Link className="btn btn-secondary" to='/genres'>
                        Cancel
                    </Link>
                </Form>
            )}

        </Formik>

    );
}

interface genreFormProps {
    model: genreCreationDTO;
    onSubmit(values: genreCreationDTO, action: FormikHelpers<genreCreationDTO>): void;
    validationSchema: any;
}

