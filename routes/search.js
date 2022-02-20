var express = require('express');
var router = express.Router();
const { body,validationResult } = require('express-validator');

/* GET home page. */
// index page
router.get('/',  function(req, res) {
    
    res.render('search', {title: 'MUZIKI',})
});

router.post('/', body('search').trim(), body('choices').trim(),
            function(req,res) {
                const searchItem = req.body.search;
                const choiceItem = req.body.choices;
                if(searchItem == undefined){
                    alert("Please enter a search query");
                    res.render('search');
                }
                else if(choiceItem == 'Search By'){
                    alert("Please select a category");
                    res.render('search', {title: 'MUZIKI',})
                }
                
                if(choiceItem == 'Songs'){
                    res.redirect('song-result');
                }
                else if(choiceItem == 'Genre'){
                    res.redirect('genre-result');
                }
                else if(choiceItem == 'Artist'){
                    res.redirect('artist-result');
                }
                else if(choiceItem == 'Albums'){
                    res.redirect('album-result');
                }

                console.log(searchItem);
                console.log(choiceItem);
                console.log("all good");

                // res.redirect('/search/'+choiceItem+'/'+searchItem);
                // res.render('/');
        
        })

router.get('/song/result', function(req,res) {
    console.log("hello");
})

// router.get('/:choiceItem/:searchItem', function(req, res) {
//     const choices = req.params.choiceItem;
//     const search = req.params.searchItem;
//     console.log(choices, search);
//     try{
//         res.render('index');
//     }
//     catch(e){
//         console.log(e);
//     }
// })

    
module.exports = router;

