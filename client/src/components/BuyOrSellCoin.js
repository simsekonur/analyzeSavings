import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Container, Row, Col } from 'reactstrap';

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
    return (
        <div style={{ textAlign: 'center'}}>
            <h1 style={{ color: 'red'}}> Add or sell the coin</h1>
            <div style={mainStyle}>
                <Container>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleSelect">Buy or Sell</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Buy</option>
                                        <option>Sell</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Current Bnb Price</Label>
                                    <Input type="number" step="0.01" name="bnbPrice" placeholder="Current bnb price" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Name</Label>
                                    <Input type="text" name="name" placeholder="Name" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Unit Cost</Label>
                                    <Input type="number" step= "0.1" name="unitCost" placeholder="Unit cost" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="exampleEmail">Quantity</Label>
                                    <Input type="number" step= "0.1" name="quantity" placeholder="Quantity" />
                                </FormGroup>
                            </Col>
                        </Row>

                        <FormGroup>
                            <Label for="exampleEmail">Commission</Label>
                            <Input type="number" step="0.00001" name="bnbPrice" placeholder="Commission" />
                        </FormGroup>

                        <Button>Submit</Button>
                    </Form>
                </Container>
            </div>
        </div>
      );
}

export default BuyOrSellCoin


