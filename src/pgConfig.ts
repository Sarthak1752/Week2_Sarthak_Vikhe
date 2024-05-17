import {Pool} from 'pg'

const pool = new Pool(
  {
    host:'localhost',
    database:'postgres',
    user:'postgres',
    password:'root',
    port:5432
  }
)

export default pool;