import Record from "../models/record.js"
export const getRecords = async (req, res) => {
    try {
        const records = await Record.find();
        res.json(records);
    }
    catch(err) {
        res.status(400).json({ message: err.message});
    }
}

export const getRecordById = async (req, res) => {
    const { id } = req.params;

    try {
        const record = await Record.findById(id);

        if (record == null) {
            res.status(404).json({ message: 'Not able to find'});
        }
        else {
            res.json(record);
        }
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
}

export const createRecord = async (req, res) => {
    try {
        let { name, unitCost, quantity, totalPrice, commission, totalCommission, bnbPrice } = req.body;

        // calculate the total price if not given
        if (totalPrice == null || totalCommission == null) {
            totalPrice = quantity * unitCost;
            totalCommission = commission* bnbPrice;
        }

        // check whether there exist a record with this name
        let previousRecord = await Record.findOne({ name });

        if (previousRecord == null) {
            // create a new record
            previousRecord = new Record({ name, unitCost, quantity, totalPrice, bnbPrice, commission, totalCommission });            
        } 
        // do not create the new record just update this one
        // by increasing the quantity
        else {

            // we may buy or sell 

            // you buy 
            if (quantity > 0) {
                previousRecord.quantity += quantity;
                previousRecord.totalPrice += totalPrice;
                const result = previousRecord.totalPrice / previousRecord.quantity;
                previousRecord.unitCost = Math.round(result * 100) / 100;
                
            }
            
            // you sell
            else {
                // quantity will be negative
                previousRecord.quantity += quantity;
                previousRecord.totalPrice += previousRecord.unitCost * quantity;
            }

            previousRecord.commission += commission;
            previousRecord.totalCommission += Math.round(commission * bnbPrice * 100) / 100;

        }

        await previousRecord.save();
        res.json(previousRecord);
        
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
}


export const updateRecord = async (req, res) => {
    const { id } = req.params;

    try {   
        // First find the record given by id
        let record = await Record.findById(id);
        if (record == null) {
            res.status(404).json({ message: 'Not able to find'});
        }
        const { name, averagePrice, quantity, totalPrice, commission} = req.body;

        if (name) {
            record.name = name;
        }
        if (quantity) {
            record.quantity = quantity;
            record.totalPrice = Math.round(100 * quantity * record.averagePrice) / 100;
        }
        if (averagePrice) {
            record.averagePrice = averagePrice;
            record.totalPrice = Math.round(100 * record.quantity * averagePrice) / 100;
        }
        if (totalPrice) {
            record.totalPrice = totalPrice;
        }
        if (commission) {
            record.commission = commission;
        }

        await record.save();
        res.json(record);
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }

}


export const deleteRecord = async (req, res) => {
    const { id } = req.params;

    let name = null;
    try {   
        // First find the record given by id
        let record = await Record.findById(id);
        if (record == null) {
            res.status(404).json({ message: 'Not able to find'});
        }
        else {
            name = record.name;
            await record.remove();
        }
        res.json(`Coin with name ${name} is deleted`);
    }
    catch(err) {
        res.status(400).json({ message: err.message });
    }
}
