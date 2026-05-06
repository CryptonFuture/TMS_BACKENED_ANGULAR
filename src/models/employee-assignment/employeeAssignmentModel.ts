import mongoose, {Document, Schema} from "mongoose";
import { IEmpAssign } from "../../types/empAssign.types";

export interface IEmpAssignDocument extends IEmpAssign, Document {}

const empAssignSchema: Schema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        default: null,
        required: true
    },

    // project_id: {
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Project',
    //     default: null,
    //     required: true
    // },

    plan_start_date: {
        type: String,
    },

    plan_end_date: {
        type: String,
    },

    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        default: null,
        required: true
    },

    plan_hour: {
        type: String,
        required: true 
    },

    working_hours: {
        type: String,
        required: true 
    },

    start_date: {
        type: String,
    },

    end_date: {
        type: Date,
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

export default mongoose.model<IEmpAssignDocument>('EmpAssign', empAssignSchema)

