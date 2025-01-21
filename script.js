function convertToAiken() {
    const inputText = document.getElementById('inputText').value.trim();
    if (!inputText) {
        alert("Silakan masukkan soal terlebih dahulu.");
        inputInfoText.textContent = '';
        outputInfoText.textContent = '';
        return;
    }

    const questions = inputText.split(/\n\s*\n/); // Memisahkan soal berdasarkan baris kosong
    let result = '';
    let convertedCount = 0; // Counter untuk soal yang berhasil dikonversi

    questions.forEach(questionBlock => {
        const lines = questionBlock.split('\n').map(line => line.trim());
        if (lines.length < 7) {
            alert("Pastikan setiap soal memiliki 7 bagian (pertanyaan, 5 pilihan, jawaban).");
            return;
        }

        const question = lines[0].replace(/^\d+\.\s*/, '').trim();
        const optionA = lines[1].replace(/^\s*A\.\s*/i, '').trim();
        const optionB = lines[2].replace(/^\s*B\.\s*/i, '').trim();
        const optionC = lines[3].replace(/^\s*C\.\s*/i, '').trim();
        const optionD = lines[4].replace(/^\s*D\.\s*/i, '').trim();
        const optionE = lines[5].replace(/^\s*E\.\s*/i, '').trim();
        const answerLine = lines[6];
        const answer = answerLine.split(':')[1]?.trim().toUpperCase();

        if (!question || !optionA || !optionB || !optionC || !optionD || !optionE || !answer) {
            alert("Pastikan semua bagian soal (pertanyaan, pilihan, jawaban) diisi dengan benar.");
            return;
        }

        result += `${question}\n`;
        result += `A. ${optionA}\n`;
        result += `B. ${optionB}\n`;
        result += `C. ${optionC}\n`;
        result += `D. ${optionD}\n`;
        result += `E. ${optionE}\n`;
        result += `ANSWER: ${answer}\n\n`;

        convertedCount++;
    });

    document.getElementById('outputText').value = result;
    
    inputInfoText.textContent = `Jumlah soal yang diinput: ${questions.length}.`;
    if (convertedCount > 0) {
        outputInfoText.textContent = `Jumlah soal yang berhasil dikonversi: ${convertedCount}.`;
    } else {
        outputInfoText.textContent = "Tidak ada soal yang berhasil dikonversi.";
    }

}

function resetFields() {
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';
}

function downloadOutput() {
    const outputText = document.getElementById('outputText').value.trim();
    if (!outputText) {
        alert("Tidak ada output untuk diunduh.");
        return;
    }

    const blob = new Blob([outputText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'output_aiken.txt';
    link.click();
}
