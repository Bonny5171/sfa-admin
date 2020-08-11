import * as React from "react";
import { List, Datagrid, TextField, DateField, ChipField } from 'react-admin';
import { Pagination } from 'react-admin';

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

// const PostFilter = (props) => (
//   <Filter {...props}>
//       <TextInput label="Search" source="q" alwaysOn />
//       <BooleanInput source="is_published" alwaysOn />
//       <TextInput source="title" defaultValue="Hello, World!" />
//   </Filter>
// );

export const LogList = (props) => (
    <List
      {...props}
      title="Logs"
      // filters={<PostFilter />}
      aside={<VisitorListAside />}
      perPage={5}
      pagination={<Pagination rowsPerPageOptions={[5, 10, 15, 20, 40, 100]} {...props} />}
    >
      <Datagrid>
        <TextField source="id" />
        {/* <TextField source="app_id" />*/}
        {/* <TextField source="record_type_id" />  */}
        {/* <DateField source="created_at" showTime /> */}

        <DateField source="created_at" locales="pt-BR" showTime />
        <DateField source="updated_at" locales="pt-BR" showTime />

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