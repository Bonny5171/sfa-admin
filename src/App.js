// in src/App.js
import * as React from "react";
import { fetchUtils, Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import dataProvider from './dataProvider';

// const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => <Admin dataProvider={dataProvider}>
  <Resource name="Job Log Execution" list={ListGuesser} />
</Admin>;

export default App;