English | [简体中文](README_zh.md)
# EASY COPY

## Web Link
[EASY COPY](https://corddt.github.io/easy_copy/)

## Overview
EASY COPY is a modern web application designed to simplify file processing. Traditionally, copying content from multiple text files requires opening each file individually—a time-consuming and inefficient process. EASY COPY addresses this by offering an intuitive interface with two key functionalities:
- **File Reader:** Upload or drag-and-drop one or more files to instantly preview their content. A “Copy All” button allows users to copy all displayed content (optionally with custom prompt text) to the clipboard with a single click.
- **Folder Explorer:** Upload an entire folder (using `webkitdirectory` on supported browsers) to automatically parse and display its directory structure as an ASCII tree. This feature helps users quickly grasp the hierarchical organization of their projects.

These features streamline file handling and management, making EASY COPY a valuable tool for various text processing tasks.

## Features
- **Flexible File Upload:**  
  Supports file selection via dialog or drag-and-drop for one or multiple files.

- **Real-Time Content Preview:**  
  Uploaded files are immediately displayed in a well-organized, formatted manner for easy review.

- **One-Click Copy:**  
  A dedicated "Copy All" button allows users to copy all file contents (with an optional prompt) to the clipboard, saving significant time.

- **Folder Explorer:**  
  Leverages the `webkitdirectory` attribute (available in Chrome/Edge) to let users select an entire folder. The app then parses and displays the folder's structure in a clear, ASCII tree format.

- **View Switching:**  
  A convenient toggle at the top of the page allows users to seamlessly switch between the File Reader and Folder Explorer views, keeping the interface clean and focused.

## How to Use
1. **Running the Project:**
   - Download or clone the repository to your local machine.
   - Open the `index.html` file in a web browser (preferably Chrome or Edge to support folder upload).

2. **File Reader:**
   - In the “File Reader” view, upload files via the dialog or by dragging and dropping.
   - The content of each file is displayed in the designated area and can be copied in one click.

3. **Folder Explorer:**
   - Switch to the “Folder Explorer” view using the toggle buttons at the top.
   - Select an entire folder to have its structure displayed as an ASCII tree (using characters like `├─` and `└─`).

## Technologies Used
- **HTML5, CSS3, and JavaScript:** Core technologies for building the interactive front-end.
- **Pico CSS:** Provides a lightweight, responsive styling framework.

## Contributing
Contributions, issue reports, and feature requests are welcome. Please check out the [issues page](https://github.com/Corddt/easy_copy/issues/1) for more details.

## License
This project is distributed under the MIT License. See the `LICENSE` file for more information.

## Contact
Project Link: [https://github.com/Corddt](https://github.com/Corddt)
