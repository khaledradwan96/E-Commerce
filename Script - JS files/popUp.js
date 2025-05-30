// ============ Pop up ============
function popupWindow(message){
    const overlay = document.createElement('div');
    overlay.id = 'popupOverlay';
    // Create overlay
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    // Create popup box
    const popupBox = document.createElement('div');
    popupBox.style.cssText = `
        background-color: white;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        min-width: 300px;
        position: relative;
        text-align: center;
    `;

    // Create message
    const popupMessage = document.createElement('div');
    popupMessage.style.cssText = `
        font-size: 20px;
        margin: 0;
        `
    popupMessage.innerHTML = message;

    // Create header
    const popupHeader = document.createElement('div');
    popupHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            border-bottom: 2px solid #ddd;
            margin-bottom: 15px;
            `
    const popupDots = document.createElement('span');
    popupDots.innerHTML = `
            <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #dc3545;"></span>
            <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #198754;"></span>
            <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #ffc107;"></span>
            `;

    // Create close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        font-size: 25px;
        cursor: pointer;
    `;
    // Append all elements to the popup box and overlay
    popupHeader.appendChild(popupDots);
    popupHeader.appendChild(closeBtn);
    popupBox.appendChild(popupHeader);
    popupBox.appendChild(popupMessage);
    overlay.appendChild(popupBox);
    document.body.appendChild(overlay);

    // Add event listeners for close button and hover effects
    closeBtn.onmouseover = () => closeBtn.style.color = 'red';
    closeBtn.onmouseout = () => closeBtn.style.color = 'black';
    closeBtn.onclick = () => closePopup();


    // Close the popup when pressing the Escape key
    document.addEventListener('keydown', (e) => {
        e.stopPropagation(); // Prevent event bubbling
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    // Close the popup when clicking outside of it
    overlay.onclick = (e) => {
        if (e.target === overlay) {
            closePopup();
        }
    };
}

// Function to close the popup
function closePopup() {
    const overlay = document.getElementById('popupOverlay');
    if (!overlay) return; // If overlay doesn't exist, do nothing
    document.body.removeChild(overlay);
}