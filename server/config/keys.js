export default {
    app: {
        name: 'Mern-Lava',
        apiURL: process.env.BASE_API_URL,
        clientURL: process.env.CLIENT_URL,
        // dd: window.location.host.includes('localhost') ? process.env.REACT_CLIENT_URL : process.env.FLUTTER_CLIENT_URL
        // appname: [window.location.hostname]
    },
    port: process.env.PORT,
    database: {
        url: process.env.MONGO_URI
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        tokenLife: '15d'
    },
    mailchimp: {
        key: process.env.MAILCHIMP_KEY,
        listKey: process.env.MAILCHIMP_LIST_KEY
    }
    ,
    vonage: {
        Key: process.env.VONAGE_APPLICATION_API_KEY,
        apisecret: process.env.VONAGE_APPLICATION_API_SECRET,
        sender: process.env.VONAGE_APPLICATION_SENDER

    },
    nodemailer: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        mail: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
        UVTS: process.env.USER_VERIFICATION_TOKEN_SECRET
    },
    mailgun: {
        key: process.env.MAILGUN_KEY,
        domain: process.env.MAILGUN_DOMAIN,
        sender: process.env.MAILGUN_EMAIL_SENDER
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    facebook: {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    },
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        bucketName: process.env.AWS_BUCKET_NAME
    }
};
// if (window.location.host.includes('local')) {
//     console.log('hh');
// }
