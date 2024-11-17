function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                document.getElementById('output').innerHTML = `
                    <p>Latitude: ${latitude}</p>
                    <p>Longitude: ${longitude}</p>
                `;
                initializeMap(latitude, longitude);
            },
            function(error) {
                let errorMessage = '';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Você negou a permissão para acessar a localização.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'A localização não está disponível.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'A solicitação de localização expirou.';
                        break;
                    case error.UNKNOWN_ERROR:
                        errorMessage = 'Ocorreu um erro desconhecido.';
                        break;
                }
                document.getElementById('output').innerHTML = `<p style="color: red;">${errorMessage}</p>`;
            }
        );
    } else {

        document.getElementById('output').innerHTML = '<p style="color: red;">A geolocalização não é suportada pelo seu navegador.</p>';
    }
  }
  
  function initializeMap(latitude, longitude) {
    var map = L.map('map').setView([latitude, longitude], 13); 
  
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Você está aqui')
        .openPopup();
  }