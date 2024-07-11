// import mongoose, { Document, Model, Schema } from "mongoose";

// interface IUser extends Document {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   officeName: string;
//   officeAddress: string;
//   officeGoogleMapLink: string;
//   phoneNo: string;
//   landlineNo: string;
//   accountsEmail: string;
//   accountsPhone: string;
//   passportFront: string;
//   passportBack: string;
//   tradeLicense: string;
//   emiratesId: string;
//   walletId: mongoose.Types.ObjectId;
// }

// const UserSchema: Schema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   confirmPassword: {
//     type: String,
//     required: true,
//   },
//   officeName: {
//     type: String,
//     required: true,
//   },
//   officeAddress: {
//     type: String,
//     required: true,
//   },
//   officeGoogleMapLink: {
//     type: String,
//     required: true,
//   },
//   phoneNo: {
//     type: String,
//     required: true,
//   },
//   landlineNo: {
//     type: String,
//     required: false,
//   },
//   accountsEmail: {
//     type: String,
//     required: false,
//   },
//   accountsPhone: {
//     type: String,
//     required: false,
//   },
//   passportFront: {
//     type: String,
//     required: true,
//   },
//   passportBack: {
//     type: String,
//     required: true,
//   },
//   tradeLicense: {
//     type: String,
//     required: true,
//   },
//   emiratesId: {
//     type: String,
//     required: true,
//   },
//   walletId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//   },
// });

// // Check if the model is already compiled
// let User
// if(mongoose.models && mongoose.models.User){
//    User= mongoose.models.User;
// }else{
//   User = mongoose.model<IUser>("User", UserSchema);
// }

// export default User;