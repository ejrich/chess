import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Game from './components/Game';
import FetchData from './components/FetchData';
import Counter from './components/Counter';

export const routes = <Layout>
    <Route exact path='/' component={ Game } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata/:startDateIndex?' component={ FetchData } />
</Layout>;
