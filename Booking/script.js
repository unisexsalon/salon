document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let service = document.getElementById("service");
  let selectedOption = service.options[service.selectedIndex];
  let amount = selectedOption.getAttribute("data-price");

  let bookingDate = document.getElementById("date").value;
  let bookingTime = document.getElementById("time").value;

  if (!amount || !bookingDate || !bookingTime) {
    alert("Please fill all details");
    return;
  }

  let options = {
    "key": "rzp_test_RL6nHRTQKVHKwR", // ⚠️ यहां अपनी Razorpay Key डालना (Dashboard से)
    "amount": amount * 100, // पैसों को पैसे में कन्वर्ट (₹5000 = 500000 paise)
    "currency": "INR",
    "name": "Beauty Parlour",
    "description": "Appointment Booking Payment",
    "image": "https://yourlogo.com/logo.png", // अपना लोगो डाल सकते हैं
    "handler": function (response){
        alert("✅ Booking Successful!\nPayment ID: " + response.razorpay_payment_id +
              "\nService: " + selectedOption.value +
              "\nDate: " + bookingDate + " Time: " + bookingTime);
    },
    "prefill": {
        "name": "",
        "email": "",
        "contact": ""
    },
    "theme": {
        "color": "#d6336c"
    }
  };

  let rzp1 = new Razorpay(options);
  rzp1.open();
});
