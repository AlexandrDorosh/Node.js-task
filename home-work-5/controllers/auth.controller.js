const { passwordService } = require('../services');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { user, body } = req;

            await passwordService.compare(user.password, body.password);

            res.json('Hello');
            next();
        } catch (e) {
            next(e);
        }
    }
};
