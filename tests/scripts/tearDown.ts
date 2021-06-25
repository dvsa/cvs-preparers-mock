const destroyProcess = (process: any) =>
  new Promise((resolve) => {
    process.kill();
    resolve({ message: "✔", pid: process.pid });
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
  } catch (e) {
    console.info(`Couldn't kill process`);
    console.error(`Error: ${e}`);
  }
};
