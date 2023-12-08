import User from '../models/user.model.js';

/* API TEST */
export const test = (req, res) => {
    res.json({ 
        message: 'API is Working!', 
    });
};