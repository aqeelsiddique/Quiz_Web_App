const { body, validationResult } = require('express-validator');

const Category = require('../models/category');

const Process = require('../models/process');
const async = require('async');
const catchasynerror = require('./midlleware/catchasynerror');
const updatecatogry = require('../models/updatecatogry');
const ErrorHandler = require('./utills/errorHandler');
const category = require('../models/category');


//////////////////////////////post method

///////////////update code of create a category  @Aqeel
exports.create_catory = async (req, res, next) => {
  // Validate that the name field is not empty.
  body('name', 'Category name required').isLength({ min: 1 }).trim(),

  // Sanitize (trim and escape) the name field.
  body('name').trim().escape()

// req.body.user = req.user.id; 
 // Extract the validation errors from a request.
 const errors = validationResult(req);


const Category = await updatecatogry.create(req.body);
res.status(201).json({
    success:true,
    Category
});

};
/////////////////////get method of category 
exports.category_list = function (req, res, next) {
  category.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_categories) {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      res.status(201).json({
        success:true,
        list_categories       
    });
    res.render('category_list', {
        title: 'Category List',
        list_categories: list_categories,
      });
    });
};


  ///////////////////delete a method code controller Subject


  ////--- admin  @AQeel$Umer

  exports.deleteCategory = catchasynerror( async (req, res, next) => {
    let dcategory = await category.findById(req.params.id);
  
    if(!dcategory){
        return next("Question not found",404);
    }
    await dcategory.deleteOne();
  
  
    res.status(200).json({
        success:true,
        message:"category delete successfull",
      
    })
  })

//update a Category   ----only admin update the category
exports.ucategory = catchasynerror(async (req, res, next) => {
  let UdateCat = await category.findById(req.params.id);

  if(!UdateCat){
      return next(new ErrorHandler("Subject not found",404));
  }
  UdateCat = await category.findByIdAndUpdate(req.params.id, req.body , {
      new:true,
      runValidators:true,
      useFindAndModify:false
  });
  res.status(200).json({
      success:true,
      UdateCat
  })
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////POST METHOD
// Handle Category create on POST.


exports.category_create_post = [
  // Validate that the name field is not empty.
  body('name', 'Category name required').isLength({ min: 1 }).trim(),

  // Sanitize (trim and escape) the name field.
  body('name').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data.
    const category = new Category({ name: req.body.name });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('category_form', {
        title: 'Create Category',
        category: category,
        errors: errors.array(),
      });
      return;
    } 
    else {
      // Data from form is valid.
      // Check if Category with same name already exists.
      Category.findOne({ name: req.body.name }).exec(function (
        err,
        found_category
      ) 
      {
        if (err) {
          return next(err);
        }

        if (found_category) {
          // Category exists, redirect to its detail page.
          res.redirect(found_category.url);
        } else {
          category.save(function (err) {
            if (err) {
              return next(err);
            }
            // Category saved. Redirect to category detail page.
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

///////////////////////////////////////////////////////////////////in below oild code and above new code @Aqeel
// Display list of all Category.
// Display detail page for a specific Category.
exports.category_detail = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },

      category_processes: function (callback) {
        Process.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        // No results.
        const err = new Error('Category not found');
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render('category_detail', {
        title: 'Category Detail',
        category: results.category,
        category_processes: results.category_processes,
      });
    }
  );
};

// Display Category create form on GET.
exports.category_create_get = function (req, res, next) {
  res.render('category_form', { title: 'Create Category' });
};


// Display Category delete form on GET.

exports.category_delete_get = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_processes: function (callback) {
        Process.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.category == null) {
        // No results.
        res.redirect('/dashboard/categories');
      }
      // Successful, so render.
      res.render('category_delete', {
        title: 'Delete Category',
        category: results.category,
        category_processes: results.category_processes,
      });
    }
  );
};



// Handle Category delete on POST.
exports.category_delete_post = function (req, res, next) {
  async.parallel(
    {
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
      category_processes: function (callback) {
        Process.find({ category: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      // Success
      if (results.category_processes.length > 0) {
        // Category has pprocesses. Render in same way as for GET route.
        res.render('category_delete', {
          title: 'Delete Category',
          category: results.category,
          category_processes: results.category_processes,
        });
        return;
      } else {
        // Category has no pprocesses. Delete object and redirect to the list of categories.
        Category.findByIdAndRemove(req.body.id, function deleteCategory(err) {
          if (err) {
            return next(err);
          }
          // Success - go to categories list.
          res.redirect('/dashboard/categories');
        });
      }
    }
  );
};


// Display Category update form on GET.
exports.category_update_get = function (req, res, next) {
  Category.findById(req.params.id, function (err, category) {
    if (err) {
      return next(err);
    }
    if (category == null) {
      // No results.
      const err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }
    // Success.
    res.render('category_form', {
      title: 'Update Category',
      category: category,
    });
  });
};

// Handle Category update on POST.
exports.category_update_post = [
  // Validate that the name field is not empty.
  body('name', 'Category name required').isLength({ min: 1 }).trim(),

  // Sanitize (trim and escape) the name field.
  body('name').trim().escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract the validation errors from a request .
    const errors = validationResult(req);

    // Create a category object with escaped and trimmed data (and the old id!)
    const category = new Category({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values and error messages.
      res.render('category_form', {
        title: 'Update Category',
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid. Update the record.
      Category.findByIdAndUpdate(req.params.id, category, {}, function (
        err,
        thecategory
      ) {
        if (err) {
          return next(err);
        }
        // Successful - redirect to category detail page.
        res.redirect(thecategory.url);
      });
    }
  },
];
