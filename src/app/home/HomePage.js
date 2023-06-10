/* IMPORTS CSS AND JS */
import "bootstrap/dist/css/bootstrap.min.css"
import "./home.css"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/* IMPORTS COMPONENTS*/
import React, { useState } from "react"
import WebService from "../../components/webService"
import AuthService from "../../components/authService"
import Template from "../../components/templates/template"
import { useNavigate } from "react-router-dom";



export default function (props) 
{   
    const Auth = new AuthService();
    Auth.VerifyAuth();

    return(
        <> 
        <Template>
            <Row>
                <Col>
                    1 of 1
                </Col>
                <Col>
                    2 of 2
                </Col>
            </Row>
        </Template>
        </>
    );
}