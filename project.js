
let truckData = [];

async function initProjectForm() {
  const name = localStorage.getItem('checkerName');
  if (!name) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('checkerName').textContent = name;
  document.getElementById('currentDate').textContent = new Date().toLocaleString();

  const response = await fetch('https://opensheet.elk.sh/1fMErLbsU--Lo10rgiT230yfIg6feVa1EpkSZqbg186A/Truck');
  truckData = await response.json();
  console.log("Data truk terambil:", truckData);
}

function logout() {
  localStorage.removeItem('checkerName');
  window.location.href = 'index.html';
}

async function submitForm() {
  const plat = document.getElementById('plat').value.trim();
  const validasi = document.getElementById('validasi').value;
  const checker = localStorage.getItem('checkerName');

  const isValid = truckData.some(truck => truck['No Plat']?.toLowerCase().replace(/\s+/g, '') === plat.toLowerCase().replace(/\s+/g, ''));
  if (!isValid) {
    alert('Plat nomor tidak terdaftar di sheet Truck!\nPastikan persis sama dengan data di spreadsheet.');
    return;
  }

  const payload = { checker, plat, validasi };

  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycby8o2lYoAZx5wW3piusxivE_Y-jCDkhI4F8tZ2pQr6r10QqrMFJKCSBstQsYNkFk58a/exec', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' }
    });
    const text = await res.text();
    console.log("Response dari Apps Script:", text);

    if (text === "OK") {
      window.location.href = 'konfirmasi.html';
    } else {
      alert("Gagal menyimpan data. Coba lagi nanti.");
    }
  } catch (err) {
    console.error("Gagal kirim data:", err);
    alert("Terjadi kesalahan saat mengirim data.");
  }
}
