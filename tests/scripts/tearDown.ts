module.exports = async () => {
  console.log(`
      Integration tests ✅
      ...Tearing down Integrations tests...
    `);
  // @ts-ignore
  const serverInstance = global.__SERVER__;
  serverInstance.kill();
  console.log(`
      Killed pid: ${serverInstance.pid}...
    `);
};
