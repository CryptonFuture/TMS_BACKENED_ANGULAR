import mongoose, {Document, Schema} from "mongoose";
import { IProject } from "../../types/project.types";

export interface IProjectDocument extends IProject, Document {}

const projectSchema: Schema = new Schema({
    project_code: {
        type: Number,
        required: true
    },

    project_name: {
        type: String,
        required: true
    },

    working_hours: {
        type: Number,
        required: true
    },

    joc: {
        type: Number,
        required: true
    },

    designName: {
        type: String,
        required: true
    },

    project_manager_id: {
        type: String,
        default: null
    },

    client_id: {
        type: String,
         default: null
    },

    manager_id: {
        type: String,
         default: null
    },

    start_date: {
        type: String,
    },

    end_date: {
        type: String,
    },

    allow_for_off_time: {
        type: Boolean,
        default: 0
    },

    description: {
        type: String,
        default: null
    },

    remarks: {
        type: String,
        default: null
    },

    projectStatus: {
        type: String,
        default: 'pending'
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

export default mongoose.model<IProjectDocument>('Project', projectSchema)

