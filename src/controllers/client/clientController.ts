import Client from '../../models/client/clientModel'
import { Request, Response } from 'express'
import { IClient } from '../../types/client.types'
import validator from 'validator'
import bcrypt from 'bcryptjs'


const AddClient = async (req: Request, res: Response): Promise<Response> => {
    const {
        name,
        email,
        password,
        confirmPass,
        phone,
        address,
        description,
        startTime,
        endTime
        
    }: IClient = req.body

    if (!name || !email || !password || !confirmPass || !phone || !address) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields'
        })
    }

     if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid Email'
            })
        }

     const isExistEmail = await Client.findOne({ email })
    
        if (isExistEmail) {
            return res.status(400).json({
                success: false,
                error: 'email address already exists has been taken'
            })
        } else if (password !== confirmPass) {
            return res.status(400).json({
                success: false,
                error: "Password does'nt match"
            })
        }

         if (password.length < 10 || confirmPass.length < 10) {
                return res.status(400).json({
                    success: false,
                    error: 'Password must be at least 10 characters long'
                })
            }
        
            const hashPassword = await bcrypt.hash(password, 10)
            const hashConfirmPass = await bcrypt.hash(confirmPass, 10)

    const client = new Client({
      name,
      email,
      password: hashPassword,
      confirmPass: hashConfirmPass,
      phone,
      address,
      description,
      startTime,
      endTime
    })

    const clientData = await client.save()

    if (clientData) {
        return res.status(200).json({
            success: true,
            message: "client create successfully",
            data: clientData
        })
    } else {
        return res.status(500).json({
            success: false,
            error: "Internal server error",
        })
    }
}

const getClient = async (req: Request, res: Response): Promise<Response> => {
    try {

        const client = await Client.find()

        if (!client || client.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: client,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const getExistingClient = async (req: Request, res: Response): Promise<Response> => {
    try {

        const existingClient = await Client.find({status: true})

        if (!existingClient || existingClient.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: existingClient,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const getNonExistingClient = async (req: Request, res: Response): Promise<Response> => {
    try {

        const NonExistingClient = await Client.find({status: false})

        if (!NonExistingClient || NonExistingClient.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: NonExistingClient,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const editClientById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'ID parameter is missing',
        });
    }

    const client = await Client.findById(id)

    if (!client) {
        return res.status(404).json({
            success: false,
            error: "No client Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: client
    })
}

const viewClientById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'ID parameter is missing',
        });
    }

    const client = await Client.findById(id)

    if (!client) {
        return res.status(404).json({
            success: false,
            error: "No client Id found"
        })
    }

    return res.status(200).json({
        success: true,
        data: client
    })
}

// hard deleted
const deleteClient = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!id || id.length !== 24) {
        return res.status(400).json({
            success: false,
            error: 'Invalid or missing project ID',
        });
    }

    const client = await Client.findById(id);

    if (!client) {
        return res.status(404).json({
            success: false,
            error: 'No client found with this ID',
        });
    }

    if (client.is_deleted !== true) {
        return res.status(400).json({
            success: false,
            error: 'Client cannot be deleted until it is marked as deleted=true',
        });
    }

    await Client.findByIdAndDelete(id);

    return res.status(200).json({
        success: true,
        message: 'Deleted client successfully',
    });
};

// soft deleted
const deleteClients = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const client = await Client.findByIdAndUpdate({ _id: id }, { is_deleted: 1 })

    if (!client) {
        return res.status(404).json({
            success: false,
            error: "No client Id found"
        })
    } else {
        return res.status(200).json({
            success: true,
            message: 'Delete client Successfully'
        })
    }
}

const updateClient = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const {
        name,
        email,
        phone,
        address,
        description,
        startTime,
        endTime,
        status
    }: IClient = req.body;

    if (!name || !email || !phone || !address) {
        return res.status(400).json({
            success: false,
            error: 'Please fill out all fields'
        })
    }

    const updatedClient = await Client.findByIdAndUpdate(
        { _id: id },
        {
            name,
            email,
            phone,
            address,
            description,
            startTime,
            endTime,
            status
        },
        { new: true }
    );

    if (!updatedClient) {
        return res.status(404).json({
            success: false,
            error: 'no record found',
        });
    }


    return res.status(200).json({
        success: true,
        message: "Client updated successfully",
        data: updatedClient,
    });
}

const clientCount = async (req: Request, res: Response): Promise<Response> => {

    const cliecount = await Client.countDocuments()

    return res.status(200).json({
        success: true,
        count: cliecount
    })
}

const existingClientCount = async (req: Request, res: Response): Promise<Response> => {

    const existingClieCount = await Client.countDocuments({status: true})

    return res.status(200).json({
        success: true,
        count: existingClieCount
    })
}

const NonExistingClientCount = async (req: Request, res: Response): Promise<Response> => {

    const NonExistingClieCount = await Client.countDocuments({status: false})

    return res.status(200).json({
        success: true,
        count: NonExistingClieCount
    })
}

export {
    AddClient,
    getClient,
    getExistingClient,
    getNonExistingClient,
    updateClient,
    deleteClient,
    deleteClients,
    clientCount,
    existingClientCount,
    NonExistingClientCount,
    editClientById,
    viewClientById
}