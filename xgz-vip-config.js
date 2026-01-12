(function() {
    // --- DATABASE CUSTOM BUTTONS (Bisa kamu tambah di sini) ---
    const customScripts = [
        { 
    name: "⚡ Change let/var", 
    code: `
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
    ` 
},
        {
    name: "📠 Open Console",
    code: `
    (function() {
    // 1. CONTAINER UTAMA
    var shell = document.createElement('div');
    shell.style.position = 'fixed';
    shell.style.top = '20px';
    shell.style.left = '20px';
    shell.style.width = '350px';
    shell.style.height = '450px';
    shell.style.background = '#121212';
    shell.style.color = '#00ff00';
    shell.style.fontFamily = 'monospace';
    shell.style.zIndex = '1000000';
    shell.style.border = '1px solid #444';
    shell.style.display = 'flex';
    shell.style.flexDirection = 'column';
    shell.style.boxShadow = '0 10px 40px rgba(0,0,0,0.8)';
    shell.style.borderRadius = '12px';
    shell.style.overflow = 'hidden';
    shell.style.touchAction = 'none';

    // 2. HEADER
    var header = document.createElement('div');
    header.style.padding = '12px';
    header.style.background = '#222';
    header.style.cursor = 'move';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.borderBottom = '1px solid #333';
    header.style.userSelect = 'none';
    header.innerHTML = '<span style="font-weight:bold; color:#eee; font-size:13px;">console</span>';
    
    var controls = document.createElement('div');
    var clearBtn = document.createElement('button');
    clearBtn.innerHTML = 'CLR';
    clearBtn.style.background = 'transparent';
    clearBtn.style.border = 'none';
    clearBtn.style.color = '#aaa';
    clearBtn.style.cursor = 'pointer';
    clearBtn.style.marginRight = '10px';
    
    var hideBtn = document.createElement('button');
    hideBtn.textContent = '-';
    hideBtn.style.background = '#444';
    hideBtn.style.color = '#fff';
    hideBtn.style.border = 'none';
    hideBtn.style.width = '28px';
    hideBtn.style.height = '28px';
    hideBtn.style.borderRadius = '6px';
    hideBtn.style.cursor = 'pointer';
    
    controls.appendChild(clearBtn);
    controls.appendChild(hideBtn);
    header.appendChild(controls);
    shell.appendChild(header);

    // 3. LOG AREA
    var logArea = document.createElement('div');
    logArea.style.flex = '1';
    logArea.style.overflowY = 'auto';
    logArea.style.padding = '12px';
    logArea.style.fontSize = '12px';
    logArea.style.background = '#000';
    shell.appendChild(logArea);

    // 4. TEXTAREA & RUN
    var inputArea = document.createElement('div');
    inputArea.style.display = 'flex';
    inputArea.style.flexDirection = 'column';
    inputArea.style.background = '#1a1a1a';
    inputArea.style.padding = '8px';
    
    var textarea = document.createElement('textarea');
    textarea.style.background = '#222';
    textarea.style.border = '1px solid #444';
    textarea.style.color = '#fff';
    textarea.style.outline = 'none';
    textarea.style.height = '80px';
    textarea.style.padding = '8px';
    textarea.style.borderRadius = '6px';
    textarea.placeholder = '>';
    
    var runBtn = document.createElement('button');
    runBtn.innerHTML = 'execute';
    runBtn.style.background = '#00ff00';
    runBtn.style.border = 'none';
    runBtn.style.padding = '10px';
    runBtn.style.marginTop = '8px';
    runBtn.style.cursor = 'pointer';
    runBtn.style.fontWeight = 'bold';
    
    inputArea.appendChild(textarea);
    inputArea.appendChild(runBtn);
    shell.appendChild(inputArea);
    document.body.appendChild(shell);

    // --- FUNGSI PRINT ---
    var print = function(msg, col) {
        var color = col || '#00ff00';
        var div = document.createElement('div');
        div.style.color = color;
        div.style.marginBottom = '6px';
        div.style.whiteSpace = 'pre-wrap';
        div.style.wordBreak = 'break-all';
        
        if (typeof msg === 'object') {
            try { div.textContent = JSON.stringify(msg, null, 2); } 
            catch (e) { div.textContent = String(msg); }
        } else {
            div.textContent = String(msg);
        }
        
        logArea.appendChild(div);
        logArea.scrollTop = logArea.scrollHeight;
    };

    // Hijack Console
    var oldLog = console.log;
    console.log = function() {
        var args = Array.prototype.slice.call(arguments);
        oldLog.apply(console, args);
        print(args.join(' '), '#ffffff');
    };

    // --- EKSEKUTOR ---
    var runCode = function() {
        var code = textarea.value.trim();
        if (!code) return;
        try {
            var result = window.eval(code);
            if (result !== undefined) print(result, '#00ffff');
        } catch (err) {
            print('Error: ' + err.message, '#ff4444');
        }
    };

    runBtn.onclick = runCode;
    clearBtn.onclick = function() { logArea.innerHTML = ''; };

    // --- DRAG & HIDE ---
    var isMin = false;
    hideBtn.onclick = function() {
        isMin = !isMin;
        logArea.style.display = isMin ? 'none' : 'block';
        inputArea.style.display = isMin ? 'none' : 'flex';
        shell.style.height = isMin ? '52px' : '450px';
        hideBtn.textContent = isMin ? '+' : '-';
    };

    var ox, oy, isDragging = false;
    var start = function(e) {
        if (e.target === textarea || e.target === runBtn || e.target === hideBtn) return;
        isDragging = true;
        var t = e.touches ? e.touches[0] : e;
        ox = t.clientX - shell.offsetLeft;
        oy = t.clientY - shell.offsetTop;
    };
    var move = function(e) {
        if (!isDragging) return;
        var t = e.touches ? e.touches[0] : e;
        shell.style.left = (t.clientX - ox) + 'px';
        shell.style.top = (t.clientY - oy) + 'px';
    };
    var stop = function() { isDragging = false; };

    header.addEventListener('mousedown', start);
    header.addEventListener('touchstart', start);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move);
    window.addEventListener('mouseup', stop);
    window.addEventListener('touchend', stop);

    print('Start up console sucsess');
})();

    `},
        { name: "📲 run local file js", code: `
        (function() {
    // 1. Buat elemen input file secara dinamis
    var inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = '.js';
    inputFile.style.display = 'none';

    // 2. Tambahkan ke body sementara (beberapa browser mewajibkan ini)
    document.body.appendChild(inputFile);

    // 3. Atur logika saat file dipilih
    inputFile.onchange = function(event) {
        var file = event.target.files[0];
        if (!file) {
            console.log('Tidak ada file yang dipilih.');
            return;
        }

        var reader = new FileReader();

        reader.onload = function(e) {
            var kontenScript = e.target.result;
            console.log('--- Memulai Eksekusi: ' + file.name + ' ---');
            
            try {
                // Menggunakan constructor Function untuk menjalankan kode
                var eksekusi = new Function(kontenScript);
                eksekusi();
                
                console.log('--- Eksekusi Selesai ---');
            } catch (err) {
                console.error('Terjadi error saat menjalankan file JS:');
                console.error(err);
            }

            // Hapus elemen input setelah selesai
            document.body.removeChild(inputFile);
        };

        reader.onerror = function() {
            console.error('Gagal membaca file.');
        };

        reader.readAsText(file);
    };

    // 4. Klik otomatis untuk membuka jendela pilih file
    inputFile.click();
})();

        ` },
        {
         name: "🌈 Disco Mode", code: "setInterval(() => document.body.style.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16), 200)" },
        {
         name: "🌙 Dark Invert", code: "document.body.style.filter = 'invert(1) hue-rotate(180deg)'" },
        {
         name: "🛡️ Remove Ads", code: "document.querySelectorAll('iframe, .ads, #ad').forEach(el => el.remove())" }
    ];

    // 1. INJEKSI CSS ANIMASI & UI
    const style = document.createElement('style');
    style.innerHTML = `
        .n-gui { position: fixed; top: 60px; left: 20px; width: 300px; background: rgba(15, 15, 15, 0.95); backdrop-filter: blur(12px); border: 1px solid #333; border-radius: 15px; color: white; font-family: sans-serif; z-index: 100000; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); transition: transform 0.3s; }
        .n-header { padding: 15px; background: #222; cursor: move; display: flex; justify-content: space-between; font-weight: bold; border-bottom: 1px solid #444; }
        .n-cat-head { padding: 12px; background: #1a1a1a; border-bottom: 1px solid #333; cursor: pointer; display: flex; justify-content: space-between; transition: 0.3s; }
        .n-cat-head:hover { background: #252525; }
        .n-cat-body { max-height: 0; overflow: hidden; transition: max-height 0.4s ease; background: rgba(0,0,0,0.2); }
        .n-cat-body.active { max-height: 400px; overflow-y: auto; padding-bottom: 10px; }
        .n-search-box { width: 90%; margin: 10px 5%; padding: 8px; border-radius: 5px; border: 1px solid #444; background: #000; color: #0cf; font-size: 12px; }
        .n-item { padding: 8px 15px; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items: center; font-size: 11px; }
        .n-btn-action { background: #0cf; color: #000; border: none; padding: 4px 8px; border-radius: 4px; font-weight: bold; cursor: pointer; }
        .n-unhide { position: fixed; top: 10px; left: 50%; transform: translateX(-50%); background: rgba(0,0,0,0.5); color: white; padding: 10px 20px; border-radius: 20px; cursor: pointer; display: none; border: 1px solid #0cf; z-index: 100001; }
    `;
    document.head.appendChild(style);

    // 2. MAIN CONTAINER
    const gui = document.createElement('div');
    gui.className = "n-gui";
    
    const unhide = document.createElement('div');
    unhide.className = "n-unhide";
    unhide.innerText = "+";
    unhide.onclick = () => { gui.style.display = "block"; unhide.style.display = "none"; };

    const header = document.createElement('div');
    header.className = "n-header";
    header.innerHTML = `<span>XGZ VIP</span><span id="cls" style="cursor:pointer; color:red;">-</span>`;
    gui.appendChild(header);
    header.querySelector('#cls').onclick = () => { gui.style.display = "none"; unhide.style.display = "block"; };

    // 3. FUNGSI BUAT KATEGORI
    function makeCategory(title, placeholder) {
        const wrap = document.createElement('div');
        const head = document.createElement('div');
        head.className = "n-cat-head";
        head.innerHTML = `<span>${title}</span><span>▼</span>`;
        
        const body = document.createElement('div');
        body.className = "n-cat-body";
        
        const search = document.createElement('input');
        search.className = "n-search-box";
        search.placeholder = placeholder;
        
        const list = document.createElement('div');
        
        // Logic Search
        search.oninput = () => {
            const val = search.value.toLowerCase();
            Array.from(list.children).forEach(item => {
                const text = item.innerText.toLowerCase();
                item.style.display = text.includes(val) ? "flex" : "none";
            });
        };

        head.onclick = () => body.classList.toggle('active');
        
        body.appendChild(search);
        body.appendChild(list);
        wrap.appendChild(head);
        wrap.appendChild(body);
        gui.appendChild(wrap);
        return list;
    }

    // 4. TAB KATEGORI
    const listID = makeCategory("🆔 ELEMENT IDs", "Search ID...");
    const listVar = makeCategory("📦 WINDOW VARS", "Search Variables...");
    const listCust = makeCategory("🛠️ CUSTOM BUTTONS", "Search Buttons...");
    const listExec = makeCategory("💻 JS EXECUTOR", "Executor Mode");

    // 5. SCANNER LOGIC (ID & VARS)
    function scanPage() {
        listID.innerHTML = "";
        listVar.innerHTML = "";

        // Scan IDs
        document.querySelectorAll('[id]').forEach(el => {
            const item = document.createElement('div');
            item.className = "n-item";
            item.innerHTML = `<span style="color:#0cf">${el.id}</span>`;
            const btn = document.createElement('button');
            btn.className = "n-btn-action";
            btn.innerText = "EDIT";
            btn.onclick = () => { let v = prompt("Ganti text ID: " + el.id); if(v) el.innerText = v; };
            item.appendChild(btn);
            listID.appendChild(item);
        });

        // Scan Global Vars (Window)
        Object.keys(window).slice(0, 100).forEach(key => {
            if(typeof window[key] !== 'function') {
                const item = document.createElement('div');
                item.className = "n-item";
                item.innerHTML = `<span style="color:#f0f">${key}</span>`;
                const btn = document.createElement('button');
                btn.className = "n-btn-action";
                btn.innerText = "SET";
                btn.onclick = () => { let v = prompt("Set value untuk: " + key); if(v) window[key] = v; };
                item.appendChild(btn);
                listVar.appendChild(item);
            }
        });
    }

    // 6. ISI CUSTOM BUTTONS
    customScripts.forEach(data => {
        const item = document.createElement('div');
        item.className = "n-item";
        item.innerHTML = `<span>${data.name}</span>`;
        const btn = document.createElement('button');
        btn.className = "n-btn-action";
        btn.innerText = "RUN";
        btn.onclick = () => { try { eval(data.code) } catch(e) { alert(e) } };
        item.appendChild(btn);
        listCust.appendChild(item);
    });

    // 7. JS EXECUTOR AREA
    const area = document.createElement('textarea');
    area.style.cssText = "width:90%; margin:10px 5%; height:80px; background:#000; color:#0f0; border:1px solid #333; border-radius:5px; font-family:monospace; font-size:10px; padding:5px;";
    area.placeholder = "// Ketik script di sini...";
    listExec.appendChild(area);
    const runBtn = document.createElement('button');
    runBtn.className = "n-btn-action";
    runBtn.style.cssText = "width:90%; margin:0 5% 10px 5%; padding:10px;";
    runBtn.innerText = "EXECUTE CODE";
    runBtn.onclick = () => { try { eval(area.value) } catch(e) { alert(e) } };
    listExec.appendChild(runBtn);

    // 8. MOBILE DRAG LOGIC
    let isDrag = false, startX, startY;
    header.addEventListener('touchstart', e => {
        isDrag = true;
        startX = e.touches[0].clientX - gui.offsetLeft;
        startY = e.touches[0].clientY - gui.offsetTop;
    });
    document.addEventListener('touchmove', e => {
        if(!isDrag) return;
        gui.style.left = (e.touches[0].clientX - startX) + "px";
        gui.style.top = (e.touches[0].clientY - startY) + "px";
    });
    document.addEventListener('touchend', () => isDrag = false);

    // RENDER
    document.body.appendChild(gui);
    document.body.appendChild(unhide);
    scanPage();
})();
