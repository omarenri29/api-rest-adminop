import { connect, closeDataBase, clearDataBase } from './db.js';
import Account from '../models/Account.js';
import {
    getAccounts,
    getAccountById,
    createAccount,
    updateAccount,
    delateAccount
} from '../controllers/accountController.js'
import { api, initialRoles } from "./helpers.js";
import request from 'supertest'

beforeAll(async () => connect());
afterEach(async () => clearDataBase());
afterAll(async () => closeDataBase());

describe('Account created when', () => {
    it('Should create a new account', async () => {
        const newAccount = {
            name_account: "Front Teams",
            name_client: "Omar",
            name_responsible: "Alejandro",
            team: ["ID1", "ID2", "ID3"]
        };
        const req = {};
        const res = {
            text: '',            
            send: function(input) { this.text = input } 
        }
        createAccount(req, res);
        
    })
    
})   