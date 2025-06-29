
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
}

function logout() {
  localStorage.removeItem('checkerName');
  window.location.href = 'index.html';
}

async function submitForm() {
  const plat = document.getElementById('plat').value.trim();
  const photo1 = document.getElementById('photo1').files[0];
  const photo2 = document.getElementById('photo2').files[0];
  const validasi = document.getElementById('validasi').value;
  const checker = localStorage.getItem('checkerName');

  const isValid = truckData.some(truck => truck['No Plat']?.toLowerCase() === plat.toLowerCase());
  if (!isValid) {
    alert('Plat nomor tidak terdaftar!');
    return;
  }

  console.log('Data Siap Dikirim:', { checker, plat, validasi });
  window.location.href = 'konfirmasi.html';
}
