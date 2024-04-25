import express from "express";
import cors from "cors";
// const app = express();
import { app, server } from './socket/socket.js';
import path from "path";
import "dotenv/config.js"
import cookieParser from "cookie-parser";
import passport from './config/passport.js';

passport(app);
import keys from './config/keys.js';
const port = keys.port

app.use(cookieParser());
app.use(express.json());
app.use(express.json({ limit: "25mb" }));
app.use(cors())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/failed", (req, res) => {
    res.send("Failed")
})
app.get("/success", (req, res) => {
    res.send(`Welcome`)
})

import authRoutes from "./routes/auth.routes.js";
import passportRoutes from "./routes/passport.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import productsRoutes from "./routes/products.routes.js";
import storeRoutes from "./routes/store.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import testimonialRoutes from './routes/testimonial.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import recommendationsRoutes from './routes/recommendations.routes.js';

app.use("/api/auth", authRoutes);
app.use('/api/passport', passportRoutes)
app.use("/api/booking", bookingRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/recommendations", recommendationsRoutes);

// Connect to MongoDB
import { ConnectToMongoDB } from "./db/ConnectToMongoDB.js";

// const db = connectToMongoDB.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// app.get("/", async (req, res) => {
//     res.send("server running")
//     // const clientURL = req.headers.host
//     // if (clientURL.includes('localhost')) {
//     //     console.log('react')
//     // }
//     // else {
//     //     console.log('fluter')
//     // }
//     // res.render("index", { email: 'verify.email', status: "verified" });
// });

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilio_phone_number = process.env.TWILIO_PHONE_NUMBER
// app.post('/send-sms', async (req, res) => {
//     try {
//         // const { phoneNumber } = req.body
//         const client = require('twilio')(accountSid, authToken);
//         const message = 'Welcome to Chillz! Your verification code is 54875';
//         const smsOptions = {
//             body: message,
//             from: `${twilio_phone_number}`,
//             to: '01010055443'
//         };
//         client.messages
//             .create({
//                 body: message,
//                 from: `${twilio_phone_number}`,
//                 to: '01010055443'
//             })
//             .then(message => console.log(message.sid))
//             .catch(error => console.log(error))

//         // res.send({ phoneNumber: phoneNumber })
//     } catch (error) {
//         res.send(error)
//     }
// })




// Define routes and middleware
// app.listen(port, () => {
//     ConnectToMongoDB();
//     // server.timeout = 30000;
//     // console.log(`${chalk.blue(`Server running on port ${port}`)}`)
//     console.log(`Server running on port ${port}`);
// });

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get("*", (req, res) => {
    // res.send('res')
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})
server.listen(port, () => {
    ConnectToMongoDB();
    console.log(`Server running on port ${port}`);
});
// import { Analytics } from "@vercel/analytics/react"