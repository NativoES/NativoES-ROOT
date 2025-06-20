import jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
    
  static async generateToken(
    payload: any,
    duration: jwt.SignOptions["expiresIn"] = "2h"
  ) {
    return new Promise<string | null>((resolve, reject) => {
      if (!JWT_SEED) {
        return resolve(null);
      }

      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err || !token) return resolve(null);
        resolve(token);
      });
    });
  }

  static validateToken(token: string) {
    throw new Error("Not implemented");
    return;
  }
}
