function generateVirtualID(memberID, districtAbbreviation) {
    let xxx;
    if (memberID < 10) {
        xxx = "110";
    } else if (memberID < 100) {
        xxx = "10";
    } else if (memberID < 1000) {
        xxx = "1";
    } else {
        xxx = "";
    }

    return memberID + districtAbbreviation + xxx + "@fbl";
}

function generateUPICode(virtualID) {
    return `upi://pay?pa=${virtualID}`;
}

function generateQRCode(upiCode) {
    const qrcodeElement = document.getElementById("qrcode");
    qrcodeElement.innerHTML = ""; // Clear existing QR code if any
    const qrCode = new QRCode(qrcodeElement, {
        text: upiCode,
        width: 300,
        height: 300,
    });
}

function onSubmit() {
    const memberID = parseInt(document.getElementById("member_id").value);
    const districtDropdown = document.getElementById("district");
    const districtAbbreviation = districtDropdown.value;

    if (!memberID || isNaN(memberID)) {
        alert("Please enter a valid Member ID (digits only).");
        return;
    }

    if (districtAbbreviation === "") {
        alert("Please select a district from the dropdown.");
        return;
    }

    const virtualID = generateVirtualID(memberID, districtAbbreviation);
    const upiCode = generateUPICode(virtualID);

    document.getElementById("generated_id").textContent = virtualID;
    document.getElementById("generated_upi").textContent = upiCode;

    generateQRCode(upiCode); // Generate and display the QR code
}

function onClear() {
    document.getElementById("member_id").value = "";
    document.getElementById("district").value = "";
    document.getElementById("generated_id").textContent = "";
    document.getElementById("generated_upi").textContent = "";
    document.getElementById("qrcode").innerHTML = ""; // Clear QR code when clearing form
}
