import React, { useState } from 'react';

interface DocumentManagementProps {
  onDocumentUpload: (file: File) => void;
}

const DocumentManagement: React.FC<DocumentManagementProps> = ({
  onDocumentUpload,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onDocumentUpload(selectedFile);
      
      setSelectedFile(null);
    }
  };

  return (
    <div className="document-management">
      <h2>Document Management</h2>
      <input
        type="file"
        accept=".pdf, .doc, .docx"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload Document</button>
    </div>
  );
};

export default DocumentManagement;
