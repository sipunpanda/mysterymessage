import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number
}


const connection:ConnectionObject={}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Alreadyconncted to database");
        return
        
    }

    try {
        // console.log("line 18", connection);
        
       const db =  await mongoose.connect(process.env.MONGODB_URI || "", {})
    //    console.log("line 21", db);
       

       connection.isConnected = db.connections[0].readyState
    //    console.log("DB connected", connection);
       
        
    } catch (error) {
     console.log("Database connection failed", error);
     
        process.exit(1)
    }
}

export default dbConnect;