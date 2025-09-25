import express from "express";
import Service from "../models/Service.js";
import ServiceType from "../models/ServiceType.js";

const router = express.Router();

router.post("/service-types", async (req, res) => {
    try {
        const serviceType = new ServiceType(req.body);
        await serviceType.save();
        res.status(201).json(serviceType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/service-types", async (req, res) => {
    const types = await ServiceType.find();
    res.json(types);
});

router.post("/services", async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/services/:typeId", async (req, res) => {
    try {
        const services = await Service.find({ serviceType: req.params.typeId });
        res.json(services);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;