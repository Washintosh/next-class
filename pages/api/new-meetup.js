//Para añadir el backend, Next te permite crear una carpeta llamada api la cual debe estar ubicada dentro de la carpeta pages para que así se hagan peticiones al servidor que deseemos crear.
//De igual manera que con las páginas, los nombres de los archivos sirven como rutas, y así mismo las carpetas sirven como rutas, por ejemplo la ruta de este archivo es: "/api/new-meetup"
//El código escrito en el api nunca se corre en el lado del ciente, siempre se corre del lado del servidor

//Se instala la librería de mongodb y se importa el MongoClient
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const connection = await MongoClient.connect(
      "mongodb+srv://washington:12345@nodeexpressprojects.5xqne.mongodb.net/meetups?retryWrites=true&w=majority"
    ); //Igual que con el mongoose usado en Express, se utiliza connect para realizar la conexión con la base de datos. Solo que aquí no se utiliza el mongoose.connect(), sino que se utiiza el MongoClient.connect()
    //La única diferencia que al usar el mongoose, esta se debe almacenar en una variable para que luego se extraiga la base de datos.
    const dataBase = connection.db(); //Se crea la base de datos con el nombre que se ha dado en el connection string
    const meetupsCollection = dataBase.collection("meetups"); //Crea una colección. Utiliza como parámetro el nombre de la colección a crear
    const insertedMeetup = await meetupsCollection.insertOne(req.body); //insertOne crea un nuevo documento en la colección
    connection.close(); //Cierra la conección con la base de datos
    return res
      .status(201)
      .json({ message: "Meetup inserted successfully", insertedMeetup }); //Igual que el Node Express se tiene que enviar una respuesta por parte del servidor a la petición del cliente
  }
};

export default handler;
