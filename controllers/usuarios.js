const { response, request } = require("express");
const body = request.body;
const Usuarios=require("../models/usuarios")

const usuariosGet=(req, res=response)=> {
    res.json({
        msg: 'get API-controlador'
    })
  };
  const usuariosPut=(req, res=response)=> {
    const{nombre, Email}=req.body;
    res.json({
        msg: 'put API-controlador',
        nombre,
        Email
    })
  };
  const usuariosPatch=(req, res=response)=> {
    const{nombre, Email}=req.body;
    res.json({
        msg: 'Patch API-controlador',
        nombre,
        Email
    })
  };
  const usuariosDelete=(req, res=response)=> {
    res.json({
        msg: 'delete API-controlador'
    })
  };
  const usuariosPost=async(req, res=response)=> {
    const usuario=new Usuarios(req.body);
    const {body}=req.body;
    await usuario.save();
    res.json({
        msg: 'post API-controlador',
        body
    })
  };

  module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosPost
  }