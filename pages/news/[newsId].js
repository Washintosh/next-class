//Para acceder a los parámetros como se hacía en React, en Next se utiliza como nombre del archivo el identificador del parámetro entre unos corchetes.
//En React para acceder a los parámetros se utilizaba el hook de useParams, sin embargo, en Next se utiliza el useRouter. Este se debe importar de "next/router"

import { useRouter } from "next/router";

const data = ["First", "Second", "Third"];
const SingleNew = () => {
  const {
    query: { newsId },
  } = useRouter(); //Para acceder al parámetro se debe destructurarlo debido a que el useRouter retorna un objeto, que tiene dentro otro objeto llamado query que dentro tiene otro objeto con el nombre del parámetro que le dimos
  return <h1>{data[newsId - 1]}</h1>;
};

export default SingleNew;
