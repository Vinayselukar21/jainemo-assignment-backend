import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const data = await AuthService.register({ email, password, name });
    res.status(201).json(data);
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await AuthService.login({ email, password });
    res
      .cookie("accessToken", accessToken, { httpOnly: true, sameSite: "lax" })
      .cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "lax" })
      .json({ user, accessToken });
  };

  static refresh = async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;
    const data = await AuthService.refresh(token);
    res.cookie("accessToken", data.accessToken, { httpOnly: true, sameSite: "lax" }).json(data);
  };

  static me = async (req: Request, res: Response) => {
    res.json({ user: (req as any).user });
  };

  static logout = async (_req: Request, res: Response) => {
    res.clearCookie("accessToken").clearCookie("refreshToken").status(204).send();
  };
}
