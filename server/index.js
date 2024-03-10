const express = require("express");
const cors = require("cors");
const app = express();
// const { app, server } = require('./socket/socket.js');
// const path = require("path");
require('dotenv').config()
const cookieParser = require("cookie-parser");
require('./config/passport')(app);
const { port } = require('./config/keys.js');
const chalk = require("chalk");

// app.options('', cors(
//     {
//         origin: '*',
//         // origin: ['https://mern-lava-server.vercel.app'],
//         methods: ['POST', 'GET', 'PUT', 'DELETE'],
//         credentials: true
//     }
// ));
// app.use(cors(
//     {
//         origin: ['https://mern-lava-server.vercel.app'],
//         methods: ['POST', 'GET', 'PUT', 'DELETE'],
//         credentials: true
//     }
// ));

// httpProxy = require('http-proxy');
// const proxy = httpProxy.createProxyServer({
//     target: 'https://mern-lava-client.vercel.app',
//     ws: true, // Enable WebSocket support
// });


// const __dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());
app.use(express.json({ limit: "25mb" }));
// let corsOptions = {
//     origin: ["http://localhost:5000", "https://mern-lava-server.vercel.app"],
// methods: ['POST', 'GET', 'PUT', 'DELETE'],
// credentials: true
// };
// app.use(cors(corsOptions));
app.use(cors())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/failed", (req, res) => {
    res.send("Failed")
})
app.get("/success", (req, res) => {
    res.send(`Welcome`)
})

const authRoutes = require("./routes/auth.routes");
const passportRoutes = require("./routes/passport.routes.js");
const bookingRoutes = require("./routes/booking.routes");
const productsRoutes = require("./routes/products.routes");
const storeRoutes = require("./routes/store.routes");
const chatRoutes = require("./routes/chat.routes");
const testimonialRoutes = require('./routes/testimonial.routes')
const notificationRoutes = require('./routes/notification.routes.js')

app.use("/api/auth", authRoutes);
app.use('/api/passport', passportRoutes)
app.use("/api/booking", bookingRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/testimonial", testimonialRoutes);
app.use("/api/notification", notificationRoutes);

// Connect to MongoDB
const connectToMongoDB = require("./db/ConnectToMongoDB.js");

// const db = connectToMongoDB.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

app.get("/", async (req, res) => {
    res.send("server running")
    // const clientURL = req.headers.host
    // if (clientURL.includes('localhost')) {
    //     console.log('react')
    // }
    // else {
    //     console.log('fluter')
    // }
    // res.render("index", { email: 'verify.email', status: "verified" });
});

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
app.listen(port, () => {
    connectToMongoDB();
    // server.timeout = 30000;
    // console.log(`${chalk.blue(`Server running on port ${port}`)}`)
    console.log(`Server running on port ${port}`);
});

// __dirname = path.resolve();

// app.use(express.static(path.join(__dirname, '/client/dist')));
// app.get("*", (req, res) => {
//     // res.send('res')
//     res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })
// server.listen(port, () => {
//     connectToMongoDB();
//     console.log(`Server running on port ${port}`);
// });
// import { Analytics } from "@vercel/analytics/react"