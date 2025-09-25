import mongoose from "mongoose";

const serviceTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: [
      "Passport Services",
      "Visa Services",
      "Police Clearance Certificate",
      "Consular Services",
      "OCI Related Services",
      "Document Attestation",
      "Special Services",
    ],
    unique: true,
  },
});

export default mongoose.model("ServiceType", serviceTypeSchema);