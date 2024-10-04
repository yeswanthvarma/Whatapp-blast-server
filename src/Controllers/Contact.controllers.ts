import { Request, Response, NextFunction } from 'express';
import ContactList from '../models/Contact';
/*------------------------ Funtion to Handle to Fatch Contacts From DB ----------------------------*/
export const getContacts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await ContactList.find({});
        console.log("getting contacts");
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contacts", error });
    }
};
/*------------------------ Funtion to Handle to Fatch Contacts by ID From DB ----------------------------*/
export const getContactById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { mail } = req.params;
    try {
        const onedata = await ContactList.findOne({ mail });
        if (onedata) {
            res.status(200).json(onedata);
        } else {
            res.status(404).json({ message: "Contact not found" });
        }
        console.log("Fetching contact:", onedata);
    } catch (error) {
        res.status(500).json({ message: "Error fetching contact", error });
    }
};
/*------------------------ Funtion to Handle to Create Contacts in DB ----------------------------*/
export const createContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id, name, mail, phoneNumber } = req.body;
    console.log("Creating contact:", id, name, mail, phoneNumber);
    try {
        const newdata = new ContactList({ id, name, mail, phoneNumber });
        await newdata.save();
        res.status(201).json(newdata);
    } catch (error) {
        res.status(500).json({ message: "Error creating contact", error });
    }
};
/*------------------------ Funtion to Handle to Update Contacts in DB ----------------------------*/
export const updateContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params; 
    const { name, mail, phoneNumber } = req.body; 
    try {
      const updatedData = await ContactList.updateOne(
        { _id: id }, 
        { $set: { name, mail, phoneNumber } } 
      );
      if (updatedData.modifiedCount > 0) {
        res.status(200).json({ message: 'Contact updated successfully' });
      } else {
        res.status(404).json({ message: 'Contact not found or not updated' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating contact', error });
    }
  };
/*------------------------ Funtion to Handle to Delete Contacts in DB ----------------------------*/
export const deleteContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { _id } = req.params;
    try {
        const result = await ContactList.deleteOne({ _id });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Contact deleted successfully" });
        } else {
            res.status(404).json({ message: "Contact not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting contact", error });
    }
};

  