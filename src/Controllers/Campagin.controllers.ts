import { Request, Response, NextFunction } from 'express';
import CampaignList from '../models/Campagin';  // Adjust the path if needed
import { HadindTextTemplate, sendImageAndTextMessage, sendHelloWorldTemplate, sendTextMessage, sendWhatappMassage } from '../utlis/whatsappService';

interface MulterRequest extends Request {
    file?: Express.Multer.File;
}
/*------------------------ Funtion to Handle to Fatch Campagins From DB ----------------------------*/
export const getCampaigns = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data = await CampaignList.find({});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching campaigns", error });
    }
};
/*------------------------ Funtion to Handle Create Campagin in DB ----------------------------*/
export const createCampaign = async (req: MulterRequest, res: Response, next: NextFunction): Promise<void> => {
    const { campaign, template, heading, longText } = req.body;
    const id = Math.floor(1000 + Math.random() * 9000);

    try {
        const newdata = new CampaignList({
            id,
            campaign,
            template,
            heading,
            longText,
            image: req.file?.buffer,  
            imageType: req.file?.mimetype  
        });

        const savedData: any = await newdata.save();
        res.status(201).json(savedData);
        await sendWhatappMassage(template, longText);
    } catch (error) {
        res.status(500).json({ message: 'Error creating campaign', error });
    }
};


