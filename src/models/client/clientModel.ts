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

    client_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client',
        default: null
    },
    
    proj_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Project',
        default: null
    }, 

    phone: {
        type: String,
         required: true
    },

    address: {
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

    startTime: {
        type: String,
    },

    endTime: {
        type: String,
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

    clientStatus: {
        type: Boolean,
        default: 0
    },

    assignStatus: {
        type: Boolean,
        default: 0
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

