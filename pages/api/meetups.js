import { MongoClient } from "mongodb";

const meetups = async (req, res) => {
  if (req.method === "GET") {
    const connection = await MongoClient.connect(
      "mongodb+srv://washington:12345@nodeexpressprojects.5xqne.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const dataBase = connection.db();
    const meetupsCollection = dataBase.collection("meetups");
    const allMeetups = await meetupsCollection.find();
    res.status(200).json({ message: "Successful request", data: allMeetups });
  }
};
export default meetups;
