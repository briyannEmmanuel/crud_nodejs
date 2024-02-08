import mysql from "mysql2";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  passeword: "",
  database: "crud_nodejs",
});

export default connection.promise();
