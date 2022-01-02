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
    const { isBought, name, quantity, unitCost, totalCommission } = req.body;

    console.log(req.body);

    try {
        let coin = await Record.findOne({ name });
        if (isBought) {
            if (coin === null) {
                coin = new Record({isBought: true, name, quantity, unitCost, totalCommission });
            }
    
            else {
                coin.totalCommission += totalCommission;
                const result = (coin.unitCost * coin.quantity) + (unitCost * quantity); 
                console.log(coin.quantity);
                console.log(quantity);
                coin.quantity += quantity;
                coin.unitCost = Math.round((result / coin.quantity) * 10000) / 10000;
            }
        }
        else {
            coin.totalCommission += totalCommission;
            coin.quantity -= quantity;
        }
        console.log(coin);
        await coin.save();
        res.json(coin);
    }
    catch(err) {
        console.log(err);
        res.status(400).json({ message: err.message });

    }    
}

export const updateRecord = async (req, res) => {
    const { id } = req.params;

    console.log({id});
    try {   
        // First find the record given by id
        let record = await Record.findById(id);
        if (record == null) {
            res.status(404).json({ message: 'Not able to find'});
        }
        const { name, unitCost, quantity, totalPrice, totalCommission, currentPrice} = req.body;
        
        if (name) {
            record.name = name;
        }
        
        if (quantity) {
            record.quantity = quantity;
            record.totalPrice = Math.round(100 * quantity * record.unitCost) / 100;
        }
        if (unitCost) {
            record.unitCost = unitCost;
            record.totalPrice = Math.round(100 * record.quantity * unitCost) / 100;
        }
        if (currentPrice) {
            record.currentPrice = currentPrice
            record.totalPrice = currentPrice * record.quantity;
        }
        if (totalPrice) {
            record.totalPrice = totalPrice;
        }
        if (totalCommission) {
            record.totalCommission = totalCommission;
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
