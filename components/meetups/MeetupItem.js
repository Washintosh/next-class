import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem({ id, image, title, address }) {
  const router = useRouter(); //El router aparte de ser usado para extraer los params del URL, también pueden servir para navegar entre páginas con su método push
  const onClickHandler = () => {
    router.push(`/${id}`); //push sirve para navegar a la página que se indique como argumento
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={onClickHandler}>Show Details</button>
          {/* Otra forma de navegar entre páginas es con un botón que al darse click, este navegue a la página que querramos */}
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
