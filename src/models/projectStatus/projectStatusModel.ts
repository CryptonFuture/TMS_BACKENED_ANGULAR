import mongoose, {Document, Schema} from "mongoose";

const projectStatusSchema: Schema = new Schema({
    projectStatus: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    status: {
        type: Boolean,
        default: 0
    },

    is_deleted: {
        type: Boolean,
        default: 0
    },

    created_by: {
        type: String,
        default: null
    },

    updated_by: {
        type: String,
        default: null
    }

}, {
    timestamps: true
})

export default mongoose.model('ProjectStatus', projectStatusSchema)

