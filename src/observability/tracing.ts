import tracer from "dd-trace";

tracer.init({
  service: "my-service",
  env: "production",
  version: "1.0.0",
  plugins: true,
});

tracer.use("express", {
  service: "my-service",
  hooks: {
    request: (span, req, res) => {
      if (res && res.statusCode >= 500) {
        if (span) {
          span.setTag("error", true);
        }
      }
    },
  },
});

export default tracer;
