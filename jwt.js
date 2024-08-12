const jwt = require('jsonwebtoken')

// jwt : - Encoded    - Decoded 
//                       - Header 
//                       - Payload (data)
//                       - Verify Signature
//  Data + Secret + Sign() => Token 
//  Token + Secret + Verify() => Data

var data = { mark : 8 }
var token = jwt.sign(data, 'k123')
var data = jwt.verify(token,'k123')
console.log(token)
console.log(data)