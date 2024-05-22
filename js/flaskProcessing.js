async function predictFracture(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

window.predictFracture = predictFracture;