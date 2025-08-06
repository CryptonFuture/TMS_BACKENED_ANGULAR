import Client from '../../models/client/clientModel'
import { Request, Response } from 'express'
import { IClient } from '../../types/client.types'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import { FilterQuery } from 'mongoose'

interface QueryParams {
    search?: string;
    status?: string;
    description?: string;
    date?: string;
    page?: any,
    limit?: any,
    sort?: any
}


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

const getClient = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> => {
    const { page = 1, limit = 10, search = "", sort = "", description = "" } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const searchQuery: FilterQuery<typeof Client> = {};

    if (search) {
        searchQuery.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ];
    }

     if (description) {
        if (searchQuery.$or) {
            searchQuery.$and = [
                { $or: searchQuery.$or },
                { description: { $regex: description, $options: "i" } }
            ];
            delete searchQuery.$or; 
        } else {
            searchQuery.description = { $regex: description, $options: "i" };
        }
    }

    try {

        const skip = (pageNumber - 1) * limitNumber;

        let sortOptions: any = {};
        if (sort) {
            const [field, order] = sort.split(":");
            sortOptions[field] = order === "desc" ? -1 : 1;
        }

        const client = await Client.find(searchQuery)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber)

        const totalRecords = await Client.countDocuments(searchQuery);

        if (!client || client.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: client,
            pagination: {
                totalRecords,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalRecords / limitNumber),
                limit: limitNumber
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const getExistingClient = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> => {
    const { page = 1, limit = 10, search = "", sort = "", description = "" } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const searchQuery: FilterQuery<typeof Client> = { status: true };

    if (search) {
        searchQuery.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
        ];
    }

    if (description) {
        if (searchQuery.$or) {
            searchQuery.$and = [
                { $or: searchQuery.$or },
                { description: { $regex: description, $options: "i" } }
            ];
            delete searchQuery.$or; 
        } else {
            searchQuery.description = { $regex: description, $options: "i" };
        }
    }

    try {

        const skip = (pageNumber - 1) * limitNumber;

        let sortOptions: any = {};
        if (sort) {
            const [field, order] = sort.split(":");
            sortOptions[field] = order === "desc" ? -1 : 1;
        }

        const existingClient = await Client.find(searchQuery)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber)

        const totalRecords = await Client.countDocuments(searchQuery);


        if (!existingClient || existingClient.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: existingClient,
            pagination: {
                totalRecords,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalRecords / limitNumber),
                limit: limitNumber
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'internal server error',
        });
    }
}

const getNonExistingClient = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> => {
    const { page = 1, limit = 10, search = "", sort = "", description = "" } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const searchQuery: FilterQuery<typeof Client> = { status: false };

    if (search) {
        searchQuery.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ];
    }

     if (description) {
        if (searchQuery.$or) {
            searchQuery.$and = [
                { $or: searchQuery.$or },
                { description: { $regex: description, $options: "i" } }
            ];
            delete searchQuery.$or; 
        } else {
            searchQuery.description = { $regex: description, $options: "i" };
        }
    }


    try {

        const skip = (pageNumber - 1) * limitNumber;

        let sortOptions: any = {};
        if (sort) {
            const [field, order] = sort.split(":");
            sortOptions[field] = order === "desc" ? -1 : 1;
        }

        const NonExistingClient = await Client.find(searchQuery)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber)

        const totalRecords = await Client.countDocuments(searchQuery);

        if (!NonExistingClient || NonExistingClient.length === 0) {
            return res.status(404).json({
                success: false,
                error: "No record found"
            })
        }

        return res.status(200).json({
            success: true,
            data: NonExistingClient,
            pagination: {
                totalRecords,
                currentPage: pageNumber,
                totalPages: Math.ceil(totalRecords / limitNumber),
                limit: limitNumber
            }
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

const clientCount = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> => {

    const { search = "", description = "" } = req.query;

    const searchQuery: FilterQuery<typeof Client> = {};

    if (search) {
        searchQuery.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ];
    }

     if (description) {
        if (searchQuery.$or) {
            searchQuery.$and = [
                { $or: searchQuery.$or },
                { description: { $regex: description, $options: "i" } }
            ];
            delete searchQuery.$or; 
        } else {
            searchQuery.description = { $regex: description, $options: "i" };
        }
    }

    const cliecount = await Client.countDocuments(searchQuery)

    return res.status(200).json({
        success: true,
        count: cliecount
    })
}

const existingClientCount = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> => {

    const { search = "", description = "" } = req.query;

    const searchQuery: FilterQuery<typeof Client> = { status: true };

    if (search) {
        searchQuery.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ];
    }

    if (description) {
        if (searchQuery.$or) {
            searchQuery.$and = [
                { $or: searchQuery.$or },
                { description: { $regex: description, $options: "i" } }
            ];
            delete searchQuery.$or; 
        } else {
            searchQuery.description = { $regex: description, $options: "i" };
        }
    }

    const existingClieCount = await Client.countDocuments(searchQuery)

    return res.status(200).json({
        success: true,
        count: existingClieCount
    })
}

const NonExistingClientCount = async (req: Request<{}, {}, {}, QueryParams>, res: Response): Promise<Response> => {

    const { search = "", description = "" } = req.query;

    const searchQuery: FilterQuery<typeof Client> = { status: false };

    if (search) {
        searchQuery.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ];
    }

    if (description) {
        if (searchQuery.$or) {
            searchQuery.$and = [
                { $or: searchQuery.$or },
                { description: { $regex: description, $options: "i" } }
            ];
            delete searchQuery.$or; 
        } else {
            searchQuery.description = { $regex: description, $options: "i" };
        }
    }

    const NonExistingClieCount = await Client.countDocuments(searchQuery)

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