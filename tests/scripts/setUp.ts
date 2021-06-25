import { spawn } from "child_process";

// We hook to serverless offline when firing its process
const SERVER_OK = `Offline [HTTP] listening on http://localhost`;

const setupServer = (process: any) => {
  return new Promise((resolve, reject) => {
    process.stdout.setEncoding("utf-8").on("data", (stream: any) => {
      console.log(stream);
      if (stream.includes(SERVER_OK)) {
        resolve(process);
      }
    });

    process.stderr.setEncoding("utf-8").on("data", (stream: any) => {
      // Need to check in the pipeline whether we want to exit if dynamoDB is already running
      // can define another port for dynamoDB if it is the case, and we have one dynamoDB instance per service...
      // seems to be what caused the issue
      console.log(stream);
      reject(stream);
      // if (stream.includes(ADDRESS_ALREADY_IN_USE)) {
      //   reject(new Error("PORTS already in use, Bye!"));
      // }
    });

    // process.on("exit", (code: any) =>
    //   console.info(`process terminated with code: ${code}`)
    // );
  });
};

const server = spawn("npm", ["run", "start"], {
  detached: true,
});

module.exports = async () => {
  console.log(`\nSetting up Integration tests...\n\n`);
  try {
    const instance = await setupServer(server);
    // @ts-ignore
    const { pid } = instance;
    console.info(`
      server running ✅ ...
      on pid: ${pid}`);
    // @ts-ignore
    global.__SERVER__ = instance;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
