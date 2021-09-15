const { User } = require('../dataBase');
const { passwordService: { hash } } = require('../services');
const { ADMIN } = require('../config/user-roles.enum');

module.exports = (async () => {
    const user = await User.findOne();

    if (!user) {
        const defaultAdmin = {
            name: 'Admin',
            email: 'admin@example.com',
            role: ADMIN,
            password: await hash('12345')
        };

        await User.create(defaultAdmin);
    }
});
