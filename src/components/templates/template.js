import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState } from "react"
import Header from "./header/header"
import Footer from "./footer/footer"
import Container from 'react-bootstrap/Container';

export default function Template (props) 
{   
    return(
        <>
        <html>
            <Header/>
            <body>
                <Container fluid >
                {}
                </Container>
            </body>
            <Footer/>
        </html>
        </>
    )
}