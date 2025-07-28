import mongoose from "mongoose";

const assignEmpToClientSchema = new mongoose.Schema({
    emp_id: {
        type: String,
        default: null
    },

    client_id: {
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

export default mongoose.model('AssignEmpToClient', assignEmpToClientSchema)

