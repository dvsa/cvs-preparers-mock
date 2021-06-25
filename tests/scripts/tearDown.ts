const destroyProcess = (process: any) =>
  new Promise((resolve, reject) => {
    try {
      process.kill();
      resolve({ message: "✔", pid: process.pid });
    } catch (e) {
      reject(e);
    }
  });

module.exports = async () => {
  console.log(`
      Integration tests ✅
      ...Tearing down server...
    `);

  try {
    // @ts-ignore
    const { pid, message } = await destroyProcess(global.__SERVER__);
    console.log(`destroyed process: ${pid} -> ${message}`);
    process.exit(0);
  } catch (e) {
    console.info(`Forcefully exiting ${e}`);
    console.error(`Error: ${e}`);
    process.exit(1);
  }
};
