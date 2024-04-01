import { Form, Formik, FormikHelpers } from "formik";
import { movieTheaterCreationDTO } from "./movieTheater.model";
import TextField from "../foms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import MapField from "../foms/MapField";
import coordinateDTO from "../utils/coordinate.model";

export default function MovieTheaterForm(props: movieTheaterForm) {

    function transferCoordinates(): coordinateDTO[] | undefined {
        if (props.model.latitude && props.model.longitude) {
            const response: coordinateDTO = { lat: props.model.latitude, lng: props.model.longitude };
            return [response];
        }

        return undefined;
    }

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
                        <div style={{ marginBottom: '1rem' }}>
                            <MapField
                                coordinates={transferCoordinates()}
                                latField="latitude"
                                lngfield="longitude" />
                        </div>
                        <Button className="btn btn-primary mb-3" disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>
                        <Link to='/movietheaters' className="btn btn-secondary mb-3">Cancel</Link>
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
