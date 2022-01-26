//Las carpetas dentro de la carpeta pages también sirven como parte de la ruta. En este caso, la url sería: "/news". Para el archivo sport.js dentro de la carpeta news, la ruta sería: "/news/sport"
// Si en la ruta se escribe solamente el nombre de la carpeta pero no el archivo específico, la carpeta coge el index.js

//Para crear los links en Next, se debe importarlos desde "next/link"
import Link from "next/link";

//También se pueden crear subcarpetas para así crear rutas anidadas
const News = () => {
  return (
    <main>
      <h1>News Next</h1>
      <ul>
        <li>
          <Link href="/news/1">First New</Link>
          {/* El Link a diferencia de React que tiene el atributo to para establecer la ruta la cual dirigirse, en Next tiene el atributo href */}
        </li>
      </ul>
    </main>
  );
};

export default News;
