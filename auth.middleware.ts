// import jwt, { JwtPayload } from "jsonwebtoken";
// import User from "../models/user.model";
// import { NextFunction } from "express";

export const exampleChanges = (): string => {
  return "Example Changes ito hahaha";
};

export const protectRoute = async (req: any, res: any, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decryptToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayload;
    if (!decryptToken)
      return res.status(401).json({ message: "Invalid token" });

    const user = await User.findById(decryptToken.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error("userMiddleware/protectRoute error: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
