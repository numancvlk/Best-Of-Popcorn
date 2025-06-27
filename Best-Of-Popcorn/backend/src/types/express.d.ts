declare global {
  namespace Express {
    interface Request {
      user?: {
        id: import("mongoose").Types.ObjectId;
        role: "adminRole" | "actorRole" | "movieRole";
      };
    }
  }
}
