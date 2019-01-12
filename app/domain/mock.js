let customers = [];

// Library for randome data generation
var Chance = require('chance');
var chance = new Chance();

// Chance user method definition
chance.mixin({
    'user': function(x) {
        return {
            id: x,
            msisdin: chance.guid(),
            name: chance.name(),
            address: chance.address(),
            city: chance.city(),
            zipcode: chance.zip(),
            gender: chance.gender(),
            phone: chance.phone({ country: 'uk', mobile: true }),
            email: chance.email({domain: "mockmail.com"}),
        };
    }
});

for (let x = 1; x <= 41; x++) {
    customers[x - 1] = chance.user(x);
}

module.exports.customers = customers;