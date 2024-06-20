import { MapContainer, TileLayer, useMapEvent, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import coordinateDTO from './coordinate.model';
import { useEffect, useState } from "react";

let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]
});

L.Marker.prototype.options.icon = defaultIcon;

export default function Map(props: mapProps) {

    const [coordinates, setCoordinates] = useState<coordinateDTO[]>(props.coordinates);

    return (

        <MapContainer
            center={[35.797814, 51.412443]}
            zoom={16}
            style={{ height: props.haight }}
        >
            <TileLayer attribution="React Movies"
                url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' />

            {props.readOnly ? null : <MapClick setCoordinates={coordinates => {
                setCoordinates([coordinates]);
                props.handleMapClick(coordinates);
            }} />}

            {coordinates.map((coordinate, index) =>
                <Marker key={index}
                    position={[coordinate.lat, coordinate.lng]}>
                    {coordinate.name ?

                        <Popup>{coordinate.name}</Popup>

                        : null}
                </Marker>)}
        </MapContainer>
    );
}

interface mapProps {
    haight: string;
    readOnly: boolean;
    coordinates: coordinateDTO[];
    handleMapClick(coordinates: coordinateDTO): void;
}

Map.defaultProps = {
    haight: '500px',
    handleMapClick: () => { },
    readOnly: false
}

function MapClick(props: mapClickProps) {

    useMapEvent('click', eventArgs => {
        props.setCoordinates({ lat: eventArgs.latlng.lat, lng: eventArgs.latlng.lng });
    })

    return null;
}

interface mapClickProps {
    setCoordinates(coordinates: coordinateDTO): void;
}