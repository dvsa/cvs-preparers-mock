import { killTestSetup } from "./destroyServices";

// const destroyProcess = (process: any) =>
//   new Promise((resolve) => {
//     process.kill();
//     resolve({ message: "✔", pid: process.pid });
//   });

module.exports = async () => {
  console.log(`
      Integration tests ✅
      ...Tearing down tests...
    `);

  // console.log(process.env);

  // Serverless runs containers and pid's are not managed the same way in the CI/CD pipeline
  // We are not using the pid of our instance to kill the task
  // instead created sh commands to manually kill the webserver and dynamoDB instances which work equally in the pipeline

  try {
    await killTestSetup();
    console.log("processes killed");
  } catch (e) {
    console.log("Can not kill processes");
    console.error(e);
  }

  // try {
  //   // @ts-ignore
  //   const { pid, message } = await destroyProcess(global.__SERVER__);
  //   console.log(`destroyed process: ${pid} -> ${message}`);
  // } catch (e) {
  //   console.info(`Couldn't kill process`);
  //   console.error(`Error: ${e}`);
  // }
};
