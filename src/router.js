import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';
// 7.43 We comment out/remove the below three import statements because we are using react-router and system.import to load these when the user navigates to them (we are now dynamically loading them)
// import ArtistDetail from './components/artists/ArtistDetail';
// import ArtistCreate from './components/artists/ArtistCreate';
// import ArtistEdit from './components/artists/ArtistEdit';


//7.42 and 7.43
const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain },
  childRoutes: [
    {
      path: 'artists/new',
      getComponent(location, cb) {
        // whenever Webpack sees "System.import", it will automatically modify the bundle that is generated to split off a second bundle that can be fetched dynamically to load the code inside of it
        System.import('./components/artists/ArtistCreate').then(module => cb(null, module.default));
      }
    },
    {
      path: 'artists/:id',
      getComponent(location, cb) {
        // whenever Webpack sees "System.import", it will automatically modify the bundle that is generated to split off a second bundle that can be fetched dynamically to load the code inside of it
        System.import('./components/artists/ArtistDetail').then(module => cb(null, module.default));
      }
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb) {
        // whenever Webpack sees "System.import", it will automatically modify the bundle that is generated to split off a second bundle that can be fetched dynamically to load the code inside of it
        System.import('./components/artists/ArtistEdit').then(module => cb(null, module.default));
      }
    }
  ]
};

const Routes = () => {
  return (
    /*Section 7.43*/
    /*<Router history={hashHistory}>
      <Route path="/" component={Home}>
        <IndexRoute component={ArtistMain} />
        <Route path="artists/new" component={ArtistCreate} />
        <Route path="artists/:id" component={ArtistDetail} />
        <Route path="artists/:id/edit" component={ArtistEdit} />
      </Route>
    </Router>*/
    <Router history={hashHistory} routes={componentRoutes}/>
  );
};

export default Routes;
