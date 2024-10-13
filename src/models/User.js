import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

userSchema.methods.toJSON = function() {
  const { _id, password, ...user } = this.toObject();
  
  return { id: _id, ...user };
}

userSchema.statics.comparePassword = async (curPassword, recPassword) => {
  return await bcrypt.compare(curPassword, recPassword);
}

userSchema.pre("save", async function(next) {
  const user = this;

  if(!user.isModified("password")) return next();

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;

  next();
});

const User = model("User", userSchema);

export default User;
