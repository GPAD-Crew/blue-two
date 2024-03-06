import { RequestHandler } from "express";

export const validatePSN: RequestHandler = (req, res, next) => {
    const { userid } = req.params;

    /* 
        must start with a letter
        contain only letters, numbers, underscore, hyphen
        3-16 chars long
    */

    const VALID_PSN = /^[a-zA-Z]{1,1}[a-zA-Z0-9_-]{2,15}$/;

    if (!VALID_PSN.test(userid)) {
        return res.status(400).json({ error: "Invalid PSN provided [server]" });
    }

    next();
};
