let checkerData = [];

async function fetchCheckerData() {
  const message = document.getElementById('message');
  try {
    const response = await fetch('https://opensheet.elk.sh/1fMErLbsU--Lo10rgiT230yfIg6feVa1EpkSZqbg186A/checker');
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      message.textContent = "Data checker tidak ditemukan. Cek spreadsheet atau koneksi internet.";
      return;
    }

    checkerData = data;
    const checkerSelect = document.getElementById('checkerName');

    data.forEach(item => {
      const option = document.createElement('option');
      option.value = item.Nama;
      option.textContent = item.Nama;
      checkerSelect.appendChild(option);
    });

  } catch (error) {
    console.error("Fetch error:", error);
    message.textContent = "Gagal mengambil data checker. Cek koneksi internet atau spreadsheet.";
  }
}

function loginChecker() {
  const name = document.getElementById('checkerName').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  const checker = checkerData.find(c => c.Nama === name && c.Password === password);

  if (!checker) {
    message.textContent = 'User belum ter registrasi, hubungi admin No. HP: 08112642258';
  } else {
    localStorage.setItem('checkerName', name);
    window.location.href = 'project.html';
  }
}

window.onload = fetchCheckerData;
