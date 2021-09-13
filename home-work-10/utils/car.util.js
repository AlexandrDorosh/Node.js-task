module.exports = {
    carNormalizator: (carToNormalize) => {
        const filedsToRemove = ['__v'];

        carToNormalize = carToNormalize.toJSON();

        filedsToRemove.forEach((field) => {
            delete carToNormalize[field];
        });

        return carToNormalize;
    }
};
