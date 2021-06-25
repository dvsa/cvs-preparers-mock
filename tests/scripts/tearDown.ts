/* @ts-ignore */
module.exports = async () => {
  return new Promise((resolve, reject) => {
    console.log(`
      Integration tests ✅
      ...Tearing down Integrations tests...
    `);

    // console.log("global.__SERVER__");
    // @ts-ignore
    // console.log(global.__SERVER__.kill);
    console.log("process");
    console.log(process);

    // @ts-ignore
    const { pid } = global.__SERVER__;
    console.log("send kill for pid");
    console.log(pid);

    
    // @ts-ignore
    global.__SERVER__.on("exit", (code) => {
      console.log(`process terminated with code ${code}`);
      resolve('ok');
    });

    try {
    // @ts-ignore
      global.__SERVER__.kill();
    } catch(e) {
      console.error(`Couldn't kill process ${e}`)
      reject(e)
    }
    
    // global.__SERVER__.close((err) => {
    //   console.log(err);
    //   if (err) {
    //     return reject(err);
    //   }
    //   // @ts-ignore
    //   console.log(`Killed pid: ${pid}...
    // `);
    //   resolve("✔");
    //   // process.exit(0);
    // });
    
    // process.kill(pid);
  });
};
