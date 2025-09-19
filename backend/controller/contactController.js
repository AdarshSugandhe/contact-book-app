import contactModel from "../models/contactModel.js";


// API for adding new contact
export const addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Missing Details" });
    }

    const contactExists = await contactModel.findOne({ email });

    if (contactExists) {
      return res.status(400).json({ message: "Contact already exists" });
    }

    const newContact = new contactModel({ name, email, phone });

    await newContact.save();

    res.status(201).json({message: "Contact Created Successfully"})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};


// API for getting all contacts
export const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit  = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [contacts, total] = await Promise.all([
      contactModel.find().skip(skip).limit(limit),
      contactModel.countDocuments()
    ])

    res.status(200).json({total, page, limit, contacts})

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}


// API to delete contact
export const deleteContact = async (req, res) => {
  try {
    const id = req.params.id

    if (!id) {
      return res.status(400).json({message: "Contact ID is required"})
    }

    const deleted = await contactModel.findByIdAndDelete(id)

    if (!deleted) {
      return res.status(404).json({message: "Contact not found"})
    }

    res.status(204).json({message: "Contact Deleted"})
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}