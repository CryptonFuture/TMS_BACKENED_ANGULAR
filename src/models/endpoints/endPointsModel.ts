import mongoose, { Document, Schema } from "mongoose";
import { IEp } from "../../types/ep.types";

export interface IEpDocument extends IEp, Document {}

const ePSchema: Schema = new Schema({
    name: {
        type: String 
    },

    epRoutes: {
        type: String, 
    },

    baseUrl: {
        type: String
    },

    prefix: {
        type: String
    },

    endPoints: {
        type: String 
    }

})

export default mongoose.model<IEpDocument>('Ep', ePSchema)


