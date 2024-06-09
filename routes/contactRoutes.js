const express = require("express");
const router = express.Router(); 
const {
    getContact, 
    createContact, 
    getContactbyId, 
    updateContact, 
    deleteContact
} = require("../controllers/contactController")

router.route("/").get(getContact).post(createContact); 

router.route("/:id")
.get(getContactbyId)
.put(updateContact)
.delete(deleteContact); 


module.exports=router;