import React from "react"
import axios from "axios"

export default class WebService extends React.Component {
  
  constructor(args)
  {
    super(args)
  }

  async chamadaApi(metodo, funcao, payload, header)
  {
    let request = null

    request = await axios({
      method: metodo,
      url: "http://localhost:8000/api/" + funcao + "",
      data: payload,
      headers: header,
    })

    return request
  }
}
