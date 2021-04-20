var admin = require('firebase-admin')
var serviceAccount = require('../../credentials.json')

let db

function reconnectToFirestore() {
  if (!db) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
    db = admin.firestore()
  }
}

exports.getCars = (req, res) => {
  reconnectToFirestore()

  db.collection('cars')
    .get()
    .then((allData) => {
      let usedCars = []
      allData.forEach((car) => {
        usedCars.push(car.data())
      })
      res.send(usedCars)
    })
}

exports.newCar = (req, res) => {
  reconnectToFirestore()
  const newData = req.body
  db.collection('cars')
    .add(newData)
    .then(() => res.send('New Car Created'))
    .catch((err) => res.status(500).send('Error creating car: ' + err.message))
}

exports.updateCar = (req, res) => {
  reconnectToFirestore()
  res.send('Updated Car')
}
exports.deleteCar = (req, res) => {
  reconnectToFirestore()
  res.send('car is deleted')
}
