import IndexEntity from "../utils/IndexEntity";
import { urlActors } from "../endpoints";
import { actorDTO } from "./actors.model";

export default function IndexActors() {
    return (
        <IndexEntity<actorDTO>
            url={urlActors}
            createNewUrl="actors/create"
            title="Actors"
            createNewLinkText="Create Actor"
        >
            {(actors, buttons) => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {actors?.map(actor => <tr key={actor.id}>
                        <td>
                            {buttons(`actors/edit/${actor.id}`, actor.id)}
                        </td>
                        <td>
                            {actor.name}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    );
}