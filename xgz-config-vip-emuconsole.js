(function () {

  // DATABASE
  const dataxgzconfig = {
    namexgzconfig: "",
    lastupdatedxgzconfig: ""
  };

  let n = "";
  let scenexgz = 0;

  function main() {
    console.clear();
    mainmenu();
  }

  window.mainmenu = function(){
    bot(n);
    bot(`
[ MAIN MENU ]
1. ⚡ Change let/var
    `);
    bot(`<input id="ch">`);
    bot(`<button onclick="ok()">OK</button>`);
  };

  window.ok = function(){
    if(scenexgz === 0 && window.ch?.value === "1"){
      changeletvar();
    } else {
      mainmenu();
    }
  };

  window.changeletvar = function(){
    const namev = prompt("Nama variabel (let/var):");
    const newValue = prompt("Nilai baru:");

    try {
      let formattedValue = isNaN(newValue)
        ? `'${newValue}'`
        : newValue;

      eval(namev + " = " + formattedValue);
      alert("Berhasil mengubah " + namev);

    } catch(e) {
      alert("Gagal:\n" + e);
    }
  };

  // LOAD DATABASE DULU
  Promise.all([
    fetch("https://raw.githubusercontent.com/kenzz-sz/XGZ/refs/heads/main/lastupdated.txt").then(r => r.text()),
    fetch("https://raw.githubusercontent.com/kenzz-sz/XGZ/refs/heads/main/namexgz.txt").then(r => r.text())
  ]).then(([last, name]) => {
    dataxgzconfig.lastupdatedxgzconfig = last.trim();
    dataxgzconfig.namexgzconfig = name.trim();

    n = `
${dataxgzconfig.namexgzconfig}
Last update: ${dataxgzconfig.lastupdatedxgzconfig}
    `;

    main(); // ← BARU START
  });

})();
