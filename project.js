<!-- project.js -->
<script>
let truckData = [];

async function initProjectForm() {
  const name = localStorage.getItem('checkerName');
  if (!name) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('checkerName').textContent = name;
  document.getElementById('currentDate').textContent = new Date().toLocaleString('id-ID');

  const response = await fetch('https://opensheet.elk.sh/1fMErLbsU--Lo10rgiT230yfIg6feVa1EpkSZqbg186A/truck');
  truckData = await response.json();
}

function submitForm() {
  const plat = document.getElementById('plat').value;
  const isValid = truckData.some(truck => truck['No Plat']?.toLowerCase() === plat.toLowerCase());

  if (!isValid) {
    alert('Plat nomor tidak terdaftar!');
    return;
  }

  // Simpan data ke database jika pakai backend atau Google Apps Script (perlu tambahan)

  window.location.href = 'konfirmasi.html';
}

function logout() {
  localStorage.removeItem('checkerName');
  window.location.href = 'index.html';
}
</script>
