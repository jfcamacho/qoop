export const UserServices = {
    getData() {
        return [
            { username: 'jfcamacho', email: 'jfcamacho@email.com', name: 'Jefferson' },
            { username: 'acbenitez', email: 'acbenitez@email.com', name: 'Alison' },
            { username: 'herrera', email: 'herrera@email.com', name: 'Maritza' },
            { username: 'hernesto', email: 'hernesto@email.com', name: 'Javier' },
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
