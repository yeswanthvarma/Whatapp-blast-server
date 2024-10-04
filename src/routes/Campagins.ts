import { Router } from 'express';
import multer from 'multer';
import { getCampaigns, createCampaign } from '../Controllers/Campagin.controllers';

const router = Router();
const storage = multer.memoryStorage();  
const upload = multer({ storage });

/*------------------------ Route for sending Campagin list to Clint ----------------------------*/
router.get('/', getCampaigns);
/*------------------------ Route for Create Campagin in DB ----------------------------*/
router.post('/create', upload.single('image'), createCampaign);

export default router;
