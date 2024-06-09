// async Handler simplifies to not to write try and catch for every try catch 
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler( async (req,res)=>{
    // console.log("The request body is ", req.body);
    const {name, email, phone}= req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory ! ");
    } 
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact);
});

//@desc get contact by id
//@route GET /api/contacts/:id
//@access public
const getContactbyId =asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updateContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.findByIdAndDelete(
        req.params.id,
    );
    res.status(200).json(contact);
});
 

module.exports={
    getContact, 
    createContact, 
    getContactbyId, 
    updateContact, 
    deleteContact
};