const express = require("express")
const router = express.Router()
const NotFoundError = require("./NotFoundError")

//ARRAY COMO NAO TEM BANCO DE DADOS
let products = [
    { id: 1, name: "Ps5", price: 5000 },
    { id: 2, name: "Xbox", price: 3000 },
    { id: 3, name: "switch", price: 2299.89 }
]

const withAuth = (req, res, next) => {
    const auth = req.headers.authorization
    if (auth === "token valido") return next()
    res.status(401).send()
}

router.get("/products", (req, res) => {
    res.json({
        products
    })
})

router.post("/products", withAuth, (req, res) => {
    const product = req.body
    product.id = products.length + 1
    products.push(product)
    res.json({ status: "ok" })
})

router.put("/products/:id", (req, res) => {
    const id = Number(req.params.id)
    const product = products.find(product => {
        return (product.id === id)
    })
    if(!product) throw new NotFoundError("product")
    product.name = req.body.name
    product.price = req.body.price
    res.json({ status: "ok" })
})


router.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id)
    products = products.filter((product) => {
        return product.id !== id
    })
    res.json({ status: "ok" })
})

module.exports = router