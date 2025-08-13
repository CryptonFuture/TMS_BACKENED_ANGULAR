import mongoose, {Document, Schema} from "mongoose";
import { IRoute } from "../../types/route.types";

export interface IRouteDocument extends IRoute, Document {}

const routeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    role: {
        type: Number,
    },

    route: {
        type: String
    },

    description: {
        type: String,
    },

})

export default mongoose.model<IRouteDocument>('Route', routeSchema)

