// in src/users.js
import * as React from "react";
import { List, Datagrid, TextField, EmailField,
    Filter, ReferenceInput, SelectInput, TextInput } from 'react-admin';

import VisitorListAside from './VisitorListAside';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);


export const UserList = props => (
    <List
        {...props}
        filters={<PostFilter />}
        perPage={5}
        aside={<VisitorListAside />}
    >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
        </Datagrid>
    </List>
);