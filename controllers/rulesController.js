const { body, validationResult } = require('express-validator');

const Rules = require('../models/rules');

const async = require('async');
const rules = require('../models/rules');

exports.rules_list = (req, res, next) => {
  Rules.find()
    .sort([['name', 'ascending']])
    .exec((err, list_ruless) => {
      if (err) {
        return next(err);
      }

      res.render('rules_list', {
        title: 'Rules List',
        rules_list: list_ruless,
      });
    });
};

exports.rules_detail = (req, res, next) => {
  async.parallel({
    rules: callback => {
      rules.findById(req.params.id).exec(callback);
    },
    ruless_processes: callback => {
      Process.find({ rules: req.params.id }, 'name summary').exec(callback);
    },

  },
    (err, results) => {
      if (err) {
        return next(err);
      } // Error in API usage.
      if (results.rules == null) {
        // No results.
        const err = new Error('Rules not found');
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render('rules_detail', {
        title: 'Rules Detail',
        rules: results.rules,
        rules_processes: results.ruless_processes,
      });
    }
  );
};

// Display Machine create form on GET.
exports.rules_create_get = (req, res, next) => {
  res.render('rules_form', { title: 'Create Rules' });
};

// Handle rules create on POST.
exports.rules_create_post = [
  // Validate fields.
  body('name', 'Name must not be empty.').isLength({ min: 1 }),
  body('des', 'Invalid des'),
  body('prize', 'Invalid prize'),

  // Sanitize fields.
  body('name').escape(),
  body('des').escape(),
  body('prize').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render('rules_form', {
        title: 'Create Rules',
        rules: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.

      // Create an Rules object with escaped and trimmed data.
      const rules = new Rules({
        name: req.body.name,
        des: req.body.des,
        prize: req.body.prize,
      });
      rules.save((err) => {
        if (err) {
          return next(err);
        }
        // Successful - redirect to new Rules record.
        res.redirect(rules.url);
      });
    }
  },
];

// Display Rules to delete on Get
exports.rules_delete_get = (req, res, next) => {
  async.parallel(
    {
      rules: callback => {
        Rules.findById(req.params.id).exec(callback);
      },
      ruless_processes: callback => {
        Process.find({ rules: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.rules == null) {
        res.redirect('/dashboard/ruless');
      }

      res.render('rules_delete', {
        title: 'Delete Rules',
        rules: results.rules,
        rules_processes: results.ruless_processes,
      });
    });
  ;
};

// Handle Machine delete on POST.
exports.rules_delete_post = (req, res, next) => {
  async.parallel(
    {
      rules: callback => {
        Rules.findById(req.body.rulesid).exec(callback);
      },
      ruless_processes: callback => {
        Process.find({ rules: req.body.rulesid }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      if (results.ruless_processes.length > 0) {
        // rules has processess. Render in same way as for GET route.
        res.render('rules_delete', {
          title: `Delete Rules`,
          rules: results.rules,
          rules_processes: results.ruless_processes,
        });
        return;
      } else {
        // Machine has no processess. Delete object and redirect to the list of machines.
        Rules.findByIdAndRemove(req.body.rulesid, err => {
          if (err) {
            return next(err);
          }
          // Success - go to rules list
          res.redirect('/dashboard/ruless');
        });
      }
    }
  );
};

// Display Machine update form on GET.
exports.rules_update_get = (req, res, next) => {
  Rules.findById(req.params.id, (err, rules) => {
    if (err) {
      return next(err);
    }
    if (rules == null) {
      // No results.
      const err = new Error('rules not found');
      err.status = 404;
      return next(err);
    }
    // Success.
    res.render('rules_form', { title: 'Update rules', rules: rules });
  });
};

// Handle rules update on POST.
exports.rules_update_post = [
  // Validate fields.
  body('name', 'Name must not be empty.').isLength({ min: 1 }),
  body('des', 'Invalid des'),
  body('prize', 'Invalid prize'),

  // Sanitize fields.
  body('name').escape(),
  // body('description').toDate(),
  body('des').escape(),
  body('prize').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create Machine object with escaped and trimmed data (and the old id!)
    const rules = new Rules({
      name: req.body.name,
      des: req.body.des,
      prize: req.body.prize,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render('rules_form', {
        title: 'Update Rules',
        rules: rules,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      Rules.findByIdAndUpdate(req.params.id, rules, {}, (err, therules) => {
        if (err) {
          return next(err);
        }
        // Successful - redirect to genre detail page.
        res.redirect(therules.url);
      });
    }
  },
];
