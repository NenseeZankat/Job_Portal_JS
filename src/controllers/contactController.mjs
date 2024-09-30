
import {Contact} from "../models/contact.mjs";

// Create a User
const createContact = async (req, res) => {
    try {
      const { name, email, message } = req.body;
  
      // Create new submission
      const submission = new Contact({ name, email,message, });
  
      // Save to the database
      await submission.save();
  
      res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to submit contact form' });
    }
  };

export { createContact };
