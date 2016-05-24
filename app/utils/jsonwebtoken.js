import jwt from 'jsonwebtoken'

let token = jwt.sign({name: 'Mosul 30cm Satellite', style: 'mapbox://styles/pacgeo/cildaq2mm00889nkishraw6wh'}, 'pacgeo')

console.log(token)
let decoded = jwt.verify(token, 'pacgeo', (err, decoded) => {
  if (decoded) console.log(decoded)
})
