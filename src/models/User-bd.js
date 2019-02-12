import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
  },
  date: {
		type: String,
		required: true
	},
	create_At: {
		type: Date,
		default: Date.now
	}
});

const Friend = mongoose.model('item', UserSchema);

export default Friend;