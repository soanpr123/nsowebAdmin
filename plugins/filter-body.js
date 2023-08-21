import _cloneDeep from 'lodash/cloneDeep';
import _findIndex from 'lodash/findIndex';
import { PER_PAGE } from '@/constants/systemSettings';

export default (context, inject) => {
    const filterBody = (_filterBody, query = {}) => {
        const _options = _cloneDeep(query);
        const start = +_options?.start || 0;
        if (_options?.start) {
            delete _options.start;
        }
        const options = _cloneDeep(_filterBody);

        Object.keys(_options).forEach((key) => {
            const index = _findIndex(options.columns, { name: key });
            options.columns[index] = {
                index: options?.columns[index]?.index,
                data: key,
                name: key,
                searchable: true,
                orderable: true,
                search: {
                    value: /^-?\d+$/.test(_options[key]) ? Number(_options[key]) : _options[key],
                    regex: false,
                },
                regex: false,
            };
        });

        return {
            ...options,
            start: start * PER_PAGE,
            length: _options?.length || PER_PAGE,
        };
    };

    inject('filterBody', filterBody);
};
