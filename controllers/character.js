module.exports = function ({ Character }) {
  const create = (req, res, next) => {
    if (!req.body.name || !req.body.level || !req.body.biography || !req.body.melee_damage || !req.body.remote_damage || !req.body.defense || !req.body.image || !req.body.life_point || !req.body.strength || !req.body.agility || !req.body.intelligence || !req.body.initiative || !req.body.social || !req.body.is_npc) {
      log.addLog("Création_personnage" , "Données oubliées !", null, null)
      return res.status(400).json({
        error: "Données oubliées !",
      });
    }
    const Character = new Character({
      name: req.body.name,
      level: req.body.level,
      biography: req.body.biography,
      melee_damage: req.body.melee_damage,
      remote_damage: req.body.remote_damage,
      defense: req.body.defense,
      image: req.body.image,
      life_point: req.body.life_point,
      strength: req.body.strength,
      agility: req.body.agility,
      intelligence: req.body.intelligence,
      initiative: req.body.initiative,
      social: req.body.social,
      is_npc: req.body.is_npc,
      UserId: req.body.UserId,
      ClassId: req.body.ClassId,
      RaceId: req.body.RaceId,
      SessionId: req.body.SessionId
    });

    Character.save()
      .then(() => {
        log.addLog("Création_personnage" , "Personnage créé ! ", Character.name, null)
        res.status(201).json({
          message: "Personnage créé !",
        })
      }
      )
      .catch((error) =>
        res.status(403).json({
          error,
        })
      );
  }

  const edit = (req, res, next) => {
    Character.findOne({
      where: {
        name: req.body.name,
      }
    })
      .then((Character) => {
        Character.set({
          name: req.body.name,
          level: req.body.level,
          biography: req.body.biography,
          melee_damage: req.body.melee_damage,
          remote_damage: req.body.remote_damage,
          defense: req.body.defense,
          image: req.body.image,
          life_point: req.body.life_point,
          strength: req.body.strength,
          agility: req.body.agility,
          intelligence: req.body.intelligence,
          initiative: req.body.initiative,
          social: req.body.social,
          is_npc: req.body.is_npc,
          UserId: req.body.UserId,
          ClassId: req.body.ClassId,
          RaceId: req.body.RaceId,
          SessionId: req.body.SessionId
        })

        Character.save()
        .then(() => {
          log.addLog("Modification_personnage" , "Personnage modifié : ", Character.name, null)
          res.status(201).json({
            message: "Personnage créé !",
          })
        }
        )
        .catch((error) =>
          res.status(403).json({
            error,
          })
        );
      })


  }

  const getAll = async (req, res, next) => {
    const chara = await Character.findAll();
    res.json(chara);
    return chara;
  }

  const getById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    if (id) {
      const chara = await Character.findByPk(id);
      res.json(chara);
      return chara;
    }

  }


  return {
    create,
    edit,
    getAll,
    getById
  }
}
