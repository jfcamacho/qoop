export const CustomerService = {
    getData() {
        return [
            {
                id: 1000,
                title: 'Front Desing',
                description: 'Desing all the parts for Manage task project',
                tasks: 23,
                status: 35
            },
            {
                id: 1001,
                title: 'Back Desing',
                description: 'Desing all the parts for Manage back task project',
                tasks: 37,
                status: 50
            },
            {
                id: 1002,
                title: 'Payment Desing',
                description: 'Desing all the parts for Manage Payment task project',
                tasks: 2,
                status: 78
            },
            {
                id: 1003,
                title: 'Cron Desing',
                description: 'Desing all the parts for Manage Cron task project',
                tasks: 4,
                status: 25
            },
        ];
    },

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    },

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    },

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    },

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
    },

    getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    }
};
