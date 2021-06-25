import { spawn } from "child_process";

// We hook to serverless offline when firing its process
const SERVER_OK = `Offline [HTTP] listening on http://localhost`;
// Serverless fires a local dynamo-db instance which is killed once the parent process is terminateds
// the current serverless script checks whether a local instance is running but does not error
// we force throwing an error so we always start from a clean slate.
const DYNAMO_LOCAL_ERROR_THREAD = `Exception in thread "main"`;

const setupServer = (process: any) => {
  return new Promise((resolve, reject) => {
    process.stdout.setEncoding("utf-8").on("data", (stream: any) => {
      console.log(stream);
      if (stream.includes(SERVER_OK)) {
        resolve(process);
      }
    });

    process.stderr.setEncoding("utf-8").on("data", (stream: any) => {
      console.log(stream);
      if (stream.includes(DYNAMO_LOCAL_ERROR_THREAD)) {
        throw new Error("Internal Java process crashed");
      }
      reject(stream);
    });

    process.on("exit", (code: any) =>
      console.info(`process terminated with code: ${code}`)
    );
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
