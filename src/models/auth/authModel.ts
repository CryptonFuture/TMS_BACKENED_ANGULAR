import mongoose, {Document, Schema} from "mongoose";
import { IUser } from "../../types/user.types";

export interface IUserDocument extends IUser, Document {}

const authSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    confirmPass: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true 
    },

    designation: {
        type: String,
        required: true 
    },

    department: {
        type: String,
        required: true 
    },

    joiningDate: {
        type: Date,
        required: true 
    },

    description: {
        type: String,
    },

    accessToken: {
        type: String,
        default: null
    },

    refreshToken: {
        type: String,
        default: null
    },

    active: {
        type: Boolean,
        default: 0
    },

    is_admin: {
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

export default mongoose.model<IUserDocument>('User', authSchema)

