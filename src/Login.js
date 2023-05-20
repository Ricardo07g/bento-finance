import React, { useState } from "react"

export default function (props) {
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Bem vindo!</h3>
            <div className="text-center">
              Não possui acesso?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Registrar
              </span>
            </div>
            <div className="form-group mt-3">
              <label>E-Mail</label>
              <input
                type="email"
                className="form-control mt-1"
              />
            </div>
            <div className="form-group mt-3">
              <label>Senha</label>
              <input
                type="password"
                className="form-control mt-1"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Entrar
              </button>
            </div>
            <p className="text-center mt-2">
              Esqueceu sua <a href="#">senha?</a>
            </p>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Bem Vindo!</h3>
          <div className="text-center">
            Possui Cadastro? Realizar{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              acesso
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Nome Completo</label>
            <input
              type="email"
              className="form-control mt-1"
            />
          </div>
          <div className="form-group mt-3">
            <label>E-Mail</label>
            <input
              type="email"
              className="form-control mt-1"
            />
          </div>
          <div className="form-group mt-3">
            <label>Senha</label>
            <input
              type="password"
              className="form-control mt-1"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}