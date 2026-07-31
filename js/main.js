document.getElementById("connectBtn").addEventListener("click", function(e) {
    e.preventDefault();
    
    // 1. Ambil parameter URL bawaan yang dikirim oleh AP Cambium (IP Gateway, MAC, dll)
    const urlParams = new URLSearchParams(window.location.search);
    const ga_ap_mac = urlParams.get('ga_ap_mac');
    const ga_nas_id = urlParams.get('ga_nas_id');
    const ga_srvr = urlParams.get('ga_srvr'); // Ini IP Access Point Cambium Anda
    const ga_cmac = urlParams.get('ga_cmac');

    // Tampilkan animasi loading pada tombol
    this.innerText = "Connecting...";
    this.disabled = true;

    // 2. Jika parameter dari AP Cambium ditemukan, kirim form otentikasi balik ke AP
    if (ga_srvr) {
        // Buat form tersembunyi untuk POST data ke Cambium
        const form = document.createElement('form');
        form.method = 'POST';
        // URL tujuan otentikasi internal Cambium standar
        form.action = `http://${ga_srvr}:880/cgi-bin/hotspot_login.cgi`; 

        // Parameter wajib agar Cambium tahu user ini memilih Click-through
        const params = {
            ga_ap_mac: ga_ap_mac,
            ga_nas_id: ga_nas_id,
            ga_cmac: ga_cmac,
            ga_user: "guest", // Default user click-through
            ga_pass: "guest",
            login: "Log In"
        };

        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                const hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = key;
                hiddenField.value = params[key];
                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        
        // Tampilkan alert sebelum redirect final
        alert("Anda berhasil terhubung ke Hotspot Resmi BBPMP Provinsi Jawa Timur.");
        form.submit();
    } else {
        // Jika dibuka langsung di browser biasa tanpa konek wifi Cambium
        alert("Anda berhasil terhubung! (Mode Uji Coba Halaman)");
        this.innerText = "ACCEPT & CONNECT";
        this.disabled = false;
    }
});
