import classes from "../components/meetups/MeetupDetails.module.css"; //Se puede importar los estilos de css a través de un objeto que por conveniencia se llama classes. Para poder realizar esta importación es necesario que el archivo css tenga como extensión: .module.css

//Para acceder a los parámetros como se hacía en React, en Next se utiliza como nombre del archivo el identificador del parámetro entre unos corchetes.
//En React para acceder a los parámetros se utilizaba el hook de useParams, sin embargo, en Next se utiliza el useRouter. Este se debe importar de "next/router"

import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
require("dotenv").config();

export const getStaticPaths = async () => {
  //Esta función siempre debe ser llamada cuando se use el getStaticProps y antes de esta última. Esta función debe retornar un objeto con la propiedad de paths, el cual va a tener un arrays de objetos con cada uno de los params para cada una de las rutas.
  //Otra propiedad que debe tener el objeto es el fallback el cual si es falso, significa que todas las rutas están descritas en el paths, por lo que si una no se encuentra, va a dar un error 404. Por el contrario si es verdadero, esto significa que no todas las rutas se encuentran en los paths, por lo que next intentará crear una.

  const connection = await MongoClient.connect(process.env.MONGO_URI);

  const dataBase = connection.db();
  const meetupsCollection = dataBase.collection("meetups");
  const allMeetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  connection.close();
  console.log(allMeetups);

  return {
    fallback: false,
    paths: allMeetups.map((i) => ({
      params: {
        meetupId: i._id.toString(),
      },
    })),
  };
};

export const getStaticProps = async (context) => {
  const { meetupId } = context.params;
  const connection = await MongoClient.connect(process.env.MONGO_URI);

  const dataBase = connection.db();
  const meetupsCollection = dataBase.collection("meetups");
  const singleMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(singleMeetup);
  connection.close();
  return {
    props: {
      id: singleMeetup._id.toString(),
      title: singleMeetup.title,
      address: singleMeetup.address,
      description: singleMeetup.description,
      image: singleMeetup.image,
    },
  };
};
//getStaticProps puede tener como argumento el context en el cual a diferencia del getServerSideProps el cual tenía el req y res, este solamente tiene el params. El cual es como cuando se escribe backend en node y express, este es un objeto con todos los parámetros del URL. El problema es que al utilizar los params se debe exportar otra función antes de getStaticProps, la cual se llama getStaticPaths

const MeetupDetails = (props) => {
  console.log(props);
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
      </Head>
      <section className={classes.detail}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </>
  );
};

export default MeetupDetails;
