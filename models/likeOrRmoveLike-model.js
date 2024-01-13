const mongoose = require('mongoose')

const likeOrRemoveLike = new mongoose.Schema({
    userId:{
        type:String,
    },
    likedOrNot:{
        type:Boolean,
        default:false,
    }

},)

module.exports = likeOrRemoveLike
 
// // app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const BusinessDetails = require('./business-details-model');
// const LikeOrRemoveLike = require('./likeOrRemoveLike-model');

// const app = express();
// const PORT = 3000;

// mongoose.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// app.use(bodyParser.json());

// // Like or remove like route
// app.post('/api/like/:businessId/:ratingId', async (req, res) => {
//     const { businessId, ratingId } = req.params;
//     const { userId, likedOrNot } = req.body;

//     try {
//         const business = await BusinessDetails.findById(businessId);

//         if (!business) {
//             return res.status(404).json({ message: 'Business not found' });
//         }

//         const rating = business.ratingAndComments.id(ratingId);

//         if (!rating) {
//             return res.status(404).json({ message: 'Rating not found' });
//         }

//         const like = rating.likes.find((like) => like.userId === userId);

//         if (like) {
//             like.likedOrNot = likedOrNot;
//         } else {
//             rating.likes.push({ userId, likedOrNot });
//         }

//         await business.save();

//         res.json(business);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
