import Account from "../models/Account.js";
import { validationResult } from 'express-validator';

const getAccounts = async (req, res) => {
    //Validar si hay errores    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const filter = {};
        const accounts = await Account.find(filter);

        if (!accounts) {
            return res.status(400).json({ msg: 'No existe ninguna cuenta' })
        }
        res.json({ accounts });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Hubo un error' });
    }
}

const getAccountById = async (req, res) => {

    //Validar si hay errores    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const account = await Account.findById(req.params.id);
        if (!account) {
            return res.status(400).json({ msg: 'La cuenta no existe' })
        }
        res.json({ account });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Hubo un error' });
    }
}

const createAccount = async (req, res) => {

    //Validar si hay errores    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }    
    try {
        const account = new Account(req.body);
        const savedAccount = await account.save();
        
        res.json(savedAccount);

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Hubo un error' });
    }
}

const updateAccount = async (req, res) => {
    //Validar si hay errores    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //const {name_account, name_client, name_responsible, team} = req.body;
        let account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(400).json({ msg: 'Cuenta no encontrada' })
        }

        account = await Account.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })

        res.json({ account })
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Hubo un error' });
    }
}

const delateAccount = async (req, res) => {
    //Validar si hay errores    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let account = await Account.findById(req.params.id);

        if (!account) {
            return res.status(400).json({ msg: 'Cuenta no encontrada' });
        }
        await Account.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Cuenta eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Hubo un error' });
    }
}

export { getAccounts, getAccountById, createAccount, updateAccount, delateAccount };