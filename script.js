/******************************************************************************
 * 切换按钮逻辑：在 File Reader 与 Folder Explorer 之间切换显示
 *****************************************************************************/
const toggleFileReader = document.getElementById('toggleFileReader');
const toggleFolderExplorer = document.getElementById('toggleFolderExplorer');
const fileReaderSection = document.getElementById('fileReaderSection');
const folderExplorerSection = document.getElementById('folderExplorerSection');

toggleFileReader.addEventListener('click', () => {
    toggleFileReader.classList.add('active');
    toggleFolderExplorer.classList.remove('active');
    fileReaderSection.style.display = 'block';
    folderExplorerSection.style.display = 'none';
});

toggleFolderExplorer.addEventListener('click', () => {
    toggleFolderExplorer.classList.add('active');
    toggleFileReader.classList.remove('active');
    folderExplorerSection.style.display = 'block';
    fileReaderSection.style.display = 'none';
});


/******************************************************************************
 *  Part A: File Reader 功能 —— 上传文件并读取显示内容
 *****************************************************************************/
const fileUploadSection = document.getElementById('fileInput').parentNode;
const fileInput = document.getElementById('fileInput');
const displayArea = document.getElementById('fileContent');
const copyAllButton = document.getElementById('copyAllButton');
const fileCount = document.getElementById('fileCount');
const promptInput = document.getElementById('promptInput');

// 拖拽及文件选择事件
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
    displayArea.innerHTML = '';
    fileCount.textContent = `Files: ${files.length}`;

    if (files.length > 0) {
        copyAllButton.style.display = 'block';
    } else {
        copyAllButton.style.display = 'none';
    }

    Array.from(files).forEach((file) => {
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
    let combinedContent = promptInput.value + '\n\n';
    const fileContents = displayArea.querySelectorAll('pre');
    fileContents.forEach((pre) => {
        combinedContent += pre.textContent + '\n\n';
    });

    navigator.clipboard
        .writeText(combinedContent)
        .then(() => {
            alert('All files and prompt copied to clipboard!');
        })
        .catch((err) => {
            console.error('Failed to copy: ', err);
        });
});


/******************************************************************************
 *  Part B: Folder Explorer 功能 —— 构建并打印文件夹结构树
 *****************************************************************************/
const folderInput = document.getElementById('folderInput');
const folderTree = document.getElementById('folderTree');

folderInput.addEventListener('change', handleFolderInput);

function handleFolderInput(e) {
    const files = e.target.files;
    if (!files || files.length === 0) {
        folderTree.textContent = 'No folder selected or empty folder.';
        return;
    }

    // 构建树的根对象
    const root = {};

    // 遍历所有文件，利用 webkitRelativePath 构建树
    for (const file of files) {
        const relativePath = file.webkitRelativePath || file.name;
        insertPath(root, relativePath);
    }

    // 生成 ASCII 树形结构
    const treeString = printTree(root);
    folderTree.textContent = treeString;
}

/**
 * 将相对路径插入到树结构中
 * @param {Object} node - 当前节点对象
 * @param {string} fullPath - 例如 "src/services/ai-service.js"
 */
function insertPath(node, fullPath) {
    const parts = fullPath.split('/');
    let current = node;
    parts.forEach((part, idx) => {
        const isFile = (idx === parts.length - 1);
        if (!current[part]) {
            current[part] = { __isFile: false };
        }
        if (isFile) {
            current[part].__isFile = true;
        }
        current = current[part];
    });
}

/**
 * 递归生成 ASCII 树形结构字符串
 * @param {Object} node - 当前节点
 * @param {string} prefix - 前缀字符串
 * @param {boolean} isLast - 当前节点是否为同级最后一个
 * @returns {string} 树形结构文本
 */
function printTree(node, prefix = '', isLast = true) {
    const entries = Object.keys(node).filter(k => k !== '__isFile').sort();
    const lines = [];
    entries.forEach((key, index) => {
        const child = node[key];
        const childIsLast = (index === entries.length - 1);
        const hasChildren = Object.keys(child).some(k => k !== '__isFile');
        const connector = childIsLast ? '└─' : '├─';
        lines.push(prefix + connector + key);
        if (!child.__isFile && hasChildren) {
            const childPrefix = prefix + (childIsLast ? '   ' : '│  ');
            lines.push(printTree(child, childPrefix, childIsLast));
        }
    });
    return lines.join('\n');
}
