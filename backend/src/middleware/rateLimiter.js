import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success)
      return res.status(429).json({
        message: "Too Many Requests, Please try again later",
      });
    next();
  } catch (er) {
    console.log("Error in rateLimiter middleware", er);
    next(er);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default rateLimiter;