const fs = require('fs');
const request = require('request');
const express = require('express');
const app = express();
var http = require('http');
const path = require('path');

//const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
//const ffmpeg = require('fluent-ffmpeg');
//ffmpeg.setFfmpegPath(ffmpegPath);

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


var counter = 0;

app.get('/:phone/:baht', function (req, res) {

 var phone = req.params.phone;
 var baht = req.params.baht;
 var parsed = parseFloat(baht, 10);
 
         const mobileNumber = phone
         const amount = parsed
         const payload = generatePayload(mobileNumber, { amount })

         QRCode.toFile("./images_qrcode/filename.png", payload , function (err) {
          if (err) throw err
         console.log("done"+parsed)
       res.end('ok')
         //res.sendFile(path.join(__dirname+'/index.html'));
         
      })
      //res.end('ok')
        



})

app.get('/qr', function (req, res) {
        var img = fs.readFileSync('./images_qrcode/filename.png');
        res.writeHead(200, {'Content-Type': 'image/png' });
        res.end(img, 'binary');
        console.log('filename.png');
        res.end('filename.png')

    })


