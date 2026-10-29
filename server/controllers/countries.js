const Country = require('../models/Country')

async function index(req, res){
    try {
        countries = await Country.getAll()
        res.status(200).json(countries)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function show(req, res) {
    try {
        let name = req.params.name
        const country = await Country.getOneByCountryName(name)
        res.status(200).json(country)
    } catch(err) {
        res.status(404).json({ error: err.message })
    }
}

async function create(req, res) {
    try {
        const data = req.body
        const newCountry = await Country.create(data)

        res.status(201).json(newCountry)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

async function update(req, res) {
    const name = req.params.name.toLowerCase()
    try {
        const country = await Country.getOneByCountryName(name)
        const result = await country.update(req.body)
       
        res.status(200).send(result)
    } catch(err) {
        res.status(404).send({error: err.message})
    }
}

async function destroy(req, res) {
    try {
        const name = req.params.name
        const country = await Country.getOneByCountryName(name)
        const result = await country.destroy()
        res.status(204).end()
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = { index, show, create, update, destroy }