import mongoose from "mongoose";

const assignEmpToClientSchema = new mongoose.Schema({
    emp_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        default: null,
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
    
    description: {
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

export default mongoose.model('AssignEmpToClient', assignEmpToClientSchema)

