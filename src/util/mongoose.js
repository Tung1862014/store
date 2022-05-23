module.exports = {
    multipleMongooseToObject: function (mongoose) {
        return mongoose.map((mongoose) => mongoose.toObject());
    },
    mogoToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
