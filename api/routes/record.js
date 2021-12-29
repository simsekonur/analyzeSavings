import express from "express";
import { createRecord,
    getRecordById,
    getRecords,
    updateRecord, 
    deleteRecord } from "../controllers/record.js";


const router = express.Router();

router.get('/', getRecords);
router.post('/', createRecord);
router.get('/:id', getRecordById);
router.post('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export default router;
