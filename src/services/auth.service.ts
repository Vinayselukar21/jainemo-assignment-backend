import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { signAccess, signRefresh, verifyRefresh } from "../utils/jwt";

export class AuthService {
  static async register({ email, password, name }: { email: string; password: string; name: string; }) {
    const exists = await UserModel.findOne({ email });
    if (exists) throw new Error("Email already registered");
    const user = await UserModel.create({ email, password, name });
    return { id: user._id, email: user.email, name: user.name };
  }

  static async login({ email, password }: { email: string; password: string; }) {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid credentials");
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("Invalid credentials");

    const payload = { sub: String(user._id), email: user.email, role: user.role };
    const accessToken = signAccess(payload);
    const refreshToken = signRefresh(payload);

    return { user: { id: user._id, email: user.email, name: user.name, role: user.role }, accessToken, refreshToken };
  }

  static async refresh(token?: string) {
    if (!token) throw new Error("No refresh token");
    const decoded = verifyRefresh(token) as jwt.JwtPayload;
    const payload = { sub: decoded.sub as string, email: decoded.email, role: decoded.role };
    const accessToken = signAccess(payload);
    return { accessToken };
  }
}
