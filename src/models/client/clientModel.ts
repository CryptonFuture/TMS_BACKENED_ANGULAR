import mongoose, {Document, Schema} from "mongoose";
import { IClient } from "../../types/client.types";

export interface IClientDocument extends IClient, Document {}

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

export default mongoose.model<IClientDocument>('Client', authSchema)

