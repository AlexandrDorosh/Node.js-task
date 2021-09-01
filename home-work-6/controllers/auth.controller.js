const { passwordService } = require('../services');

module.exports = {
    authUser: async (req, res, next) => {
        try {
            const { user, body } = req;

            await passwordService.compare(body.password, user.password);

            res.json('Hello');
        } catch (e) {
            next(e);
        }
    }
};
