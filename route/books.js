
const express = require('express');
const bookCtrl = require('../controller/bookController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const router = express.Router();


router.get('/:start', bookCtrl.getBooks); 
router.get('/book/:id', bookCtrl.getBook);

router.get('/booksrequested/:start', bookCtrl.getBooksRequested);
router.get('/category/:category', bookCtrl.getBookByCategory);
router.get('/author/:author', bookCtrl.getBookByAuthor);

router.get('/recentbooks/recents', bookCtrl.getBooksrecent);

router.post('/requestedbook', 
            auth,
            [
                check('idBook', 'idBook is required').not().isEmpty(),
                check('idAuthor', 'idAuthor es required').not().isEmpty(),
            ],
        bookCtrl.requestedBook
);

router.post('/reportBook', 
            auth,
            [
                check('bookname', 'bookname is required').not().isEmpty(),
                check('authorname', 'authorname is required').not().isEmpty(),
            ],
        bookCtrl.reportBook
);

module.exports = router;