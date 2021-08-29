module.exports = {
    userNormalizator: (userToNormalize) => {
        const filedsToRemove = [
            'password',
            '__v'
        ];

        userToNormalize = userToNormalize.toJSON();

        filedsToRemove.forEach((field) => {
            delete userToNormalize[field];
        });

        return userToNormalize;
    }
};
