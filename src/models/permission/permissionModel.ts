import mongoose, {Document, Schema} from "mongoose";
import { IPermission } from "../../types/permission.types";

export interface IPermissionDocument extends IPermission, Document {}

const permissionSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    role: {
        type: Number,
        required: true
    },

    route: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    action: 
    [
        { 
            type: String, 
            enum: ["create", "read", "update", "delete"]   
        }
    ],

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

} , {
    timestamps: true
})

export default mongoose.model<IPermissionDocument>('Permission', permissionSchema)

