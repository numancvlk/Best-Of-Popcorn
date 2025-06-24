declare namespace Express {
  interface Request {
    user?: {
      id: import("mongoose").Types.ObjectId;
      role: "user1" | "user2" | "user3";
    };
  }
}
