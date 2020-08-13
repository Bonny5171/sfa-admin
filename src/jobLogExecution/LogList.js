import * as React from "react";
import { List, Datagrid, TextField, DateField, ChipField } from 'react-admin';
import { Pagination } from 'react-admin';
import { startOfMonth, subMonths } from 'date-fns';

import FiltersAside from './FiltersAside';

export const LogList = (props) => (
    <List
      {...props}
      title="Logs"
      aside={<FiltersAside />}
      perPage={5}
      pagination={<Pagination rowsPerPageOptions={[5, 10, 15, 20, 40, 100]} {...props} />}      
      filterDefaultValues={{
        stack: 'account',
        'created_at@gte': subMonths(
            startOfMonth(new Date()),
            1
        ).toISOString(),
        'created_at@lte': startOfMonth(
            new Date()
        ).toISOString(),
      }}
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
        {/* <TextField source="doc_meta_data.Type" /> */}
        {/* <RichTextField source="doc_meta_data.Details" /> */}
        {/* <TextField source="doc_meta_data" /> */}
        <ChipField source="status_name" />
      </Datagrid>
    </List>
);