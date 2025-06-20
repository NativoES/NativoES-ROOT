import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { JwtAdapter } from "../../config/jwt.adapter";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto } from "../../domain";

export class AuthService {
  constructor() {}

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest("Email not exist");

    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      user.password
    );
    if (!isMatching) throw CustomError.badRequest("Password is not valid");

    const token = await JwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });
    if (!token) throw CustomError.internalServer("Error while creating JWT");

    const userObject = user.toObject();
    delete (userObject as any).password;

    const userData = {
      id: user.id,
      email: user.email,
      rol: user.rol,
    };

    return {
      user: userData,
      token,
    };
  }
}
