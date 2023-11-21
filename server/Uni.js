import mongoose from "mongoose";
const { Schema } = mongoose;

const UniSchema = new Schema({

    uni: {
        type: String,
        length: 100
    },
    course: {
        type: String,
        length: 100
    },
}
)

let Uni = mongoose.model('unilists', UniSchema);
export default Uni;