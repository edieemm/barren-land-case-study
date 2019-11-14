const express = require('express');
const router = express.Router();
const axios = require('axios')
const pool = require('../pool');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    let dataToSend = {}
    axios.get(`https://redsky.target.com/v2/pdp/tcin/${id}?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics`)
    .then(response => {
        dataToSend = {
            id: id,
            name: response.data.product.item.product_description.title,
        }
        res.send(dataToSend)
    }).catch(error => {
        console.log(error);
        res.sendStatus(500)
    })

    // pool.query(queryText)
    //     .then((result) => { res.send(result.rows); console.log(result.rows); })
    //     .catch((err) => {
    //         console.log('Error grabbing all shelters', err);
    //         res.sendStatus(500);
    //     });
});

module.exports = router;