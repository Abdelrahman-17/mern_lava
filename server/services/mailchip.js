import Mailchimp from 'mailchimp-api-v3';

import keys from '../config/keys';

const { key, listKey } = keys.mailchimp;

class MailchimpService {
    init() {
        try {
            return new Mailchimp(key);
        } catch (error) {
            console.warn('Missing mailgun keys');
        }
    }
}

const mailchimp = new MailchimpService().init();

export async function subscribeToNewsletter(email) {
    try {
        return await mailchimp.post(`lists/${listKey}/members`, {
            email_address: email,
            status: 'subscribed'
        });
    } catch (error) {
        return error;
    }
}
