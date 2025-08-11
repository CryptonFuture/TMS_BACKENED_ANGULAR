import mongoose, { Document, Schema } from "mongoose";
import { ILogs } from "../../types/logs.types";

export interface ILogsDocument extends ILogs, Document {}

const logsSchema: Schema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        default: null
    },

    login_time: {
        type: Date,
        default: new Date().getTime()
    },

    logout_time: {
        type: String,
        default: null
    },

    accessToken: {
        type: String,
    },

}, {
    timestamps: true
})

export default mongoose.model<ILogsDocument>('Logs', logsSchema)


