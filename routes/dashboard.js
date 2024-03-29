const express = require('express');
const router = express.Router();

// Require controller modules.
const question = require("../controllers/QuestionController")
const process_controller = require('../controllers/processController');
const machine_controller = require('../controllers/machineController');
const category_controller = require('../controllers/categoryController');
const process_instance_controller = require('../controllers/processinstanceController');
const rules_controller = require('../controllers/rulesController');
const search_controller = require('../controllers/searchController');
// const role_detail = require('../views/organization/role_detail')

/// Routes ///
///////////////////////

// GET home page.
router.get('/', process_controller.index);

// GET request for creating a Process. NOTE This must come before routes that display Book (uses id).
router.get('/process/create', process_controller.process_create_get);

// POST request for creating a Process.
router.post('/process/create', process_controller.process_create_post);
// router.post("/process/add",question.QuestionController)


// GET request to delete a Process.
router.get('/process/:id/delete', process_controller.process_delete_get);

// POST request to delete a Process.
router.post('/process/:id/delete', process_controller.process_delete_post);

// GET request to update a Process.
router.get('/process/:id/update', process_controller.process_update_get);

// POST request to update a Process.
router.post('/process/:id/update', process_controller.process_update_post);

// GET request for one Process.
router.get('/process/:id', process_controller.process_detail);

// GET request for list of all Process items.
router.get('/processes', process_controller.process_list);

/// Machine Routes ///

// GET request for creating a Machine. NOTE This must come before route for id (i.e. display machine).
router.get('/machine/create', machine_controller.machine_create_get);

// POST request for creating a Machine.
router.post('/machine/create', machine_controller.machine_create_post);

// GET request to delete a Machine.
router.get('/machine/:id/delete', machine_controller.machine_delete_get);

// POST request to delete a Machine.
router.post('/machine/:id/delete', machine_controller.machine_delete_post);

// GET request to update a Machine.
router.get('/machine/:id/update', machine_controller.machine_update_get);

// POST request to update a Machine.
router.post('/machine/:id/update', machine_controller.machine_update_post);

// GET request for one Machine.
router.get('/machine/:id', machine_controller.machine_detail);

// GET request for list of all Machines.
router.get('/machines', machine_controller.machine_list);

// Rules Router

router.get('/rules' ,rules_controller.rules_list);

router.get('/rules/create', rules_controller.rules_create_get);
router.post('/rules/create', rules_controller.rules_create_post);

router.get('rules/:id',rules_controller.rules_detail);

router.get('/rules/:id/delete', rules_controller.rules_delete_get);
router.post('/rules/:id/delete', rules_controller.rules_delete_post);

router.get('/rules/:id/update',rules_controller.rules_update_get);
router.post('/rules/:id/update',rules_controller.rules_update_post);



/// Category Routes ///
// GET request for creating a Category. NOTE This must come before route that displays category (uses id).
router.get('/category/create', category_controller.category_create_get);

//POST request for creating Category.
router.post('/category/create', category_controller.category_create_post);

// GET request to delete Category.
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete Category.
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update Category.
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update Category.
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one Category.
router.get('/category/:id', category_controller.category_detail);

// GET request for list of all Categories.
router.get('/categories', category_controller.category_list);

/// Process Instance Routes ///

// GET request for creating a process instance. NOTE This must come before route that displays BookInstance (uses id).
router.get(
  '/processinstance/create',
  process_instance_controller.processinstance_create_get
);

// POST request for creating a process instance.
router.post(
  '/processinstance/create',
  process_instance_controller.processinstance_create_post
);

// GET request to delete a process instance.
router.get(
  '/processinstance/:id/delete',
  process_instance_controller.processinstance_delete_get
);

// POST request to delete a process instance.
router.post(
  '/processinstance/:id/delete',
  process_instance_controller.processinstance_delete_post
);

// GET request to update a process isntance.
router.get(
  '/processinstance/:id/update',
  process_instance_controller.processinstance_update_get
);

// POST request to update a process instance.
router.post(
  '/processinstance/:id/update',
  process_instance_controller.processinstance_update_post
);

// GET request for one process instance.
router.get(
  '/processinstance/:id',
  process_instance_controller.processinstance_detail
);

// GET request for list of all process isntances.
router.get(
  '/processinstances',
  process_instance_controller.processinstance_list
);

// Role Routing

// router.get(`/views/organization/role_detail`, role_detail);


/// Search Route ///

// GET request for list of search results.
router.get('/search', search_controller.search_query);

module.exports = router;
