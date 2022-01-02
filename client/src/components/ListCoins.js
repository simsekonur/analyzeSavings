import { useCallback, useEffect, useState } from "react"
import { Table, Input, Button } from 'reactstrap';

import axios from "axios";
const ListCoins = () => {
    const [coins, setCoins] = useState([]);
    let [totalMoneyAllocated, setTotalMoneyAllocated] = useState(0);
    let [totalMoney, setTotalMoney] = useState(0);
    let [currentPrice, setCurrentPrice] = useState(0);

    const fetchCoins = useCallback(async () => {
        await axios.get('http://localhost:3001/records')
        .then((response) => {
            // console.log(response);
            setCoins(response.data);
            response.data.forEach((item) => {
                totalMoneyAllocated += item.totalPrice;
                totalMoney += item.currentTotalPrice;
            })
        })

        // console.log(coins);
    }, []);
    
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
                </tr>
                </thead>
                <tbody>
                {coins.map((coin, index) => {
                    return (
                        <tr>
                            <th scope="row">{index +1 }</th>
                            <td>{coin.name}</td>
                            <td>{coin.unitCost}</td>
                            <td>{coin.quantity}</td>
                            <td>
                                <Input type="number" step= "0.1" name="currentPrice" placeholder="Price" onChange={(e) => setCurrentPrice(e.target.value)}/>
                            </td>
                            <td>{coin.totalPrice}</td>
                            <td>{coin.totalCommission}</td>
                            <td>{coin.currentTotalPrice}</td>
                        </tr>

                    );
                })}
                </tbody>
            </Table>
            <Button> Submit to Database</Button>
        </div>
    )
}

export default ListCoins
