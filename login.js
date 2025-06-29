<script>
let checkerData = [];

async function fetchCheckerData() {
  const response = await fetch('https://opensheet.elk.sh/Mobilisasi%20Truk%20Pengurukan/checker');
  const data = await response.json();
  checkerData = data;

  const checkerSelect = document.getElementById('checkerName');
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.Nama;
    option.textContent = item.Nama;
    checkerSelect.appendChild(option);
  });
}

function loginChecker() {
  const name = document.getElementById('checkerName').value;
  const password = document.getElementById('password').value;
  const checker = checkerData.find(c => c.Nama === name && c.Password === password);

  if (!checker) {
    document.getElementById('message').textContent = 'User belum ter registrasi, hubungi admin No. HP: 08112642258';
  } else {
    localStorage.setItem('checkerName', name);
    window.location.href = 'project.html';
  }
}

window.onload = fetchCheckerData;
</script>