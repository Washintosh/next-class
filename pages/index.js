/*
Next.js es un framework que utiliza como base React.js y mejora las aplicaciones que habían sido creadas por React.js
Next.js sirve para tres objetivos principalmente:
  1. Pre server side rendering.- para que la carga inicial de la página se haga del lado del servidor y no del cliente
  2. File based routing.- esto sirve para que no tengamos que utilizar el react router para cambiar de ruta, sino que se utiliza un sistema parecido al del HTML cuando recién se empieza a desarrollar
  3. Fullstack capabilities.- se puede añadir código de backend fácilmente en las aplicaciones creadas por next
*/

//Las páginas deben ser añadidas en la carpeta pages.
//El nombre de los archivos que sirven como páginas deben ser nombrados con el mismo nombre que va a salir en la ruta. Por ejemplo, el archivo news.js que es un componente de React que sirve como página en el router, automáticamente va a ser utilizado como la ruta del url: "/news".
//El index.js obviamente sirve para la ruta "/"

//En Next.js no es necesario realizar la importación del módulo React ya que la aplicación ya lleva importado el React por defecto
// Para correr el servidor se utiliza el comando: npm run dev, a diferencia de React que se utilizaba el comando: npm start
//El nombre del componente de la página no necesariamente debe tener el mismo nombre que el archivo

import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head"; //Se importa el Head de next/head para así añadir las etiquetas meta a la página. Como no hay HTML, no se puede agregar las etiquetas manualmente, sin embargo exportando con el componente Head ya se puede realizar eso

const HomePage = ({ meetups }) => {
  //El siguiente código no es necesario debido a que se va a utilizar la función getStaticProps
  // const [meetupData, setMeetupData] = useState([]);
  // useEffect(() => {
  //   setMeetupData(data);
  // }, []);
  return (
    <>
      <Head>
        <title>Next Meetups</title>
        <meta
          name="description"
          content="Browse meetups in a Next built page"
        />
      </Head>
      <MeetupList meetups={meetups} />
    </>
  );
};

//En React, el html que se puede ver en el código fuente de la página web solamente se ve un esqueleto de HTML con un div de clase root en el cual se renderiza toda la aplicación de React. Esto es malo para el search engine optimization debido a que no se puede indexar correctamente la página en los buscadores.
//En Next, esto no ocurre en el caso de que no exista data fetching. Cuando no ocurre, el código fuente de la página sí muestra todos los componentes que conforman la página web, sin embargo, cuando ocurre data fetching, esto no ocurre así debido a que al realizar el data fetching normalmente ocurren dos renderizaciones, en la primera se utiliza el useEffect para así realizar el fetch de información y usar el useState para añadir la información a la variable, pero este provoca otra renderización en la cual ya se muestra la información que fue requerida. Lo que pasa es que Next solamente muestra los datos que fueron pre renderizados la primera vez en el HTML, por lo que en ese no va a salir la información que recién se va a pedir a un servidor.
//Para solucionar este problema, antes de exportar el componente, se realiza una exportación nombrada de una función llamada getStaticProps. Esta función no va a ser ejecutada en el cliente, sino en el servidor en el momento que se realice el desplegue de la aplicación, por lo que dentro de esta función se puede realizar el fetch de la data para que así esto se ejecute en el servidor, y luego cuando ya llegue al cliente, llegue el HTML con toda la información ya obtenida. Esta función siempre retorna un objeto con una propiedad llamada props, el cual va a ser las propiedades del componente de la página. Y dentro de props se puede poner un objeto con toda la información que se necesita correr en el servidor antes de que llegue al cliente. Así ya no es necesario utilizar el useEffect ni el useState

export const getStaticProps = async (context) => {
  const params = context.params;
  const connection = await MongoClient.connect(
    "mongodb+srv://washington:12345@nodeexpressprojects.5xqne.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const dataBase = connection.db();
  const meetupsCollection = dataBase.collection("meetups");
  const allMeetups = await meetupsCollection.find().toArray(); //Se debe convertir a array para que no de error
  connection.close();
  console.log(allMeetups);
  return {
    props: {
      meetups: allMeetups.map((i) => {
        const { image, title, address, _id } = i;
        return {
          image,
          title,
          address,
          id: _id.toString(), //el atributo _id de MongoDB es un objeto que debe ser transformado a string para que no de error
        };
      }),
    },
    revalidate: 10,
    // revalidate sirve para que la página se regenere cada cierto segundos. Lo que se ingresa son los segundos. Esta propiedad soluciona el problema de que la información esté desactualizada debido a que cuando se pre renderiza la página cuando se ejecuta el comando npm run build. Solamente se coge la información dada hasta ese momento del tiempo. Por lo que si se agrega información luego de que se desplegó la página, esta no va a ser añadida. Pero el revalidate evita esa al poder actualizarse cada cierto tiempo.
  };
};

//Hay veces que no es suficiente que la aplicación se pre renderice y se actualice cada determinada cantidad de segundos en el desplegue de la misma, sino que es necesario hacerlo cada vez que se ejecute una petición al servidor. Para eso existe la función llamada getServerSideProps, la cual funciona de la misma manera que getStaticProps solo que esta se va a ejecutar en el servidor luego de que la aplicación haya sido desplegada.

// export const getServerSideProps = (context) => {
//   //getServerSideProps puede tener como argumento el context, el cual puede ser utilizado para obtener información de la petición o de la respuesta. De manera muy similar a cuando se escribe backend con node y express.
//   const req = context.req
//   const res = context.res
//   return {
//     props: {
//       meetups: data,
//     },
//     //Aquí ya no es necesario escribir la propiedad de revalidate debido a que este código se va a ejecutar cada vez que se realice una petición al servidor, y no cada determinada cantidad de tiempo
//   };
// };

export default HomePage;
