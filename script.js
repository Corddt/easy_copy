const fileUploadSection = document.getElementById('fileInput').parentNode;
const fileInput = document.getElementById('fileInput');
const displayArea = document.getElementById('fileContent');

fileInput.addEventListener('change', handleFiles);
fileUploadSection.addEventListener('drop', handleDrop);
fileUploadSection.addEventListener('dragover', handleDragOver);
fileUploadSection.addEventListener('dragleave', handleDragLeave);

function handleDragOver(event) {
    event.preventDefault();
    fileUploadSection.classList.add('active');
}

function handleDragLeave() {
    fileUploadSection.classList.remove('active');
}

function handleFiles(event) {
    fileUploadSection.classList.remove('active');
    const files = event.target.files || event.dataTransfer.files;
    readAndDisplayFiles(files);
}

function handleDrop(event) {
    event.preventDefault();
    fileUploadSection.classList.remove('active');
    const files = event.dataTransfer.files;
    readAndDisplayFiles(files);
}

async function readAndDisplayFiles(files) {
    displayArea.innerHTML = '';

    let allFileContents = "";
    let filesRead = 0;

    Array.from(files).forEach(async (file) => {
        if (!file.isDirectory) {
            const fileContent = await readFileAsText(file);
            allFileContents += `File Name: ${file.name}\n${fileContent}\n\n`;
            displayArea.innerHTML += `<h3>${file.name}</h3><pre>${escapeHtml(fileContent)}</pre>`;
            filesRead++;

            if (filesRead === files.length) {
                showCopyAllButton(allFileContents);
            }
        }
    });
}

function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

function showCopyAllButton(allFileContents) {
    const copyAllButton = document.getElementById('copyAllButton');
    copyAllButton.style.display = 'inline-block';
    copyAllButton.onclick = () => {
        const prompt = document.getElementById('promptInput').value;
        copyToClipboard(prompt + '\n\n' + allFileContents);
    };
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        alert('All file contents have been copied to the clipboard');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}