import mongoose from "mongoose";

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/ts-app-crud')
        console.log('>>>>> Database running');

    } catch (error) {
        console.log('Error: ', error);

    }
}


export default connect