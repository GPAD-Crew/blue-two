import { Router } from "express";
import { Raw } from "typeorm";
import { Dodgy } from "~/db/entities";
import { validatePSN } from "./validatePSN";

export const dodgy = Router();

dodgy.post("/:userid", validatePSN, (req, res) => {
    const { userid } = req.params;

    Dodgy.insert({ psn: userid })
        .then(() => res.sendStatus(200))
        .catch((error) => res.status(400).json({ error }));
});

dodgy.delete("/:userid", validatePSN, async (req, res) => {
    const { userid: psn } = req.params;

    try {
        await Dodgy.findOneOrFail({ where: { psn } });
        await Dodgy.delete({ psn });

        res.sendStatus(200);
    } catch (error) {
        res.status(400).json({ error });
    }
});

dodgy.get("/:userid", async (req, res) => {
    const { userid: psn } = req.params;

    const dodgy = await Dodgy.find({
        where: {
            psn: Raw((alias) => `LOWER(${alias}) Like LOWER(:value)`, {
                value: `%${psn}%`,
            }),
        },
    });

    res.json(dodgy);
});
