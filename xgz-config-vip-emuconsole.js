(function() {
  function initGUI() {
  window.startup = function(){
    bot(`
    ${dataxgzconfig.namexgzconfig}
    ${dataxgzconfig.lastupdatedxgzconfig}
    `)
  };
  system("clear")
  d(1000, "startup()")
}
  const dataxgzconfig = {
    "namexgzconfig": "",
    "lastupdatedxgzconfig": ""
  }
  
Promise.all([
  fetch("https://raw.githubusercontent.com/kenzz-sz/XGZ/refs/heads/main/lastupdated.txt").then(r => r.text()),
  fetch("https://raw.githubusercontent.com/kenzz-sz/XGZ/refs/heads/main/namexgz.txt").then(r => r.text())
]).then(([last, name]) => {
  dataxgzconfig.lastupdatedxgzconfig = last.trim();
  dataxgzconfig.namexgzconfig = name.trim();

  initGUI(); // ← BARU JALANKAN GUI
});
})();

