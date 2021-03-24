import API from "../api/Calls";
import {LocalStorage} from "./Storage";


const setItem = LocalStorage().setItem;
const getItem = LocalStorage().getItem;
const jwt = require('jsonwebtoken');
const fernet = require('fernet');
const Crypto = require('crypto');

export function GenerateJWTToken() {

    const getSecret = () => {
        var promiseFunction = ((resolve: any, reject: any) => {
            // Generate random 32 bits key to encrypt secret key in API
            var key = Crypto.randomBytes(32).toString('base64');

            // Get encrypted key from API
            API.database.sendDeviceToken(key).then((response: any) => {
                console.log(key)
                var secret = new fernet.Secret(key);
                var token = new fernet.Token({
                    secret: secret,
                    token: response.data,
                    ttl: 0
                })

                resolve(token.decode());
            }, (err) => {
                console.log(err)
                reject(err);
            })
        })
        return new Promise(promiseFunction)
    }

    const makeToken = (secret: string) => {
        getItem("JWTToken").then((oldToken: any) => {
            if (oldToken == null || oldToken == "") {
                getItem("userID").then((userID: any) => {
                    console.log(userID);
                    var data = {
                        "house_id": userID,
                        "APIkey": "34TF5373W532455OBCMCA67E16S3D"
                    }
                    var signedToken = jwt.sign(data, secret, {expiresIn: '168h'})

                    console.log(signedToken);

                    setItem("JWTToken", signedToken);
                });
            } else {
                jwt.verify(oldToken, secret, (err: any, decoded: any) => {
                    console.log(decoded);
                    console.log(err);
                    if (decoded == undefined) {
                        getItem("userID").then((userID: any) => {
                            console.log(userID);
                            var data = {
                                "house_id": userID,
                                "APIkey": "34TF5373W532455OBCMCA67E16S3D"
                            }
                            var signedToken = jwt.sign(data, secret, {expiresIn: '168h'})

                            console.log(signedToken);
                            setItem("JWTToken", signedToken);
                        });
                    }
                });
            }
        });
    }

    const generateJWTToken = () => {
        var promiseFunction = ((resolve: any, reject: any) => {
            getSecret().then((secret: any) => {
                console.log(secret);
                makeToken(secret);
                resolve();
            }, () => {
                reject();
            })
        })
        return new Promise(promiseFunction);
    }

    return {
        generateJWTToken: generateJWTToken
    }
}