import React, { useState } from "react";
import "./FileExplorer.css";

const FileExplorer = ({ files }) => {
    const [expandedFolders, setExpandedFolders] = useState([]); // Track expanded folders
    const [selectedFile, setSelectedFile] = useState(null); // Track selected file
    const [contextMenu, setContextMenu] = useState(null);

    // Toggle folder expansion
    const toggleFolder = (folderName) => {
        setExpandedFolders((prev) =>
            prev.includes(folderName)
                ? prev.filter((name) => name !== folderName) // Collapse if already expanded
                : [...prev, folderName] // Expand if not already expanded
        );
    };

    // Handle file selection
    const handleFileClick = (file) => {
        setSelectedFile(file.name);
    };
    // Handle right-click to open context menu
    const handleContextMenu = (e, file) => {
        e.preventDefault();
        setContextMenu({
            file,
            x: e.clientX,
            y: e.clientY,
        });
    };

    // Handle context menu actions
    const handleContextAction = (action) => {
        if (contextMenu) {
            console.log(`${action} action on file: ${contextMenu.file.name}`);
            setContextMenu(null); // Close the context menu
        }
    };

    // Render files and folders recursively
    const renderFiles = (items) => {
        return items.map((item) => {
            if (item.type === "folder") {
                const isExpanded = expandedFolders.includes(item.name);
                return (
                    <div key={item.name} className="folder-item">
                        <div
                            className="folder-name"
                            onClick={() => toggleFolder(item.name)}
                        >
                            {isExpanded && <img src="./icons/folder-open-svgrepo-com.svg" alt="open folder" width="20px"></img>}                        
                            {!isExpanded && <img src="./icons/folder-svgrepo-com (1).svg" alt="folder" width="20px"></img>}
                            {item.name}
                        </div>
                        {isExpanded && (
                            <div className="folder-content">{renderFiles(item.data)}</div>
                        )}
                    </div>
                );
            }

            return (
                <div
                    key={item.name}
                    className={`file-item ${selectedFile === item.name ? "selected" : ""
                        }`}
                    onClick={() => handleFileClick(item)}
                    onContextMenu={(e) => handleContextMenu(e, item)}
                >
                    <img src="./icons/file-document-svgrepo-com.svg" alt="file" width="20px"></img> {item.name}
                </div>
            );
        });
    };

    return <div className="file-explorer">{
        <div >
            {renderFiles(files.data)}

            {contextMenu && (
                <div
                    className="context-menu"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                >
                    <div onClick={() => handleContextAction("Copy")}>Copy</div>
                    <div onClick={() => handleContextAction("Rename")}>Rename</div>
                    <div onClick={() => handleContextAction("Delete")}>Delete</div>
                </div>
            )}
        </div>


    }</div>;
};

export default FileExplorer;

