import IndexGenres from './genres/IndexGenres';
import LandingPage from './movies/LandingPage';
import CreateGenre from './genres/CreateGenre';
import EditGenre from './genres/EditGenre';
import IndexActors from './actors/IndexActors';
import CreateActor from './actors/CreateActor';
import EditActor from './actors/EditActor';
import IndexMovieTheaters from './movietheaters/IndexMovieTheaters';
import CreateMovieTheaters from './movietheaters/CreateMovieTheaters';
import EditMovieTheaters from './movietheaters/EditMovieTheaters';
import CreateMovie from './movies/CreateMovie';
import EditMovie from './movies/EditMovie';
import FilterMovies from './movies/FilterMovies';
import React, { ReactComponentElement } from 'react';
import RedirectToLandingPage from './utils/RedirectToLandingPage';
import MovieDetails from './movies/MovieDetails';
import Register from './auth/Register';
import Login from './auth/Login';

interface Route {
    path: string;
    component: React.ComponentType<any>;
    exact?: boolean;
    isAdmin: boolean;
}

const routes: Route[] = [

    { path: '/genres', component: IndexGenres, exact: true, isAdmin: true },
    { path: '/genres/edit/:id(\\d+)', component: EditGenre, isAdmin: true },
    { path: '/genres/create', component: CreateGenre, isAdmin: true },

    { path: '/actors', component: IndexActors, exact: true, isAdmin: true },
    { path: '/actors/create', component: CreateActor, isAdmin: true },
    { path: '/actors/edit/:id(\\d+)', component: EditActor, isAdmin: true },

    { path: '/movietheaters', component: IndexMovieTheaters, exact: true, isAdmin: true },
    { path: '/movietheaters/create', component: CreateMovieTheaters, isAdmin: true },
    { path: '/movietheaters/edit/:id(\\d+)', component: EditMovieTheaters, isAdmin: true },

    { path: '/movies/create', component: CreateMovie, isAdmin: true },
    { path: '/movies/edit/:id(\\d+)', component: EditMovie, isAdmin: true },
    { path: '/movies/filter', component: FilterMovies, isAdmin: false },
    { path: '/movie/:id(\\d+)', component: MovieDetails, isAdmin: false },

    { path: '/register', component: Register, isAdmin: false },
    { path: '/login', component: Login, isAdmin: false },

    { path: '/', component: LandingPage, exact: true, isAdmin: false },
    { path: '*', component: RedirectToLandingPage, isAdmin: false }
];

export default routes;


//https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually