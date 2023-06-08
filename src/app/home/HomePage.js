import "bootstrap/dist/css/bootstrap.min.css"
import "./home.css"
import React, { useState } from "react"
import WebService from "../../components/webService"
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

async function VerifyAuth()
{   
    let session = sessionStorage.getItem("Auth");

    if (typeof session !== "undefined" && session !== null && session != 'null')
    {   
        let storage = JSON.parse(sessionStorage.getItem("Auth"))
        let token_decoded = jwt_decode(storage.token);
    
      if (storage == null)
      {
        return window.location.href = "/"

      }else{
        let today = new Date();
        let token_exp_date = new Date(token_decoded.exp * 1000);

        if(today > token_exp_date)
        {
            sessionStorage.setItem("Auth", null)
            return window.location.href = "/"
        }
      }

    }else{     
        return window.location.href = "/"
    }
}

export default function (props) 
{   
    VerifyAuth();
    
    return(
        <>
            <h1> home </h1>
        </>
    );
}