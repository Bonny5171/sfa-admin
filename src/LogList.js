import * as React from "react";
import { List, Datagrid, TextField, DateField, ChipField, FunctionField, RichTextField,
  Filter, TextInput, SearchInput, BooleanInput } from 'react-admin';

import VisitorListAside from './VisitorListAside';

// const PostFilter = (props) => (
//   <Filter {...props}>
//       <TextInput label="Search" source="q" alwaysOn />
//       <TextInput label="Title" source="title" defaultValue="Hello, World!" />
//   </Filter>
// );

// const PostFilter = props => (
//   <Filter {...props}>
//       <SearchInput source="q" alwaysOn />
//   </Filter>
// );

const PostFilter = (props) => (
  <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      <BooleanInput source="is_published" alwaysOn />
      <TextInput source="title" defaultValue="Hello, World!" />
  </Filter>
);

export const LogList = (props) => (
    <List
      {...props}
      title="Logs"
      perPage={5}
      // filters={<PostFilter />}
      aside={<VisitorListAside />}
    >
      <Datagrid>
        <TextField source="id" />
        {/* <TextField source="app_id" />*/}
        {/* <TextField source="record_type_id" />  */}
        {/* <DateField source="created_at" showTime /> */}

        <TextField source="created_at" />

        <DateField source="updated_at" showTime />
        <TextField source="job_faktory_id" />
        <TextField source="job_scheduler_name" />
        {/* <TextField source="schema_id" /> */}
        <TextField source="doc_meta_data.Type" />
        {/* <RichTextField source="doc_meta_data.Details" /> */}

        {/* <FunctionField label="doc_meta_data" render={record => `${record.Type}: ${record.Details}`} /> */}
        {/* <TextField source="doc_meta_data" /> */}
        <ChipField source="status_name" />
      </Datagrid>
    </List>
);