import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

let apiUrl = 'https://api-dot-evmdsfa-snd.appspot.com:443/account/job_log_execution';
const httpClient = fetchUtils.fetchJson;
const options = {};
options.user = {
  authenticated: true,
  token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdGsiOiIwMEQzaDAwMDAwNTdZSzEhQVFVQVFJOEI3YUlKdEdSOHRfVUF3d2tLTnA2Wk5INkFKTjU0cVM3ZEJRTk1OYml5ZUVQanl6N0x5THBJcmlPOTBNeVVDdWVoYW1QM3h2UjFfXzZicDgwTFo3T1hIdWhJIiwiY2lkIjoiM01WRzlLaXA0SUtBWlFFVnZUSmdEZ0I2eW9fZ2gwVkxnLmI5OXE1RjkzMjR1RzZUR3JIM05WRmMuYnRzVUQzVUlIa013SVF1VHNKOWlQanFtTEZzbyIsIm9pZCI6IjAwRDNoMDAwMDA1N1lLMUVBTSIsInRpZCI6MTMsInVpZCI6IjAwNTNoMDAwMDAyWmNvc0FBQyJ9.1FauR3sF4H6gfx0eNlxYkwZwpdbvPJwwIuTQ6Vp3Xz8'
};

let stack = 'account';

export default {
    getList: (resource, params) => {

        let filter = {};
        let filterDate = '';
        
        Object.keys(params.filter).forEach(function (key) {
            // key: the name of the object key

            const defaultListOp = 'like';
            const splitKey = key.split('@');
            const operation = splitKey.length === 2 ? splitKey[1] : defaultListOp;

            let values;
            if (operation.includes('like')) {
                // we split the search term in words
                values = params.filter[key].trim().split(' ');
            } else {
                values = [params.filter[key]];
            }

            if (key === 'stack') {
                stack = values;
            } else if (key === 'created_at@lte' || key === 'created_at@gte') {
                let filterATE = '&and=(FIELD.FILTER.VALUE)';
                filterDate += filterATE
                    .replace('FIELD', splitKey[0])
                    .replace('FILTER', splitKey[1])
                    .replace('VALUE', escape(values));
            } else {
                values.forEach(value => {
                    let op = operation.includes('like') ? `${operation}.*${value}*` : `${operation}.${value}`;
                    if (filter[splitKey[0]] === undefined) {
                        // first operator for the key, we add it to the dict
                        filter[splitKey[0]] = op;
                    }
                    else
                    {
                        if (!Array.isArray(filter[splitKey[0]])) {
                            // second operator, we transform to an array
                            filter[splitKey[0]] = [filter[splitKey[0]], op]
                        } else {
                            // third and subsequent, we add to array
                            filter[splitKey[0]].push(op);
                        }
                    }
                });
            }

        });

        console.log('filter:', filter);

        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            order: `${field}.${order.toLowerCase()}`,
            offset: (page - 1) * perPage,
            limit: perPage,
            ...filter,
        };

        if (stack) {
            apiUrl = apiUrl
                .replace('/account/', `/${stack}/`)
                .replace('/product/', `/${stack}/`)
                .replace('/setup/', `/${stack}/`)
                .replace('/order/', `/${stack}/`)
                .replace('/resource/', `/${stack}/`);
        }
        
        let url = `${apiUrl}?${stringify(query)}${filterDate}`;

        console.log('filter: ', url);

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