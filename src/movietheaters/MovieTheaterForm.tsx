import { Form, Formik, FormikHelpers } from "formik";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import TextField from "../foms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";

export default function MovieTheaterForm(props: movieTheaterForm) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={props.validationSchema}
        >
            {
                (formikProps) => (
                    <Form>
                        <TextField displayName="Name" field="name" />
                        <Button className="btn btn-primary" disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                        <Link to='/movietheaters' className="btn btn-secondary">Cancel</Link>
                    </Form>
                )
            }
        </Formik>
    );
}

interface movieTheaterForm {
    model: movieTheaterCreationDTO;
    onSubmit(values: movieTheaterCreationDTO, actions: FormikHelpers<movieTheaterCreationDTO>): void;
    validationSchema: any;
}
