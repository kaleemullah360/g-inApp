var iap = require('in-app-purchase');
var fs = require('fs');
var fixedPath = process.cwd() + '/public';
var fixedPkPath = process.cwd() + '/public/ ';

var path = process.argv[process.argv.length - 2].replace('--path=', '');
var pkPath = process.argv[process.argv.length - 1].replace('--pk=', '');

if (path === 'false') {
    path = fixedPath;
}
if (pkPath === 'false') {
    pkPath = fixedPkPath;
}

var publicKeySandboxString = 'jANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy2GRvr7WrRXpQnE9U2YvWxcdbgsug+qrEX1FGGHmFEi/ToeUX9gknxd5fnPHTjb+0+sDiRv2YoGAWWoWwOnKxTDRqc0aOsUgwKG3kNQ6RBU8Z4Pc63wta4pCz0dhK9H3W5qkq6Brhx18+v+mm3gDZ4nBcSAxDnA4O/pjRyrUXIm7FerY3NQA9YxeKR0M/0xGJOcAJLHrAPN4ozGfJ1sNF7zSz8toFYIWbLy1cCUab0V4v3mxu9BFLgyo0tid6WusGQ3X4IKv989rBj+g2Jeg076As9rJH7otfHJlEnIdXvhfm7uE1dJZKJrjr5nGc1MizMDTcX5oDbxfageodlZoewIDAQAB';
var publicKeyLiveString = 'jANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy2GRvr7WrRXpQnE9U2YvWxcdbgsug+qrEX1FGGHmFEi/ToeUX9gknxd5fnPHTjb+0+sDiRv2YoGAWWoWwOnKxTDRqc0aOsUgwKG3kNQ6RBU8Z4Pc63wta4pCz0dhK9H3W5qkq6Brhx18+v+mm3gDZ4nBcSAxDnA4O/pjRyrUXIm7FerY3NQA9YxeKR0M/0xGJOcAJLHrAPN4ozGfJ1sNF7zSz8toFYIWbLy1cCUab0V4v3mxu9BFLgyo0tid6WusGQ3X4IKv989rBj+g2Jeg076As9rJH7otfHJlEnIdXvhfm7uE1dJZKJrjr5nGc1MizMDTcX5oDbxfageodlZoewIDAQAB';

iap.config({
            verbose: true,
googlePublicKeyStrSandbox: publicKeySandboxString,
googlePublicKeyStrLive: publicKeyLiveString
});

iap.setup(function (error) {
    if (error) {
        return console.error('something went wrong...');
    }

    var googleReceipt = JSON.parse('{  "data": {     "orderId": "7950735874880703741.9176667068298051",     "packageName": "com.stc.hapicami",     "productId": "com.stc.hapicami.life_3",     "purchaseTime": 1464695120669,     "purchaseState": 0,     "developerPayload": "351",     "purchaseToken": "oofmvnfsnosqruetelwckxvc"   },   "signature": "zwW5sHJQRZ812Y+QiqvGGww82SLj4lAWpl7kodOXY5yIbj7aC9jc7g770PrEBXZJkpvzkJsjTaomp7IhakfHqhihaQncaero2iKjDJUkq5ET0z68GEf5A9Myti/eCtZKRAVFOzgp9K1So1SK67kXhiD8cVmun1ayPyTEWPHvXTcIebHhlEXz24FSSGh62paIvFVP8hWquxyQgjqWZ09DbxFjIxML23PORyA7sjgSBYfi/g/p6XVBr/63eNqLqXXkRJX/TNtioKHY/DXU4ohW3f2AnEYrnkUjWGB5y6mS83w1/8Fu5rMadDoPZhA=" }');
       /*
        google receipt must be provided as an object
        {
            "data": "{stringified data object}",
            "signature": "signature from google"
        }
    */
    // iap is ready
    iap.validate(iap.GOOGLE, googleReceipt, function (err, googleRes) {
        if (err) {
            console.log("\n\n\n\n\n");
            //return console.error(err);
        }
        if (iap.isValidated(googleRes)) {

            // yay good!
        }
    });
});