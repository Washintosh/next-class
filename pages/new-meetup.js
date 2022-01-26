import { useRouter } from "next/router";
import NewMeetupForm from "../components/meetups/NewMeetupForm";
import Head from "next/head";

const NewMeetup = () => {
  const router = useRouter();

  const addHandler = async (enteredData) => {
    const res = await fetch("/api/new-meetup", {
      //Next permite hacer una petición a la api que creamos en la carpeta api.
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data.message);
    router.replace("/");
  };
  return (
    <>
      <Head>
        <title>New Meetups</title>
        <meta name="description" content="Create new meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={addHandler} />;
    </>
  );
};

export default NewMeetup;
