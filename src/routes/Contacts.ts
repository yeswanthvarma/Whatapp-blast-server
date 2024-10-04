import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../Controllers/Contact.controllers";

const app = express();
const Router = express.Router();
app.use(bodyParser.json());

/*------------------- Route for sending Contacts list to Clint -----------------------*/
Router.get('/', getContacts);
/*------------------- Route for sending Contacts by ID to Clint ----------------------*/
Router.get('/:mail', getContactById);
/*------------------------ Route for Create Contacts in DB ----------------------------*/
Router.post('/create', createContact);
/*------------------------ Route for delete Contacts  in DB ----------------------------*/
Router.delete('/delete/:_id', deleteContact);
/*------------------------ Route for Update Contacts  in DB ----------------------------*/
Router.put('/update/:id', updateContact);

export default Router;

