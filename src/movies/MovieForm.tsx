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
import { movieTheatersDTO } from '../movietheaters/movieTheater.model';
import TypeAheadActors from "../foms/TypeAheadActors";
import { actorMovieDTO } from "../actors/actors.model";
import MarkdownField from "../foms/MarkdownField";

export default function MovieForm(props: movieFormProps) {

    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedGenres, setNonSelectedGenres] = useState(mapToModel(props.nonSelectedGenres));

    const [selectedMovieTheaters, setSelectedMovieTheaters] = useState(mapToModel(props.selectedGenres));
    const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState(mapToModel(props.nonSelectedMovieTheaters));

    const [selectedActors, setSelectedActors] = useState(props.selectedActors);

    function mapToModel(items: { id: number, name: string }[]): multipleSelectorModel[] {

        return items.map(item => {
            return { key: item.id, value: item.name }
        })
    }

    return (
        <Formik
            initialValues={props.model}
            onSubmit={(values, actions) => {
                values.genreIds = selectedGenres.map(item => item.key);
                values.movieTheaterIds = selectedMovieTheaters.map(item => item.key);
                values.actors = selectedActors;
                props.onSubmit(values, actions);
            }}
            validationSchema={props.validationSchema}
        >
            {(formikProps) => (
                <Form>
                    <TextField displayName="Title" field="title" />
                    <CheckboxField displayName="In Theaters" field="inTheaters" />
                    <TextField displayName="Trailer" field="trailer" />
                    <DateField displayName="Release" field="releaseDate" dateStringFormat={props.dateStringFormat} />
                    <ImageField displayName="Poster" field="poster" imageUrl={props.model.posterURL} />

                    <MarkdownField

                        displayName="Summery"
                        field="summery"
                    />

                    <MultipleSelector displayName="Genres"
                        nonSelected={nonSelectedGenres}
                        selected={selectedGenres}
                        onChange={(selected, nonSelected) => {
                            setSelectedGenres(selected);
                            setNonSelectedGenres(nonSelected);
                        }} />

                    <MultipleSelector displayName="Theaters"
                        nonSelected={nonSelectedMovieTheaters}
                        selected={selectedMovieTheaters}
                        onChange={(selected, nonSelected) => {
                            setSelectedMovieTheaters(selected);
                            setNonSelectedMovieTheaters(nonSelected);
                        }} />

                    <TypeAheadActors actors={selectedActors} displayName="Actors"
                        onAdd={actors => {
                            setSelectedActors(actors);
                        }}
                        listUI={(actor: actorMovieDTO) =>
                            <>
                                {actor.name} / <input placeholder="Character" type="text"
                                    value={actor.character}
                                    onChange={e => {
                                        const index = selectedActors.findIndex(x => x.id === actor.id);

                                        const actors = [...selectedActors];
                                        actors[index].character = e.currentTarget.value;
                                        setSelectedActors(actors);
                                    }}

                                />
                            </>
                        }
                        onRemove={actor => {
                            const actors = selectedActors.filter(x => x !== actor);
                            setSelectedActors(actors);
                        }}
                    />

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
    nonSelectedMovieTheaters: movieTheatersDTO[];
    selectedMovieTheaters: movieTheatersDTO[];
    selectedActors: actorMovieDTO[];
}

MovieForm.defaultProps = {
    dateStringFormat: 'zh-Hans-CN'
}