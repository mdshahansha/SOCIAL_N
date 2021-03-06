const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
});



const development = {
    name: 'development',
    asset_path: './public/assets',
    session_cookie_key: 'HAZPg2fgcfaSDszCQ1wbsRJzu7f0qnfF',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ggaappuu1234@gmail.com',
            pass: 'yssiimkivqvtgkhu'
        }
    },
    google_client_id: "483664659064-cge6jjonns13q1uhfvqid6v5pf9lcfoj.apps.googleusercontent.com",
    google_client_secret: "JC3Sr2P9YrBa6mE-FOBHrEjv",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'EqUBlhIIvjdRNQKH2XZuGO4X5DNdOJ1z',
    morgan: {
        mode: 'dev',
        options: { stream: accessLogStream }
    }
}


const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_RURL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream }
    }
}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);
// module.exports=development;

/*
export CODEIAL_ENVIROMENT="production"
export CODEIAL_ASSETS_PATH="./public/assets"
export CODEIAL_SESSION_COOKIE_KEY="HAZPg2fgcfaSDszCQ1wbsRJzu7f0qnfF"
export CODEIAL_DB="codeial_production"
export CODEIAL_GOOGLE_CLIENT_ID="483664659064-cge6jjonns13q1uhfvqid6v5pf9lcfoj.apps.googleusercontent.com"
export CODEIAL_GOOGLE_CALLBACK_SECRET="JC3Sr2P9YrBa6mE-FOBHrEjv"
export CODEIAL_GOOGLE_CALLBACK_URL="http://localhost:8000/users/auth/google/callback"
export CODEIAL_GMAIL_USERNAME="ggaappuu1234@gmail.com"
export CODEIAL_GMAIL_PASSWORD="yssiimkivqvtgkhu"
export CODEIAL_JWT_SECRET="EqUBlhIIvjdRNQKH2XZuGO4X5DNdOJ1z"

*/ 


// JSON part ddeployment
// "prod_start":" NODE_ENV=production nodemon index.js"