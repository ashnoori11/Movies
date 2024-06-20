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

interface Route {
    path: string;
    component: React.ComponentType<any>;
    exact?: boolean;
}

const routes: Route[] = [

    { path: '/genres', component: IndexGenres, exact: true },
    { path: '/genres/edit/:id(\\d+)', component: EditGenre },
    { path: '/genres/create', component: CreateGenre },

    { path: '/actors', component: IndexActors, exact: true },
    { path: '/actors/create', component: CreateActor },
    { path: '/actors/edit/:id(\\d+)', component: EditActor },

    { path: '/movietheaters', component: IndexMovieTheaters, exact: true },
    { path: '/movietheaters/create', component: CreateMovieTheaters },
    { path: '/movietheaters/edit/:id(\\d+)', component: EditMovieTheaters },

    { path: '/movies/create', component: CreateMovie },
    { path: '/movies/edit/:id(\\d+)', component: EditMovie },
    { path: '/movies/filter', component: FilterMovies },
    { path: '/movie/:id(\\d+)', component: MovieDetails },

    { path: '/', component: LandingPage, exact: true },
    { path: '*', component: RedirectToLandingPage }
];

export default routes;


//https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually