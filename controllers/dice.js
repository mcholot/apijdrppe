const setup = require('../lib/randomInt')

const {getRandomInt} = setup();


module.exports = function({ Item }) {
    const lancer = (req, res, next) => {
        DiffDes = req.body.lancer.split(',')
        result = [0]
        for (i in DiffDes){
            nbDesnbFace = DiffDes[i].split('d')
            for (let j = 1; j < parseInt(nbDesnbFace[0])+1; j++){
                resDes = getRandomInt(nbDesnbFace[1])
                result[0] = result[0]+resDes
                result.push(resDes+1)
            }
        }
        res.status(201).json({
            message: result,
          })
        
    }

    return {
        lancer

    }
}
