import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export type Role = "student" | "admin";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true, index: true },
  password: { type: String, required: true, select: false },
  name: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
}, { timestamps: true });

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const UserModel = model<IUser>("User", userSchema);
