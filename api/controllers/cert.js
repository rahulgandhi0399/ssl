
import { createError } from "../utils/error.js";
import https from "https";
import tls from "tls";
import sslCertificate from "get-ssl-certificate";
import URL from "url";
import {getCertStatusByDomain } from 'easy-ocsp';


export const getSSLCert = async (req, res, next) => {
  console.log(req.body)
  async function getSSLCertificate(urlString) {
    if (!urlString.startsWith('https://')) {
      urlString = `https://${urlString}`;
    }
    let url =  URL.parse(urlString,true);
 
  
    const ocspResult = await getCertStatusByDomain(url.hostname);
    //console.log(ocspResult,"ocsp")
    let status = ocspResult.status
    if (status === 'good') {
      status = 'Certificate is valid (not revoked).';
    } else if (status.type === 'revoked') {
      status = 'Certificate has been revoked!';
    } else {
      status = 'OCSP status unknown.';
    }
 
    
  return new Promise((resolve, reject) => {
    const options = {
      hostname: url.hostname || urlString,
      port: 443,
      method: 'GET',
      rejectUnauthorized: false,  // This allows retrieving the certificate, even if it's not fully valid
    };
  
    const req = https.request(options, (res) => {
      const cert = res.socket.getPeerCertificate();
      const verified = res.socket.authorized;
      console.log(verified,"verified")
      if (cert) {
        console.log('Issuer:', cert.issuer);
        const isSelfSigned = cert.issuer.CN === cert.subject.CN;
        cert.verified = verified
        cert.isSelfSigned = isSelfSigned
        cert.status = status
        resolve(cert);
      } else {
        console.log('No certificate found.');
        reject(new Error('No certificate found'));
      }
      
      res.on('data', (d) => {
        // Process data if necessary
       
        return d
      });
    });
  
    req.on('error', (e) => {
      console.error(e);
    });
    
    req.end();
  });  
  }
  
  
 
    const certDetails = await getSSLCertificate(req.body.Url);
   
    res.status(200).json(certDetails);
  
};

