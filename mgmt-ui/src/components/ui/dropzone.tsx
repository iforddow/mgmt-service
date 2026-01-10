import { Upload } from "lucide-react";
import React, { type RefObject } from "react";

interface FileDropzoneProps {
    fileInputRef: RefObject<HTMLInputElement | null>;
    handleBoxClick: () => void;
    handleDragOver: (e: React.DragEvent) => void;
    handleDrop: (e: React.DragEvent) => void;
    handleFileSelect: (files: FileList | null) => void;
    includeLabel?: boolean;
    label?: string;
    maxFileSize?: number;
    fileSizeType?: "MB" | "KB";
}

export function FileDropzone({
    fileInputRef,
    handleBoxClick,
    handleDragOver,
    handleDrop,
    handleFileSelect,
    includeLabel = true,
    label = "Upload an image",
    maxFileSize = 4,
    fileSizeType = "MB",
}: FileDropzoneProps) {
    return (
        <div>
            {includeLabel && <span className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 mb-3">{label}</span>}
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
                    ({maxFileSize}{fileSizeType} max)
                </p>
                <input
                    type="file"
                    id="fileUpload"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                        handleFileSelect(e.target.files);
                        e.target.value = "";
                    }}
                />
            </div>
        </div>
    );
}
