import React from "react"
import jwt_decode from "jwt-decode";

export default class AuthService extends React.Component
{

    constructor(args)
    {
      super(args)
    }

    async VerifyAuthLoginPage()
    {   
        let session = sessionStorage.getItem("Auth");

        if (typeof session !== "undefined" && session !== null && session != 'null')
        {   
            let storage = JSON.parse(sessionStorage.getItem("Auth"))
            let token_decoded = jwt_decode(storage.token);
            let today = new Date();
            let token_exp_date = new Date(token_decoded.exp * 1000);
    
            if(token_exp_date > today)
            {
              return window.location.href = "/home"
            }
        }
    }

    async VerifyAuth()
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

}