const express = require('express')
const router = require('express').Router()
const ctrlAuth = require('../controllers/auth')


router.get('/Profile', ctrlAuth.list) // muestra el listado de usuarios
router.get('/Profile/:id', ctrlAuth.profile) // muestra el usuario
router.put('/Profile/:id', ctrlAuth.profile); // actualiza el usuario
router.delete('/Profile/:id', ctrlAuth.delete) // elimina el usuario
router.post("/Register", ctrlAuth.register); // Registra el usuario

router.post('/Login', ctrlAuth.login) // proceddimiento de Login
router.get('/Prueba', ctrlAuth.prueba)


module.exports = router