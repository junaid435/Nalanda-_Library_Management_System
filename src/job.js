import https from "https";
import cron from "node-cron";

function pingServer() {
  console.log("Pinging server to keep it alive...");

  const options = {
    hostname: "https://nalanda-library-management-system-8iza.onrender.com",
    method: "GET",
    timeout: 60000,
  };

  const req = https.request(options, (res) => {
    console.log(`Ping response: ${res.statusCode}`);
  });

  req.on("timeout", () => {
    req.destroy();
    console.error("Request timed out");
  });

  req.on("error", (err) => {
    console.error("Ping error:", err.message);
  });

  req.end();
}

const job = cron.schedule("*/14 * * * *", pingServer);
job.start();
export default job;
