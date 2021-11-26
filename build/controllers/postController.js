"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _Project = _interopRequireDefault(require("../models/Project"));

var _projectsService = _interopRequireDefault(require("../service/projectsService"));

var _projectsRepository = _interopRequireDefault(require("../repository/projectsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // Injeção de Dependências

const projectsRepository = new _projectsRepository.default(_Project.default);
const projectsService = new _projectsService.default(projectsRepository); // Inserir rotas de projects
// RECEBER O REQUEST, PEGAR DELE O QUE É UTIL, E MANDAR A RESPOSTA

router.get('/', async (req, res, next) => {
  try {
    const {
      title
    } = req.query;
    console.log('REQ.USER', req.user);
    const projects = await projectsService.getAllByFilter(title, req.user.id);
    res.json(projects);
  } catch (error) {
    next(error);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const {
      id
    } = req.params;
    console.log('REQ.USER NA ROTA DE DETALHE', req.user);
    const project = await projectsService.getOne(id);
    res.json(project);
  } catch (error) {
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  try {
    const {
      body
    } = req;
    const newProject = await projectsService.create(body, req.user.id);
    res.json(newProject);
  } catch (error) {
    next(error);
  }
});
var _default = router;
exports.default = _default;
console.log('Hello World');