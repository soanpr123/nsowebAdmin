const rvn = require('read-vietnamese-number');

export default (context, inject) => {
    const helpers = {
        validator(value, name, validatorFcn = false) {
            if (validatorFcn) {
                let error = false;
                validatorFcn({}, value, (_error) => {
                    error = _error ? _error.message : false;
                });

                return error;
            }

            return value === '' || value === undefined || value === null
                ? `Vui lòng nhập ${name}`
                : false;
        },

        readVietnameseNumber(number) {
            const config = new rvn.ReadingConfig();
            config.unit = ['đồng'];
            const validatedNumber = rvn.validateNumber(`${number}`);
            const numberData = rvn.parseNumberData(config, validatedNumber);
            const result = rvn.readNumber(config, numberData);

            return result;
        },

        readEnglishNumber(number) {
            const converter = require('number-to-words');

            return converter.toWords(number);
        },
    };

    inject('helpers', helpers);
};
