function isValidPhoneNumber(phoneNumber) {
    // Remove non-numeric characters from the phone number
    var numericPhoneNumber = phoneNumber.replace(/\D/g, "");
  
    // Check if the numeric phone number has exactly 10 digits
    return /^\d{10}$/.test(numericPhoneNumber);
  }
  