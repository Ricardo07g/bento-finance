import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"
import "./footer.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export default function Footer (props) 
{   
    return(
        <>
            <footer>
            <Container className="footer-class">
                <Row>
                    <Col></Col>
                </Row>
            </Container>
            </footer>
        </>
    )
}