import mongoose, { Schema, Document, Model } from 'mongoose';
interface ContactsInterface extends Document {
  name: string;
  phoneNumber: number;
  mail: string;
}
//Database Schema for Contacts
const Contacts: Schema<ContactsInterface> = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  mail: { type: String, required: true }
});
// Create a model from the Contacts
const ContactList: Model<ContactsInterface> = mongoose.model<ContactsInterface>('ContactList', Contacts);
export default ContactList;
