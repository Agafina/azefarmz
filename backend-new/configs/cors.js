const corsOptions = {
  origin: (origin, callback) => {
    // Get the allowed origins from the environment variable
    const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

    // Check if the incoming origin is in the allowedOrigins list
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("Not allowed by CORS")); // Reject the request
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  credentials: true, // Allow cookies to be sent with requests
};

module.exports = corsOptions;
