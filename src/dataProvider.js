import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'https://api-dot-evmdsfa-snd.appspot.com:443/account/job_log_execution?offset=1&limit=100';
const httpClient = fetchUtils.fetchJson;
const options = {};
options.user = {
  authenticated: true,
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdGsiOiIwMEQzaDAwMDAwNTdZSzEhQVFVQVFJOEI3YUlKdEdSOHRfVUF3d2tLTnA2Wk5INkFKTjU0cVM3ZEJRTk1OYml5ZUVQanl6N0x5THBJcmlPOTBNeVVDdWVoYW1QM3h2UjFfXzZicDgwTFo3T1hIdWhJIiwiY2lkIjoiM01WRzlLaXA0SUtBWlFFVnZUSmdEZ0I2eW9fZ2gwVkxnLmI5OXE1RjkzMjR1RzZUR3JIM05WRmMuYnRzVUQzVUlIa013SVF1VHNKOWlQanFtTEZzbyIsIm9pZCI6IjAwRDNoMDAwMDA1N1lLMUVBTSIsInRpZCI6MTMsInVpZCI6IjAwNTNoMDAwMDAyWmNvc0FBQyJ9.1FauR3sF4H6gfx0eNlxYkwZwpdbvPJwwIuTQ6Vp3Xz8'
};

export default {
    getList: (resource, params) => {
        // const { page, perPage } = params.pagination;
        // const { field, order } = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify(params.filter),
        // };
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const url = `${apiUrl}`;

        return httpClient(url, options).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    }
};