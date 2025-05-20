const form = document.getElementById('dataForm');
const successMessage = document.getElementById('successMessage');

// Load existing entries from localStorage or initialize empty array
let dataEntries = [];
const savedEntries = localStorage.getItem('profileDataEntries');
if (savedEntries) {
  try {
    dataEntries = JSON.parse(savedEntries);
  } catch {
    dataEntries = [];
  }
}

function clearErrors() {
  ['profileCodeError', 'profileNameError', 'profileTypeError', 'cutLengthError', 'weightPerMeterError', 'availableStockError'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

function validateInputs(data) {
  let valid = true;
  clearErrors();

  if (!data.profileCode.trim()) {
    document.getElementById('profileCodeError').textContent = 'Profile Code is required.';
    valid = false;
  }
  if (!data.profileName.trim()) {
    document.getElementById('profileNameError').textContent = 'Profile Name is required.';
    valid = false;
  }
  if (!data.profileType.trim()) {
    document.getElementById('profileTypeError').textContent = 'Profile Type is required.';
    valid = false;
  }
  if (isNaN(data.cutLength) || data.cutLength < 1) {
    document.getElementById('cutLengthError').textContent = 'Length must be a positive number.';
    valid = false;
  }
  if (isNaN(data.weightPerMeter) || data.weightPerMeter < 0.001) {
    document.getElementById('weightPerMeterError').textContent = 'Weight Per Meter must be a positive number.';
    valid = false;
  }
  if (!Number.isInteger(Number(data.availableStock)) || data.availableStock < 0) {
    document.getElementById('availableStockError').textContent = 'Available Stock must be zero or a positive integer.';
    valid = false;
  }
  return valid;
}

function clearForm() {
  form.reset();
}

form.addEventListener('submit', event => {
  event.preventDefault();
  successMessage.style.display = 'none';

  const formData = {
    profileCode: form.profileCode.value.trim(),
    profileName: form.profileName.value.trim(),
    profileType: form.profileType.value.trim(),
    cutLength: parseInt(form.cutLength.value, 10),
    weightPerMeter: parseFloat(form.weightPerMeter.value),
    availableStock: parseInt(form.availableStock.value, 10)
  };

  if (!validateInputs(formData)) {
    return;
  }

  dataEntries.push(formData);
  
  // Save updated entries to localStorage
  localStorage.setItem('profileDataEntries', JSON.stringify(dataEntries));
  
  successMessage.style.display = 'block';
  clearForm();
});
