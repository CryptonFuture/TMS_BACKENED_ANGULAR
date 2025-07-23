import { app } from "./app";
import { connectMongoDb } from "./mongo_connection/conn";

connectMongoDb()

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})