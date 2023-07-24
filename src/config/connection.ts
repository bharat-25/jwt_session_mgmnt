import mongoose from 'mongoose';


const dbConnect = async ()=> {
    try {
        await mongoose.connect("mongodb://localhost:27017/JWT")
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error);
 
    };
}

export {dbConnect};