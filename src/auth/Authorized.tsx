import { ReactElement, useContext, useEffect, useState } from "react"
import AuthenticationContext from "./AuthenticationContext";

export default function Authorized(props: authorizedProps) {

    const [isAutorized, setIsAutorized] = useState(false);
    const { claims } = useContext(AuthenticationContext);

    useEffect(() => {

        if (props.role) {
            const index = claims.findIndex(claim => claim.name === 'role' && claim.value === props.role);
            setIsAutorized(index > -1);
        } else {
            setIsAutorized(claims.length > 0);
        }


    }, [claims, props.role]);

    return (
        <>
            {isAutorized ? props.authorized : props.notAutorized}
        </>
    );
}


interface authorizedProps {
    authorized: ReactElement;
    notAutorized?: ReactElement;
    role?: string;
}