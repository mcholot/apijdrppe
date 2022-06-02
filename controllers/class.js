const { restart } = require("nodemon");
const { DataTypes: { INTEGER } } = require("sequelize");
const skill = require("./skill");

module.exports = function ({ Class, Skill }, log) {
  const create = (req, res, next) => {
    if (!req.body.name || !req.body.life_point || !req.body.strength || !req.body.agility || !req.body.intelligence || !req.body.initiative || !req.body.social) {
      log.addLog("Création_Classe" , "Données oubliées !", null, null)
      return res.status(400).json({
        error: "Données oubliées !",
      });
    }
    Class.findOne({
      where : {
        name : req.body.name
      }
    })
    .then((klass) => {
      if(klass) {
        log.addLog("Création_Classe", "Classe déjà existante", null, null)
        res.status(400).json({
          message : "Classe déjà existante !"
        })
      }
      else {
        const klass = new Class({
          name: req.body.name,
          life_point: req.body.life_point,
          strength: req.body.strength,
          agility: req.body.agility,
          intelligence: req.body.intelligence,
          initiative: req.body.initiative,
          social: req.body.social,
        });
        klass.save()
        .then(() => {
          log.addLog("Création_classe" , "Classe créée : ", klass.name, null, klass.id)
          res.status(201).json({
            message: "Classe créée !",
          })
        })
        .catch((error) =>
          res.status(403).json({
            error,
          })
        );
      }
    }) 
  }

  const edit = async (req, res, next) => {
    const id = req.params.id;
    if (id) {
      const klass = await Class.findByPk(id);
      if (klass == null){
        log.addLog("Modifcation_Classe", "Aucune classe ne correspond à l'id soumis !", null, null)
        res.status(400).json({
          message : "Aucune Classe ne correspond à l'id soumis"
        })
      } 
      else {
        klass.set({
          name: req.body.name,
          life_point: req.body.life_point,
          strength: req.body.strength,
          agility: req.body.agility,
          intelligence: req.body.intelligence,
          initiative: req.body.initiative,
          social: req.body.social,
        })
        klass.save()
        .then(() => {
          log.addLog("Modification_Classe", "Classe modifiée !", null, null)
          res.status(200).json({
            message : "Classe modifiée !"
          })
        })
        .catch((error) =>{
          res.status(403).json({
            error
          })
        })
      }
    }
  }

  const getAll = async (req, res, next) => {
    const klass = await Class.findAll();
    res.json(klass);
    return klass;
  }

  const getById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    if (id) {
      const klass = await Class.findByPk(id);
      res.json(klass);
      return klass;
    }

  }


  return {
    create,
    edit,
    getAll,
    getById
  }
}
