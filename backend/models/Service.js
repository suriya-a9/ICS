import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema(
    {
        label: { type: String },
        amount: { type: mongoose.Schema.Types.Mixed },
    },
    { _id: false }
);

const serviceSchema = new mongoose.Schema({
    serviceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceType",
        required: true,
    },
    name: { type: String, required: true },
    processingTime: { type: String, required: true },
    description: { type: String },
    requiredDocuments: [{ type: String }],
    feeStructure: [feeStructureSchema], 
});

export default mongoose.model("Service", serviceSchema);