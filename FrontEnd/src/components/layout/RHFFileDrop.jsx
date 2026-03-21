import { useState, useEffect } from "react";
import { useController } from "react-hook-form";
import { cn } from "@/lib/utils";

const RHFFileDrop = ({
    name,
    control,
    accept = "image/*",
    children,
    className,
    onFileSelect,
    multiple = false
}) => {
    const {
        field: { onChange, value, ref },
        fieldState: { error }
    } = useController({
        name,
        control,
        rules: { required: "Please upload a file" }
    });

    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState(null);

    // Handle preview generation
    useEffect(() => {
        if (!value) {
            setPreview(multiple ? [] : null);
            return;
        }

        if (multiple && Array.isArray(value)) {
            const objectUrls = value.map(file => URL.createObjectURL(file));
            setPreview(objectUrls);
            return () => objectUrls.forEach(url => URL.revokeObjectURL(url));
        } else if (!multiple && value instanceof File) {
            const objectUrl = URL.createObjectURL(value);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [value, multiple]);

    // Drag events
    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files || []);
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    // Input change event
    const onFileInput = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            handleFiles(files);
        }
    };

    // Common file handler
    const handleFiles = (files) => {
        if (multiple) {
            // Append new files to existing value or create new array
            const currentFiles = Array.isArray(value) ? value : [];
            const newFiles = [...currentFiles, ...files];
            onChange(newFiles);
            onFileSelect?.(newFiles);
        } else {
            onChange(files[0]);
            onFileSelect?.(files[0]);
        }
        
        // Reset the input so the same files can be selected again if needed
        const input = document.getElementById(`file-upload-${name}`);
        if (input) input.value = '';
    };

    const removeFile = (indexToRemove) => {
        if (multiple && Array.isArray(value)) {
            const newFiles = value.filter((_, index) => index !== indexToRemove);
            onChange(newFiles.length > 0 ? newFiles : null);
            onFileSelect?.(newFiles.length > 0 ? newFiles : null);
        } else {
            onChange(null);
            onFileSelect?.(null);
        }
    };

    const triggerBrowser = () => {
        document.getElementById(`file-upload-${name}`)?.click();
    };

    return (
        <div
            className={cn("w-full relative", className)}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <input
                ref={ref}
                type="file"
                id={`file-upload-${name}`}
                className="hidden"
                accept={accept}
                onChange={onFileInput}
                multiple={multiple}
            />
            {children({
                isDragging,
                preview,
                file: value,
                removeFile,
                triggerBrowser,
                error
            })}
        </div>
    );
};

export default RHFFileDrop;
