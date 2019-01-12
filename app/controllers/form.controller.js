function FormController() {

    var form = [
        {
            id: 1,
            name: 'id',
            type: 'text',
            attr: 'id',
        },
        {
            id: 2,
            name: 'Nombre',
            type: 'text',
            attr: 'name'
        },
        {
            id: 3,
            name: 'Direccion',
            type: 'text',
            attr: 'address'
        },
        {
            id: 4,
            name: 'Ciudad',
            type: 'text',
            attr: 'city'
        },
        {
            id: 5,
            name: 'C.P.',
            type: 'text',
            attr: 'zipcode'
        },
        {
            id: 6,
            name: 'Genero',
            type: 'text',
            attr: 'gender'
        },
        {
            id: 7,
            name: 'Telefono',
            type: 'text',
            attr: 'phone'
        },
        {
            id: 8,
            name: 'Email',
            type: 'text',
            attr: 'email'
        }
    ];

    function load(req, res, next) {
        req.form = form;
        next();
    }

    return {
        load
    }
}

module.exports = new FormController();