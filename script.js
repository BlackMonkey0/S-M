const video = document.getElementById('camera');
const canvas = document.getElementById('photoCanvas');
const captureBtn = document.getElementById('captureBtn');
const saveBtn = document.getElementById('saveBtn');
const locationText = document.getElementById('location');

// Iniciar cámara
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => console.error("No se puede acceder a la cámara:", err));

// Tomar foto
captureBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  saveBtn.style.display = 'block'; // Mostrar botón para guardar
});

// Obtener ubicación
navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  locationText.textContent = `Ubicación: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
}, err => {
  console.error("No se puede acceder a la ubicación:", err);
});

// Guardar foto
saveBtn.addEventListener('click', () => {
  const photoData = canvas.toDataURL(); // Imagen en formato base64
  console.log("Foto guardada:", photoData);
  // Guardar ubicación y foto en la base de datos o localStorage
});
