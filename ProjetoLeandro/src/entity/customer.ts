import mongoose from "mongoose";

const customersSchema = new mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {type: String, required: true},
    documentNumber: {type: String, required: true},
    address: {type: String, required: true}
}, { versionKey: false });

const customer = mongoose.model("customers", customersSchema);

export default customer;
