const router = require('express').Router();
module.exports = router;

//get routes

//put routes

//post routes

//delete routes

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  console.log(error);
});
