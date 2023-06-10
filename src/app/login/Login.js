import "bootstrap/dist/css/bootstrap.min.css"
import "./login.css"
import WebService from "../../components/webService"
import React, { useState } from "react"
import { useForm } from "react-hook-form";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import AuthService from "../../components/authService"

export default function  (props) 
{ 
  const Auth = new AuthService();
  Auth.VerifyAuthLoginPage();

  const navigate = useNavigate();
  let [exibeLoading,setExibeLoading] = useState(false);
  let [authMode, setAuthMode] = useState("signin")
  let [msg_validacao_formulario_email, setMsgValFormEmail] = useState("")
  let [msg_validacao_formulario_senha, setMsgValFormPass] = useState("")
  let [msg_validacao_formulario_first_name, setMsgValFormFirstName] = useState("")
  let [msg_validacao_formulario_last_name, setMsgValFormLastName] = useState("")

  let [show, setShowModal] = useState(false);
  let [msg_api_response, setMsgModal] = useState("");
  let handleClose = () => setShowModal(false);
  let handleShow = () => setShowModal(true);

  let clearForm = () => { 
    document.getElementById("form_auth").reset();
  }

  const changeAuthMode = () => {
    clearForm()
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) =>{

    if(authMode === "signin")
    {
      setExibeLoading(true)
      setMsgValFormEmail("")
      setMsgValFormPass("")
      
      let error = 0;
      let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

      switch(true)
      { 
        case (data.email === ""):
        { 
          setMsgValFormEmail("*Required")
          error++;
          break; 
        } 
        case (regex.test(data.email) === false):
        { 
          setMsgValFormEmail("*Invalid format")
          error++;
          break; 
        }
        case (data.password === ""):
        { 
          setMsgValFormPass("*Required")
          error++
          break; 
        } 
        default:
        { 
          break; 
        } 
      }

      if(error === 0)
      { 
        let request = null;

        try{

          let API = new WebService()
          let header = {}
          let payload = {"email": data.email , "password":data.password}
          request = await API.chamadaApi("POST", "user/login", payload, header)

        }catch (error){

          request = null

        }finally{

          if(typeof request.data.status != "undefined" && request.data.status === "success")
          { 
            let storage = {
              id: request.data.data.user.id,
              name: request.data.data.user.name,
              email: request.data.data.user.email,
              token: request.data.data.authorization.token
            }
            sessionStorage.setItem("Auth", JSON.stringify(storage))
            navigate("/home");
          }else if(typeof request.data.status != "undefined" && request.data.status === "error"){
            setMsgModal(request.data.message)
            setShowModal(true)
          }else{
            setMsgModal("Oops... Something went wrong, please try again later.")
            setShowModal(true)
          }

        }
      }

    }else if(authMode === "signup"){

      setMsgValFormEmail("")
      setMsgValFormPass("")
      setMsgValFormFirstName("")
      setMsgValFormLastName("")
      
      let error = 0;
      let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

      switch(true)
      { 
        case (data.first_name === ""):
        { 
          setMsgValFormFirstName("*Required")
          error++
          break; 
        } 
        case (data.last_name === ""):
        { 
          setMsgValFormLastName("*Required")
          error++
          break; 
        } 
        case (data.email === ""):
        { 
          setMsgValFormEmail("*Required")
          error++;
          break; 
        } 
        case (regex.test(data.email) === false):
        { 
          setMsgValFormEmail("*Invalid format")
          error++;
          break; 
        }
        case (data.password === ""):
        { 
          setMsgValFormPass("*Required")
          error++
          break; 
        }
        default:
        { 
          break; 
        } 
      }

      if(error === 0)
      { 
        let request = null;

        try{

          let API = new WebService()
          let header = {}
          let payload = {
            "first_name":data.first_name,
            "last_name":data.last_name,
            "email": data.email,
            "password":data.password
          }
          request = await API.chamadaApi("POST", "user/register", payload, header)

        }catch (error){

          request = null

        }finally{

          if(typeof request.data.status != "undefined" && request.data.status === "success")
          {
          

          }else if(typeof request.data.status != "undefined" && request.data.status === "error"){
            setMsgModal(request.data.message)
            setShowModal(true)
          }else{
            setMsgModal("Oops... Something went wrong, please try again later.")
            setShowModal(true)
          }

        }
      }
      
    }
    setExibeLoading(false)
    
  }

    if (authMode === "signin") {
      return (
        <>

        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "saturate(150%) blur(5px)",
            zIndex: "9999",
            display: exibeLoading ? "block" : "none",
          }}
        >
          <div
            className="spinner-border text-light"
            role="status"
            style={{
              position: "relative",
              top: "50%",
              left: "50%",
            }}
          >
          </div>
        </div>

          <div className="Auth-form-container">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="Auth-form"
            id="form_auth"
          >
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Welcome!</h3>
              <div className="text-center">
                Don't have a record?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Register
                </span>
              </div>
              <div className="form-group mt-3">
                <label>E-Mail</label>
                <input
                  {...register("email", { required: false, maxLength: 255 })}
                  id="email"
                  name="email"
                  type="email"
                  className="form-control mt-1" />
                <span id="validacao_formulario_email" className="validacao_formulario"> {msg_validacao_formulario_email} </span>
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  {...register("password", { required: false, maxLength: 255 })}
                  id="password"
                  name="password"
                  type="password"
                  className="form-control mt-1" />
              </div>
              <span id="validacao_formulario_senha" className="validacao_formulario"> {msg_validacao_formulario_senha} </span>

              <input type="hidden" name="action1" id="acion_login"  value="login" {...register("action1", { required: true })} />
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Enter
                </button>
              </div>
              <p className="text-center mt-2">
                Forgot your <a href="#">password?</a>
              </p>
            </div>
          </form>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {msg_api_response}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose} >Close</Button>
            </Modal.Footer>
          </Modal>
        </>
        
      )
    }

    return (
      <>    

        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "saturate(150%) blur(5px)",
            zIndex: "9999",
            display: this.state.exibeLoading ? "block" : "none",
          }}
        >
          <div
            class="spinner-border text-light"
            role="status"
            style={{
              position: "relative",
              top: "50%",
              left: "50%",
            }}
          >
            <span class="sr-only">Carregando...</span>
          </div>
        </div>

        <div className="Auth-form-container">
          <form 
            className="Auth-form"
            id="form_auth"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div 
                className="Auth-form-content"
            >
              <h3 className="Auth-form-title">Welcome!</h3>
              <div className="text-center">
                Already have registration?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                Access
                </span>
              </div>
              <div className="form-group mt-3">
                <label>First name</label>
                <input
                  {...register("first_name", { required: false, maxLength: 255 })}
                  id="first_name"
                  name="first_name"
                  type="text"
                  className="form-control mt-1"
                />
                <span id="validacao_formulario_first_name" className="validacao_formulario"> {msg_validacao_formulario_first_name} </span>
              </div>
              <div className="form-group mt-3">
                <label>Last name</label>
                <input
                  {...register("last_name", { required: false, maxLength: 600 })}
                  id="last_name"
                  name="last_name"
                  type="text"
                  className="form-control mt-1"
                />
                <span id="validacao_formulario_last_name" className="validacao_formulario"> {msg_validacao_formulario_last_name} </span>
              </div>
              <div className="form-group mt-3">
                <label>E-Mail</label>
                <input
                  {...register("email", { required: false, maxLength: 255 })}
                  id="email"
                  name="email"
                  type="email"
                  className="form-control mt-1"
                />
                <span id="validacao_formulario_email" className="validacao_formulario"> {msg_validacao_formulario_email} </span>
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  {...register("password", { required: false, maxLength: 255 })}
                  id="password"
                  name="password"
                  type="password"
                  className="form-control mt-1"
                />
                <span id="validacao_formulario_senha" className="validacao_formulario"> {msg_validacao_formulario_senha} </span>
              </div>
              <input type="hidden" name="action" id="acion_register" value="register" {...register("action", { required: true })} />
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Registrar
                </button>
              </div>
            </div>
          </form>
        </div>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {msg_api_response}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose} >Close</Button>
            </Modal.Footer>
          </Modal>
      </>
    )
}

