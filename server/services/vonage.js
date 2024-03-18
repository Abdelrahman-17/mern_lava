import { Vonage } from '@vonage/server-sdk';
// const template = require('../config/template');
import keys from '../config/keys';
import { default as axios } from 'axios';

const { Key, apisecret, sender } = keys.vonage;

class VonageService {
    init() {
        try {
            return new Vonage({
                apiKey: Key,
                apiSecret: apisecret
            })
        }
        catch (error) {
            console.warn('Missing vonage keys');
        }
    }
}
const vonage = new VonageService().init();

export async function sendSMS(phone, type, host, data) {
    try {
        // const message = prepareTemplate(type, host, data);
        const message = 'A text message sent using the Vonage SMS API'
        const config = {
            from: ` LAVA! ${sender}`,
            to: phone,
            text: message,
        };
        return await vonage.sms.send(config)
        // return await mailgun.messages().send(config);
    } catch (error) {
        return error;
    }
}
async function send() {

    await axios.post(
        'https://messages-sandbox.nexmo.com/v1/messages',
        // '{\n    "from": "14157386102",\n    "to": "$TO_NUMBER",\n    "message_type": "text",\n    "text": "This is a WhatsApp Message sent from the Messages API",\n    "channel": "whatsapp"\n  }',
        {
            'from': '14157386102',
            'to': '201010055884',
            'message_type': 'text',
            'text': 'This is a WhatsApp Message sent from the Messages API',
            'channel': 'whatsapp'
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            auth: {
                username: Key,
                password: apisecret
            }
        }
    );
}
send()