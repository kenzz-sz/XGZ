(function() {
  window.startup = function(){
    bot(`
    ${dataxgzconfig.namexgzconfig}
    ${dataxgzconfig.lastupdatedxgzconfig}
    `)
  };
  
  const dataxgzconfig = {
    "namexgzconfig": "",
    "lastupdatedxgzconfig": ""
  }
  fetch("https://raw.githubusercontent.com/kenzz-sz/XGZ/refs/heads/main/lastupdated.txt")
  .then(res => res.text())
  .then(text => (dataxgzconfig.lastupdatedxgzconfig) = (text));
  fetch("https://raw.githubusercontent.com/kenzz-sz/XGZ/refs/heads/main/namexgz.txt")
  .then(res => res.text())
  .then(text => (dataxgzconfig.namexgzconfig) = (text));
  
  system("clear")
  d(1000, "startup()")
})();

