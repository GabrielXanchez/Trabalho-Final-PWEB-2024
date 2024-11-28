document.getElementById('pixButton').addEventListener('click', function() {
    fetch('/criar-preferencia-pix', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            items: [
                {
                    title: 'Produto de Exemplo',
                    quantity: 1,
                    unit_price: 100.00,
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'ok') {
            const preference = data.preference;
            const qrCodeUrl = preference.point_of_interaction.transaction_data.qr_code;
            
    
            const qrCodeCanvas = document.getElementById('qrCodeCanvas');
            new QRCode(qrCodeCanvas, qrCodeUrl);
            
            // Exibir o modal com o QR Code
            document.getElementById('qrCodeModal').classList.remove('hidden');
        }
    })
    .catch(error => {
        console.error('Erro ao criar a preferência:', error);
    });
});

// Fechar o modal do QR Code
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('qrCodeModal').classList.add('hidden');
});
