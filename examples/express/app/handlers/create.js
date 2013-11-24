exports = module.exports = function(db, logger) {
  
  function validateItem(req, res, next) {
    if (!req.body.description) {
      return res.send('Tasks must have a description');
    }
    next();
  }
  
  function saveToDb(req, res, next) {
    var todo = {
      description: req.body.description
    }
    
    db.add(todo, function(err) {
      if (err) {
        logger.error(err.message);
        return next(err);
      }
      next();
    });
  }
  
  function redirectToList(req, res, next) {
    res.redirect('/');
  }

  /**
   * POST /todo
   */
  return [ validateItem,
           saveToDb,
           redirectToList ];
}

exports['@require'] = [ 'db/todos', 'logger' ];
