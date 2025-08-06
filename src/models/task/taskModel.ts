import mongoose, { Document, Schema } from "mongoose";
import { ITask } from "../../types/task.types";

export interface ITaskDocument extends ITask, Document {}

const taskSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },

    client_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client',
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

export default mongoose.model<ITaskDocument>('Task', taskSchema)

