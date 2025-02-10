import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

export const FileUpload = ({ onChange }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        className="p-6 group block rounded-lg cursor-pointer w-full relative overflow-hidden border-2 border-dashed border-gray-300 bg-transparent"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center text-center">
          <IconUpload className="h-8 w-8 text-blue-500" />
          <p className="text-sm text-white text mt-1">
            Upload a fetal brain image to analyze development
          </p>
        </div>

        <div className="relative w-full mt-6 max-w-xl mx-auto">
          {files.length > 0 &&
            files.map((file, idx) => (
              <motion.div
                key={"file" + idx}
                layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                className="relative overflow-hidden bg-white dark:bg-neutral-900 flex flex-col items-start p-4 mt-4 w-full mx-auto rounded-md shadow-sm"
              >
                <div className="flex justify-between w-full items-center gap-4">
                  <motion.p className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs">
                    {file.name}
                  </motion.p>
                  <motion.p className="rounded-lg px-2 py-1 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </motion.p>
                </div>
                <div className="flex text-sm flex-col md:flex-row items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                  <motion.p className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800">
                    {file.type}
                  </motion.p>
                  <motion.p>
                    Modified {new Date(file.lastModified).toLocaleDateString()}
                  </motion.p>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </div>
  );
};
