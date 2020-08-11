// in src/App.js
import * as React from "react";
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import dataProvider from './dataProvider';

import { LogList } from './LogList'
import { UserList } from './users';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => (
  <Admin
    title="testes"
    dataProvider={dataProvider}
  >
    <Resource name="Job Log Execution" list={LogList} />
    {/* <Resource name="users" list={UserList} /> */}
  </Admin>
);

export default App;