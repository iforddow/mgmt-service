import { Upload } from "lucide-react";
import React, { type RefObject } from "react";
import { Label } from "./label";

interface FileDropzoneProps {
    fileInputRef: RefObject<HTMLInputElement | null>;
    handleBoxClick: () => void;
    handleDragOver: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent) => void;
    handleFileSelect: (files: FileList | null) => void;
    label?: string;
    maxFileSizeMB?: number;
    fileSizeType?: "MB" | "KB";
}

export function FileDropzone({
    fileInputRef,
    handleBoxClick,
    handleDragOver,
    handleDrop,
    handleFileSelect,
    label = "Upload an image",
    maxFileSizeMB = 4,
    fileSizeType = "MB",
}: FileDropzoneProps) {
    return (
        <div>
            <Label className="mb-3">{label}</Label>
            <div
                className="border-2 border-dashed border-border rounded-md p-8 flex flex-col items-center justify-center text-center cursor-pointer"
                onClick={handleBoxClick}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <div className="mb-2 bg-muted rounded-full p-3">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                    Upload an image
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                    or,{" "}
                    <label
                        htmlFor="fileUpload"
                        className="text-primary hover:text-primary/90 font-medium cursor-pointer"
                        onClick={(e) => e.preventDefault()} // Prevent triggering handleBoxClick
                    >
                        click to browse
                    </label>{" "}
                    ({maxFileSizeMB}{fileSizeType} max)
                </p>
                <input
                    type="file"
                    id="fileUpload"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e.target.files)}
                />
            </div>
        </div>
    );
}
