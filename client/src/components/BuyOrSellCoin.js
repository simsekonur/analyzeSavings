import React, { useCallback, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

import axios from 'axios';
const mainStyle = {
    border: '2px solid #d3d3d3', 
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    marginBottom: '1em',
    borderRadius: '.5em',
    textAlign: 'left',
    padding: '1em',
    width: '600px',
}

const BuyOrSellCoin = () => {

    // component based states
    const [isBuy, setBuy] = useState('Buy');    
    const [name, setName] = useState('');
    const [nameChecked, setNameChecked] = useState(true);    
    const [quantity, setQuantity] = useState(0);
    const [bnbPrice, setBnbPrice] = useState(0);    

    const [commission, setCommission] = useState(0);
    const [unitCost, setUnitCost] = useState(0)    

    const postCoin = useCallback(async (data) => {
        await axios.post('http://localhost:3001/records', data);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({isBuy, name, quantity, bnbPrice, unitCost, commission});
        const isBought = isBuy === 'Buy' ? true : false;

        const totalCommission = bnbPrice * commission;
        console.log({ isBought, totalCommission});

        if (name === '' || quantity === 0 || unitCost === 0) {
            alert('Write all of them!');
            return 
        }

        // do some conversion 
        const quantityFloat = parseFloat(quantity);
        const unitCostFloat = parseFloat(unitCost);
        // send a request to the api end point
        const response = postCoin({isBought, name, quantity: quantityFloat, unitCost: unitCostFloat, totalCommission});
        console.log(response);
        // clear some fields up
        !nameChecked && setName(''); 

    }
    return (
        <div style={{ textAlign: 'center'}}>
            <h1 style={{ color: 'red'}}> Buy or sell the coin</h1>
            <div style={mainStyle}>
                <Container>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect">Buy or Sell</Label>
                                    <Input type="select" name="buyOrSell" value={isBuy} onChange={(e) => { console.log(e.target.value); setBuy(e.target.value)}}>
                                        <option>Buy</option>
                                        <option>Sell</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Current Bnb Price</Label>
                                    <Input type="number"
                                    value={bnbPrice}
                                    onChange={(e) => setBnbPrice(e.target.value)}
                                    step="0.01"
                                    name="bnbPrice"
                                    placeholder="Current bnb price" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label for="exampleEmail">Name</Label>
                            <Input type="text"
                                name="name" 
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                />
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Unit Cost</Label>
                                    <Input type="number" step= "0.1" name="unitCost" value= {unitCost} 
                                    onChange={(e) => setUnitCost(e.target.value) } placeholder="Unit cost" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Quantity</Label>
                                    <Input type="number" step= "0.1" name="quantity" placeholder="Quantity"
                                    value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup>
                                <Label for="exampleEmail">Commission</Label>
                                <Input type="number" step="0.00001" name="bnbPrice" placeholder="Commission"
                                value={ commission} onChange={(e) => setCommission(e.target.value)}/>
                            </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Input type="checkbox" name="nameChecked" checked={nameChecked}
                            value={ nameChecked} onChange={(e) => setNameChecked(!nameChecked)}/>
                            <Label>Name will be the same</Label>
                        </FormGroup>
                        
                        <Button type='submit'> Submit </Button>
                    </Form>
                </Container>
            </div>
        </div>
      );
}

export default BuyOrSellCoin


