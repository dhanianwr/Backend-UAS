const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = `mongodb+srv://admin:admin123@cluster.pmz2au3.mongodb.net/kontak?retryWrites=true&w=majority`;

        const con = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected: ${con.connection.host}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;