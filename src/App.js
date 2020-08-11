import * as React from "react";
import { Admin, Resource, } from 'react-admin';
import dataProvider from './dataProvider';
import { LogList } from './LogList'

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="Job Log Execution" list={LogList} />
  </Admin>
);

export default App;