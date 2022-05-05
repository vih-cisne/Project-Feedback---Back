
import  express  from 'express'
import cors from 'cors'
import {routes} from './routes'

const app = express()

app.use(cors(
    //qual front end pode acessar o banco de dados
    //origin https://....
))
app.use(express.json())
app.use(routes)


  

app.listen(3333, () => {
    console.log('HTTP server running!')
})