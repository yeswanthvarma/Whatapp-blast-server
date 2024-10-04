import mongoose, { Schema, Document, Model } from 'mongoose';
interface Campagin extends Document {
    id:number;
    campaign: string;
    template: string;
    heading: string;
    longText: string;
    image: Buffer, 
    imageType: String,
}
//Database Schema for Campagins
const CampaignSchema: Schema<Campagin> = new mongoose.Schema({
    id: { type: Number, required: true },
    campaign: { type: String, required: true },
    template: { type: String, required: true },
    heading: { type: String },
    longText: { type: String },
    image: { type: Buffer },
    imageType: {type:String},
});
// create a model from the CampaignList
const CampaignList: Model<Campagin> = mongoose.model<Campagin>('Campagin List', CampaignSchema);

export default CampaignList;