import axios from 'axios';
import ContactList from '../models/Contact';
require('dotenv').config();
/*------------------------------ Constants for URL and Headerss for Whatapp Api --------------------------------*/
const WHATSAPP_API_URL = `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONENUMBER_ID}/messages`;
const WHATSAPP_HEADERS = {
    'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
    'Content-Type': 'application/json'
};
/*------------------------------ Interface for SendMessageResponse --------------------------------*/
interface SendMessageResponse {
    messaging_product: string;
    contacts: Array<{ input: string; wa_id: string }>;
    messages: Array<{ id: string }>;
}
/*------------------------------ Function to send WhatsApp Messages based on Template type --------------------------------*/
export async function sendWhatappMassage(template: string, text:string): Promise<void> {
    try {
        const contactData = await ContactList.find({});
        if (!contactData.length) {
            console.log('No contacts found.');
            return;
        }
        for (const contact of contactData) {
            switch (template) {
                case 'hello_world':
                    await sendHelloWorldTemplate(contact.phoneNumber);
                    break;

                case 'heading_text':
                    await HadindTextTemplate(contact.phoneNumber);
                    break;

                case 'text':
                    await sendTextMessage(contact.phoneNumber, text);
                    break;

                case 'image_text':
                    await sendImageAndTextMessage(contact.phoneNumber, text);
                    break;

                default:
                    console.log('No matching template found',template);
            }
        }
    } catch (error) {
        console.error('Error processing contacts:', error);
    }
}
/*------------------------------ Function to send Hello World template message --------------------------------*/
export async function sendHelloWorldTemplate(phoneNumber: Number): Promise<void> {
    try {
        const response = await axios({
            url: WHATSAPP_API_URL,
            method: 'post',
            headers:WHATSAPP_HEADERS,
            data: {
                messaging_product: 'whatsapp',
                to: phoneNumber,
                type: 'template',
                template: {
                    name: 'hello_world',
                    language: {
                        code: 'en_US',
                    },
                },
            },
        });

        const responseData: SendMessageResponse = response.data;
        console.log('Template message sent successfully:', responseData);
    } catch (error) {
        handleAxiosError(error, 'sending hello_world template');
    }
}
/*------------------------------ Function to send a text message --------------------------------*/
export async function sendTextMessage(phoneNumber: Number, text: string): Promise<void> {
    try {
        const response = await axios({
            url: WHATSAPP_API_URL,
            method: 'post',
            headers:WHATSAPP_HEADERS,
            data: JSON.stringify({
                messaging_product: 'whatsapp',
                to: phoneNumber,
                type: 'text',
                text: {
                    preview_url: false,
                    body: "hiii this yeswanth"
                }
            })
        });
        console.log('Text message response:', response.data);
    } catch (error) {
        handleAxiosError(error, 'sending text message');
    }
}
/*------------------------------ Function to send image and text message --------------------------------*/
export async function sendImageAndTextMessage(phoneNumber: Number, text: string): Promise<void> {
    try {
        const response = await axios({
            url: WHATSAPP_API_URL,
            method: 'post',
            headers: WHATSAPP_HEADERS,
            data: JSON.stringify({
                messaging_product: 'whatsapp',
                to: phoneNumber,
                type: 'image',
                image: {
                    link: "https://fastly.picsum.photos/id/0/536/354.jpg?hmac=pYva7VotLDyw33JFwZdFMkf5Egtdk2Z6p7Rr8nO6ngs",
                    caption: text
                }
            })
        });
        console.log('Image message response:', response.data);
    } catch (error) {
        handleAxiosError(error, 'sending image message');
    }
}
/*------------------------------ Function to send a template with heading and text --------------------------------*/
export async function HadindTextTemplate(phoneNumber: Number): Promise<void> {
    try {
        const response = await axios({
            url: WHATSAPP_API_URL,
            method: 'post',
            headers: WHATSAPP_HEADERS,
            data: JSON.stringify({
                messaging_product: 'whatsapp',
                to: phoneNumber,
                type: 'template',
                template: {
                    name: 'headingtext',
                    language: { code: 'en_US' },
                    components: [
                        {
                            type: 'header',
                            parameters: [
                                {
                                    type: 'text',
                                    text: 'yeswanth'
                                }
                            ]
                        },
                        {
                            type: 'body',
                            parameters: [
                                {
                                    type: 'text',
                                    text: 'whatsapp blast'
                                }
                            ]
                        }
                    ]
                }
            })
        });
        console.log('Heading and text template response:', response.data);
    } catch (error) {
        handleAxiosError(error, 'sending heading template');
    }
}
/*------------------------------ Helper function to handle Axios errors --------------------------------*/

function handleAxiosError(error: unknown, action: string): void {
    if (axios.isAxiosError(error)) {
        console.error(`Error ${action}:`, error.response?.data || error.message);
    } else {
        console.error(`Unexpected error ${action}:`, error);
    }
}
