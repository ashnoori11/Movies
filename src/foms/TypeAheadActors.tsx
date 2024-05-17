import { Typeahead } from 'react-bootstrap-typeahead';
import { actorMovieDTO } from '../actors/actors.model';
import { ReactElement, useState } from 'react';


export default function TypeAheadActors(props: typeAheadActorsProps) {

    const actors: actorMovieDTO[] = [
        { id: 1, name: 'florence pugh', charcter: 'Jean Tatlock', picture: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.12thblog.com%2Fwp-content%2Fuploads%2F2019%2F01%2FFlorence-Pugh-sexy-cleavage.jpg&f=1&nofb=1&ipt=631cb79b30b947879112e0eed0cec8081844534792a050f5f6e16bd0601a9d9e&ipo=images' },
        { id: 2, name: 'cillian murphy', charcter: 'oppenheimer', picture: 'https://duckduckgo.com/i/286652b1ba6f468f.jpg' },
        { id: 3, name: 'Eiza González', charcter: 'Auggie Salazar', picture: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Feiza-gonzalez-variety-latino-portraits-2018_a2ZuZmqUmZqaraWkpJRoZmlurWZsa2s.jpg&f=1&nofb=1&ipt=2103f9c40ad8adf9670d2827548a73885339afe8850846bdd4947b69d0324cea&ipo=images' }
    ];

    const selected: actorMovieDTO[] = [];
    const [draggedElemnt, setDraggedElemnt] = useState<actorMovieDTO | undefined>(undefined);
    function handleDragStart(actor: actorMovieDTO) {
        setDraggedElemnt(actor);
    }

    function handleDragOver(actor: actorMovieDTO) {
        if (!draggedElemnt) {
            return;
        }

        if (actor.id !== draggedElemnt?.id) {
            const draggedElementIndex = props.actors.findIndex(x => x.id === draggedElemnt.id);
            const actorIndex = props.actors.findIndex(x => x.id === actor.id);

            const actors = [...props.actors];
            actors[actorIndex] = draggedElemnt;
            actors[draggedElementIndex] = actor;
            props.onAdd(actors);
        }
    }

    return (
        <div className="mt-3 mb-3">
            <label>{props.displayName}</label>
            <Typeahead
                id='typeahead'
                onChange={actors => {
                    const fixedActors: actorMovieDTO[] = actors as actorMovieDTO[];

                    if (fixedActors.length > 0) {
                        if (props.actors.findIndex(x => x.id === fixedActors[0].id) === -1) {
                            props.onAdd([...props.actors, fixedActors[0]]);
                        }
                    }
                    console.log(actors);
                }}
                options={actors}
                // @ts-ignore
                labelKey={actor => actor.name}
                filterBy={['name']}
                placeholder='Write the name of the actor...'
                minLength={1}
                flip={true}
                selected={selected}
                renderMenuItemChildren={actor => (
                    <>
                        // @ts-ignore
                        <img alt="actor"

                            // @ts-ignore
                            src={actor.picture}

                            style={{
                                height: '64px',
                                marginRight: '10px',
                                width: '64px'
                            }}
                            className="rounded"
                        />
                        <span>
                            {
                                // @ts-ignore
                                actor.name
                            }
                        </span>
                    </>
                )}
            />

            <ul className="list-group mt-3">
                {props.actors.map(actor => <li
                    key={actor.id}
                    draggable={true}
                    onDragStart={() => handleDragStart(actor)}
                    onDragOver={() => handleDragOver(actor)}

                    className="list-group-item list-group-item-action"
                >
                    {props.listUI(actor)}
                    <span className="badge badge-primary badge-pill pointer text-dark"
                        style={{ marginLeft: '0.5rem' }}
                        onClick={() => props.onRemove(actor)}
                    >X</span>
                </li>)}
            </ul>
        </div>
    );
}

interface typeAheadActorsProps {
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors: actorMovieDTO[]): void;
    onRemove(actor: actorMovieDTO): void;
    listUI(actor: actorMovieDTO): ReactElement;
}

TypeAheadActors.defaultProps = {

}