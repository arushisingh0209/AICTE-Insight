import mongoose from "mongoose";
const { Schema } = mongoose;

const FacultySchema = new Schema({

    uni: {
        type: String,
        length: 100
    },
    course: {
        type: String,
        length: 100
    },
    name: {
        type: String,
        length: 100
    },
    education: {
        type: String,
        length: 1000
    },
    area: {
        type: String,
        length: 100
    },
    designation:
    {
        type: String,
        length: 100
    },
}
)

let Faculty = mongoose.model('faculties', FacultySchema);
export default Faculty;