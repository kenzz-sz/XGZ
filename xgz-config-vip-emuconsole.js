(function() {
  function main() {
  const scenexgz = 0
  window.mainmenu = function(){
    bot(n)
    bot(`
    [ MAIN MENU ]
    1. ⚡ Change let/var
    `)
    bot(`<input id="ch">`)
    bot(`<button onclick="ok()",>`)
  };
  window.ok = function(){
    if(scenexgz == 0 && ch.value == "1"){
      changeletvar()
    }
    else{
      main()
    }
  }
  window.changeletvar = function(){
    const namev = prompt("Nama variabel (let/var):");
        const newValue = prompt("Nilai baru:");
        try {
            // Kita gunakan eval untuk melakukan assignment secara paksa
            // Cek apakah nilai baru harus berupa string atau angka
            let formattedValue = isNaN(newValue) ? "'" + newValue + "'" : newValue;
            
            eval(namev + " = " + formattedValue);
            
            alert("Berhasil mengubah " + namev);
            if(typeof scanPage === 'function') scanPage();
        } catch(e) {
            alert("Gagal! Variabel mungkin tidak ada di scope ini atau const.\\nError: " + e);
        }
  }

  
  const n = `
    ${dataxgzconfig.namexgzconfig}<br>
    Last update: ${dataxgzconfig.lastupdatedxgzconfig}
    `
  system("clear")
  d(0, "mainmenu()")
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

  main(); // ← BARU JALANKAN GUI
});
})();

