import { useCallback, useEffect, useState } from "react"
import { Table, Input, Button } from 'reactstrap';

import axios from "axios";
const ListCoins = () => {
    const [coins, setCoins] = useState([]);
    let [currentPrice, setCurrentPrice] = useState(0);

    const fetchCoins = useCallback(async () => {
        await axios.get('http://localhost:3001/records')
        .then((response) => {
            // console.log(response);
            setCoins(response.data);
        })

        // console.log(coins);
    }, []);

    const updateCoin = useCallback(async (id) => {
        await axios.post(`http://localhost:3001/records/${id}`, { currentPrice });
        fetchCoins();
    }, [currentPrice, fetchCoins]);
    
    useEffect(() => {
        fetchCoins();
    }, [fetchCoins])
    
    return (
        <div>
            <Table responsive striped >
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Unit Cost</th>
                    <th>Quantity</th>
                    <th>Current Price</th>
                    <th>Total Allocated</th>
                    <th>Total Price</th>
                    <th>Total Commision</th>
                    <th>Update</th>
                </tr>
                </thead>
                <tbody>
                {coins.map((coin, index) => {
                    return (
                        <tr key={index}>
                            <th scope="row">{index +1 }</th>
                            <td>{coin.name}</td>
                            <td>{coin.unitCost}</td>
                            <td>{coin.quantity}</td>
                            <td>
                                <Input type="number" 
                                    value={currentPrice} 
                                    step= "0.00001" 
                                    name="currentPrice" 
                                    placeholder="Price" 
                                    onChange={(e) => setCurrentPrice(e.target.value)}
                                />
                            </td>
                            <td>{Math.round(coin.unitCost * coin.quantity*100) / 100}</td>
                            <td>{coin.totalPrice}</td>
                            <td>{Math.round(coin.totalCommission * 100) / 100}</td>
                            <td> <Button onClick={() => updateCoin(coin._id)}> Save </Button> </td>
                        </tr>

                    );
                })}
                </tbody>
            </Table>
        </div>
    )
}

export default ListCoins
