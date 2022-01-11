const express = require('express');
const router = express.Router();

const fileController = require('../controllers/fileController');

router.post('/join', async (req, res) => {
  try {
    const username =  req.body.username;
    await fileController.saveUsername(username);
    
    res.send({ success: true, message: 'User registered!' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: err.message });
  }
});

router.get('/allUsers', async (req, res) => {
  try {
    let usernames = await fileController.usersList();
    res.send({ success: true, usernames });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: err.message });
  }
});

// router.post('/send', async (req, res) => {
//   try {
//     const { to, from, message }  = req.body;


    
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ success: false, message: err.message });
//   }
// })



module.exports = router;
