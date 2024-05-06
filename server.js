const { ok } = require("assert")
const express = require("express")
const productRouter = require("./products")
const NotFoundError = require("./NotFoundError")


const server = express()

server.use(express.json())

server.use(((req, res, next) => {
    console.log("time: " + new Date().toISOString())
    next()
}))

server.use(productRouter)

module.exports = server

//mid de erro
server.use((err, req, res, next) => {
    console.log(">>>>>>" + err)
    next(err)
})

//mid de erro
server.use((err, req, res, next) => {
    if (err instanceof NotFoundError) return res.status(404).json({ message: err.message })
    res.status(500).json({ message: "Internal server Error" })
})