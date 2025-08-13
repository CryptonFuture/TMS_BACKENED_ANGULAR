import mongoose, {Document, Schema} from "mongoose";
import { IRole } from "../../types/role.types";

export interface IRoleDocument extends IRole, Document {}

const roleSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
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

export default mongoose.model<IRoleDocument>('Role', roleSchema)

