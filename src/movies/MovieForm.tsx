import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../foms/TextField";
import DateField from '../foms/DateField';
import ImageField from "../foms/ImageField";
import CheckboxField from "../foms/CheckboxField";

export default function MovieForm(props: movieFormProps) {
    return (
        <Formik
            initialValues={props.model}
            onSubmit={props.onSubmit}
            validationSchema={props.validationSchema}
        >
            {(formikProps) => (
                <Form>
                    <TextField displayName="Title" field="title" />
                    <CheckboxField displayName="In Theaters" field="inTheaters" />
                    <TextField displayName="Trailer" field="trailer" />
                    <DateField displayName="Release" field="releaseDate" dateStringFormat={props.dateStringFormat} />
                    <ImageField displayName="Poster" field="poster" imageUrl={props.model.posterURL} />

                    <Button disabled={formikProps.isSubmitting} type="submit" className="btn btn-primary mb-3">
                        Save Changes
                    </Button>
                    <Link className="btn btn-secondary mb-3" to='/genres'>Cancel</Link>
                </Form>
            )}
        </Formik>
    );
}

interface movieFormProps {
    model: movieCreationDTO;
    onSubmit(values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>): void;
    validationSchema: any;
    dateStringFormat: string;
}

MovieForm.defaultProps = {
    dateStringFormat: 'zh-Hans-CN'
}