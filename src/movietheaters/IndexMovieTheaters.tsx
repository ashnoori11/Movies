import { Link } from "react-router-dom";
import IndexEntity from "../utils/IndexEntity";
import { movieTheatersDTO } from './movieTheater.model';
import { urlMovieTheaters } from '../endpoints';

export default function IndexMovieTheaters() {

    return (
        <IndexEntity<movieTheatersDTO>
            url={urlMovieTheaters}
            createNewUrl="movietheaters/create"
            createNewLinkText="Create New MovieTheater"
            title="Movie Theaters"
        >

            {(entities, buttons) =>
                <>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entities?.map(entity => <tr key={entity.id}>
                            <td>
                                {buttons(`movietheaters/edit/${entity.id}`, entity.id)}
                            </td>
                            <td>
                                {entity.name}
                            </td>
                        </tr>
                        )}
                    </tbody>

                </>
            }

        </IndexEntity>
    );
}