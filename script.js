const fileUploadSection = document.getElementById('fileInput').parentNode;
const fileInput = document.getElementById('fileInput');
const displayArea = document.getElementById('fileContent');
const copyAllButton = document.getElementById('copyAllButton');
const fileCount = document.getElementById('fileCount'); // 获取文件数量显示元素

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

function readAndDisplayFiles(files) {
    displayArea.innerHTML = ''; // 清空显示区域
    fileCount.textContent = `Files: ${files.length}`; // 更新文件数量

    if (files.length > 0) {
        copyAllButton.style.display = 'block';
    } else {
        copyAllButton.style.display = 'none';
    }

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileContent = document.createElement('pre');
            fileContent.textContent = `File: ${file.name}\n\n${e.target.result}`;
            displayArea.appendChild(fileContent);
        };
        reader.readAsText(file);
    });
}

copyAllButton.addEventListener('click', () => {
    const prompt = document.getElementById('promptInput').value;
    let combinedContent = `${prompt}\n\n`;

    const fileContents = displayArea.querySelectorAll('pre');
    fileContents.forEach(pre => {
        combinedContent += pre.textContent + '\n\n';
    });

    navigator.clipboard.writeText(combinedContent).then(() => {
        alert('All files and prompt copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});