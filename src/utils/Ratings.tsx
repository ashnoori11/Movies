import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import './RatingsStyles.css';
import AuthenticationContext from "../auth/AuthenticationContext";
import Swal from "sweetalert2";

export default function Ratings(props: ratingProps) {

    const [maximumValueArr, setmaximumValueArr] = useState<number[]>([]);
    const [selectedValue, setSelectedValue] = useState<number>(props.selectedValue);
    const { claims } = useContext(AuthenticationContext);

    useEffect(() => {

        setmaximumValueArr(Array(props.maximumValue).fill(0));

    }, [props.maximumValue]);

    const handleMouseOver = (rate: number) => {
        setSelectedValue(rate);
    }

    const handleClick = (rate: number) => {
        const userIsLoggedIn = claims.length > 0;
        if (!userIsLoggedIn) {

            Swal.fire({ title: 'error', text: 'You need to login', icon: 'error' });
            return;
        }

        setSelectedValue(rate);
        props.onChange(rate);
    }

    return (
        <>
            {maximumValueArr.map((_, index) =>

                <FontAwesomeIcon

                    onMouseOver={() => handleMouseOver(index + 1)}
                    onClick={() => handleClick(index + 1)}
                    icon="star"
                    key={index}
                    className={`fa-lg pointer ${selectedValue >= index + 1 ? 'checked' : null}`} />
            )}
        </>
    );
}

interface ratingProps {
    maximumValue: number;
    selectedValue: number;
    onChange(rate: number): void;
}