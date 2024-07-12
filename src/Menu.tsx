import { NavLink } from "react-router-dom";
import Authorized from "./auth/Authorized";
import { RoleHelper } from "./helpers/RoleHelper";

export default function Menu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    Ashkan Movies
                </NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/movies/filter">
                                Filter Movies
                            </NavLink>
                        </li>

                        <Authorized
                            authorized={
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/genres">
                                            Genres
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/actors">
                                            Actors
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/movietheaters">
                                            Movie Theaters
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/movies/create">
                                            Create Movie
                                        </NavLink>
                                    </li>
                                </>
                            }

                            role={RoleHelper.getAdminRole()}
                        />
                    </ul>
                </div>
            </div>
        </nav>
    );
}