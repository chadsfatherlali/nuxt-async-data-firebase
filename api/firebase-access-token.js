const { google } = require('googleapis')
const serviceAccount = require('./../plugins/firebase/test-f4fec7a1f311.json')
const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/firebase.database"
]

const jwtClient = new google.auth.JWT(
    serviceAccount.client_email,
    null,
    serviceAccount.private_key,
    scopes
)

module.exports = function (req, res, next) {
    jwtClient.authorize((error, tokens) => {
        if (error) throw error
    
        req.adminAccessToken = tokens.access_token
        
        next()
    })
}



