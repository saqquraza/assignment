$(document).ready(function () {
    // Declare variables in a wider scope
    var storedDialCode, storedMobileNumber;
  
    // Clear the input fields and error messages when the modal is about to be shown
    $("#myModal").on("show.bs.modal", function () {
      $("#amount").val("");
      $("#currency").val("usd");
      $("#amountError").text("");
    });
  
    $("#submit").click(function () {
      var amount = $("#amount").val();
      if (!amount) {
        $("#amountError").text("Please enter amount");
      } else {
        // Display the selected amount and currency in the payment modal
        $("#selectedAmountCurrency").text(
          "Amount: " + amount + " " + $("#currency").val()
        );
        $("#myModal").modal("hide");
        // Clear the data in the Payment Details modal on show
        $("#paymentModal").on("show.bs.modal", function () {
          $("#dialCode").val("");
          $("#mobileNumber").val("");
        });
        $("#paymentModal").modal("show");
      }
    });
  
    $("#paymentGateway").change(function () {
      // Show the mobile number view for any selected payment gateway
      $("#mobileNumberView").show();
    });
  
    $("#submitPayment").click(function () {
      var selectedGateway = $("#paymentGateway").val();
      var dialCode = $("#dialCode").val();
      var mobileNumber = $("#mobileNumber").val();
  
      // Perform validation (add more as needed)
      if (!dialCode || !mobileNumber || !isValidPhoneNumber(mobileNumber)) {
        alert(
          "Please select dial code and enter a valid 10-digit mobile number"
        );
      } else {
        // Clear the mobile number error
        $("#mobileNumberError").text("");
  
        // Store the mobile number and dial code for later use
        storedMobileNumber = mobileNumber;
        storedDialCode = dialCode;
  
        // Hide the payment modal
        $("#paymentModal").modal("hide");
        $("#paymentGateway").val("");
        $("#dialCode").val("");
        $("#mobileNumber").val("");
        // Show the payment confirmation modal
        $("#paymentConfirmationAmount").text(
          $("#selectedAmountCurrency").text()
        );
  
        // Dynamically populate the payment method content
        var paymentMethodContent = "<label>" + selectedGateway + ":</label>";
        paymentMethodContent += "<input type='text' class='form-control'>";
        $("#paymentMethodContent").html(paymentMethodContent);
        $("#confirmationPaymentMethod").val(selectedGateway);
  
        // Display the stored mobile number in the confirmation modal
        $("#confirmationMobileNumber").val(
          storedDialCode + " " + storedMobileNumber
        );
  
        // Show the payment confirmation modal
        $("#paymentConfirmationModal").modal("show");
      }
    });
  
    // Handle the submit button in the payment confirmation modal
    $("#submitPaymentConfirmation").click(function () {
      // Hide the payment confirmation modal
      $("#paymentConfirmationModal").modal("hide");
  
      // Show the payment success modal
      $("#paymentSuccessAmount").text($("#selectedAmountCurrency").text());
      $("#successMobileNumber").val(
        storedDialCode + " " + storedMobileNumber
      );
      $("#paymentSuccessModal").modal("show");
    });
  
    // Handle the close button in the payment success modal
    $("#submitSuccess").click(function () {
      // Close the payment success modal
      $("#paymentSuccessModal").modal("hide");
      alert("Payment is successful!");
    });
  });
  