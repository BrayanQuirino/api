/**
 * Programa realizado por Brayan Quirino
 * Septiembre de 2020
 * @param app servidor
 */
const app= require("./app");

//Start the server
app.listen(app.get("port"),()=>{
    console.log(`Server on por ${app.get('port')}`);
})