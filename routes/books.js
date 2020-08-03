const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


//function to wrap each route in try/catch blocks. Saves time and coding space
function asyncHandler(cb) {
    return async(req, res, next) => {
        try{
            await cb(req, res, next)
        } catch(error){
            next(error);
          }
    }
}

//Get ALL Books
router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render("index", { title: "Books", books });
  }));

//Gets NEW Books form
router.get('/new', (req, res) => {
    res.render("new-book", { book: { }, title: "New Book" });
  });

//Posting a new book to the database
router.post('/new', asyncHandler(async (req, res) => {
    let book;
    try {
      book = await Book.create(req.body);
      res.redirect('/books/');
    } catch (error) {
      if(error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        res.render('new-book', { book, errors: error.errors, title: "New Book" })
      } else {
        throw error;
        // const err = new Error();
        // err.status = 500;
        // throw err;
    }  
    }
  }));


/* GET individual book. */
router.get("/:id", asyncHandler(async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    res.render('update-book', { book, title: book.title }); 
  })); 

  
/* Update an book. */
router.post('/:id/update', asyncHandler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
        await book.update(req.body);
        res.redirect("/books");
  }));

  /* Delete individual book. */
router.post('/:id/delete', asyncHandler(async (req ,res) => {
    const book = await Book.findByPk(req.params.id);
    await book.destroy();
    res.redirect('/');
  }));

  module.exports = router;