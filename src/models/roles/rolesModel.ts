import mongoose, {Document, Schema} from "mongoose";
import { IRoles } from "../../types/roles.types";

export interface IRolesDocument extends IRoles, Document {}

const rolesSchema: Schema = new Schema({
    name: {
        type: String
    },

    role: {
        type: Number
    },

    description: {
        type: String
    },

}, {
    timestamps: true
})

export default mongoose.model<IRolesDocument>('Roles', rolesSchema)

