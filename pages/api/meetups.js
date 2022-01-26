import { MongoClient } from "mongodb";

const meetups = async (req, res) => {
  if (req.method === "GET") {
    const connection = await MongoClient.connect(
      process.env.REACT_APP_MONGO_URI
    );
    const dataBase = connection.db();
    const meetupsCollection = dataBase.collection("meetups");
    const allMeetups = await meetupsCollection.find();
    res.status(200).json({ message: "Successful request", data: allMeetups });
  }
};
export default meetups;
