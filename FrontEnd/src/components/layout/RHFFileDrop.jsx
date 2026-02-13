import { useState, useEffect } from "react";
import { useController } from "react-hook-form";
import { cn } from "@/lib/utils";

const RHFFileDrop = ({
    name,
    control,
    accept = "image/*",
    children,
    className,
    onFileSelect
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
        if (!value || !(value instanceof File)) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(value);
        setPreview(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [value]);

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

        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    // Input change event
    const onFileInput = (e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    // Common file handler
    const handleFile = (file) => {
        onChange(file);
        onFileSelect?.(file);
    };

    const removeFile = () => {
        onChange(null);
        onFileSelect?.(null);
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
