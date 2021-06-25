/* @ts-ignore */
module.exports = async () => {
  console.log(`
      Integration tests ✅
      ...Tearing down Integrations tests...
    `);
  // @ts-ignore
  const { pid } = global.__SERVER__;
  // @ts-ignore
  global.__SERVER__.on("close", () => {
    // @ts-ignore
    console.log(`Killed pid: ${pid}...
    `);
    // process.exit(0);
    Promise.resolve("✔");
  });
  process.kill(pid);
};
