const request = require('request');
const express = require('express');
const app = express();
const QRCode = require("qrcode")
const generatePayload = require("promptpay-qr")
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function() {
        console.log('running on port', app.get('port'))
    })
    
app.get('/', function (req, res) {
        res.end('by...Lik Bilan')
    })

app.get('/:phone/:baht', function (req, res) {

 var phone = req.params.phone;
 var baht = req.params.baht || 0;
 var parsed = parseFloat(baht, 10);
 
         const mobileNumber = phone
         const amount = parsed
         const payload = generatePayload(mobileNumber, { amount })
  
console.log("payload   "+payload)

QRCode.toDataURL(payload, function (err, url) {
    let data = url.replace(/.*,/,'')
        let img = new Buffer(data,'base64')
        res.writeHead(200,{
            'Content-Type' : 'image/png',
            'Content-Length' : img.length
        })
        res.end(img)
  //console.log(url)
 })

})
