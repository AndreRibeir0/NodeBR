// docker ps 
// docker exec -it c3642db51cd1 mongo -u meuusuario -p minhasenhasecreta --authenticationDatabase herois

// databases
// show dbs

// mudando o contexto para o database
// use herois

//mostrar tables (colecoes)
// show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

for(let i = 0; i <= 50000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0})

// create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//read
db.herois.find()

// update

db.herois.update({ _id: ObjectId("601ff1b3ce2e30e38ad6e3f8")},
         { nome: 'Mulher maravilha'})

db.herois.update({ _id: ObjectId("601ff244ce2e30e38ad70b08")},
         { $set: { nome: 'Lanterna Verde' }})        
         
db.herois.update({ poder: 'Velocidade'},
         { $set: { poder: 'super força' }})    
         
// delete
db.herois.remove({})         
db.herois.remove({nome: 'Mulher maravilha'})         