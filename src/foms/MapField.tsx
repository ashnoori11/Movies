import { useFormikContext } from 'formik';
import Map from '../utils/Map';
import coordinateDTO from '../utils/coordinate.model';

export default function MapField(props: mapFieldProps) {

    const { values } = useFormikContext<any>();
    function handleMapClick(coordinates: coordinateDTO): void {
        values[props.latField] = coordinates.lat;
        values[props.lngfield] = coordinates.lng;
    }

    return (
        <Map
            coordinates={props.coordinates}
            handleMapClick={handleMapClick}
        />
    );
}

interface mapFieldProps {
    coordinates: coordinateDTO[];
    latField: string;
    lngfield: string;
}

MapField.defaultProps = {
    coordinates: []
}