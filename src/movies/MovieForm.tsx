import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../foms/TextField";
import DateField from '../foms/DateField';
import ImageField from "../foms/ImageField";
import CheckboxField from "../foms/CheckboxField";
import MultipleSelector, { multipleSelectorModel } from "../foms/MultipleSelector";
import { useState } from "react";
import { genreDTO } from '../genres/genres.model';

export default function MovieForm(props: movieFormProps) {

    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedGenres, setNonSelectedGenres] = useState(mapToModel(props.nonSelectedGenres));
    function mapToModel(items: { id: number, name: string }[]): multipleSelectorModel[] {

        return items.map(item => {
            return { key: item.id, value: item.name }
        })
    }

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

                    <MultipleSelector displayName="Genres"
                        nonSelected={nonSelectedGenres}
                        selected={selectedGenres}
                        onChange={(selected, nonSelected) => {
                            setSelectedGenres(selected);
                            setNonSelectedGenres(nonSelected);
                        }} />

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
    selectedGenres: genreDTO[];
    nonSelectedGenres: genreDTO[];
}

MovieForm.defaultProps = {
    dateStringFormat: 'zh-Hans-CN'
}