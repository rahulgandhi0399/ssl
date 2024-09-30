import express from "express";
import {
  getSSLCert,
} from "../controllers/cert.js";

const router = express.Router();
//CREATE
router.post("/getSSLCert", getSSLCert);

//UPDATE
//DELETE
//GET


//GET ALL


export default router;
