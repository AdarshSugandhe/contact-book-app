import express from 'express'
import { addContact, deleteContact, getAllContacts } from '../controller/contactController.js'

const contactRoute = express.Router()


contactRoute.post("/", addContact)
contactRoute.get("/", getAllContacts)
contactRoute.delete("/:id", deleteContact)


export default contactRoute