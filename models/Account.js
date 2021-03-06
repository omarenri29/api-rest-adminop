import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    name_account: {
        type: String,
        require: true,
        trim: true
    },
    name_client: {
        type: String,
        require: true, 
        trim: true
    }, 
    name_responsible: {
        type: String,
        require: true,
        trim: true,
    },
    team: {
        type: Array, 
        require: true
    }
},
    {
        timestamps: true
    }
);

const Account = mongoose.model('Account', accountSchema);
export default Account; 