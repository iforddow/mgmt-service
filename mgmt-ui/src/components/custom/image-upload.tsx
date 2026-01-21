import { FileDropzone } from "@/components/ui/dropzone";
import { FileList } from "@/components/ui/file-list";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { IconHelpCircle } from "@tabler/icons-react";
import { useState, useEffect } from "react";

export default function ImageUpload({ fileInputRef, setUploadedFiles, setFileProgresses, uploadedFiles, fileProgresses, maxFileSize, maxFiles, fileSizeType, type, recommendedSize, onFilesChange }: {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>;
    setFileProgresses: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
    uploadedFiles: File[];
    fileProgresses: { [key: string]: number };
    maxFileSize?: number;
    maxFiles?: number;
    fileSizeType?: "MB" | "KB";
    type: "logo" | "favicon";
    recommendedSize?: string;
    onFilesChange?: (files: File[]) => void;
}) {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;

        if (maxFiles && uploadedFiles.length + files.length > maxFiles) {
            setErrorMessage(`You can only upload ${maxFiles} file for the ${type}.`);
            return;
        }

        if (maxFileSize) {
            for (let i = 0; i < files.length; i++) {
                if (fileSizeType === "MB" && files[i].size > maxFileSize * 1024 * 1024) {
                    setErrorMessage(`File ${files[i].name} exceeds the maximum size of ${maxFileSize}MB.`);
                    return;
                } else if (fileSizeType === "KB" && files[i].size > maxFileSize * 1024) {
                    setErrorMessage(`File ${files[i].name} exceeds the maximum size of ${maxFileSize}KB.`);
                    return;
                }
            }
        }

        for (let file of files) {
            if (uploadedFiles.some((f) => f.name === file.name)) {
                setErrorMessage(`File ${file.name} has already been selected.`);
                return;
            }
        }

        const newFiles = Array.from(files);

        setUploadedFiles((prev) => {
            const updated = [...prev, ...newFiles];
            onFilesChange?.(updated);
            return updated;
        });


        newFiles.forEach((file) => {
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 10;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                }
                setFileProgresses((prev) => ({
                    ...prev,
                    [file.name]: Math.min(progress, 100),
                }));
            }, 300);
        });
    };

    const handleBoxClick = () => {

        if (!fileInputRef) return;

        fileInputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleFileSelect(e.dataTransfer.files);
    };

    const removeFile = (filename: string) => {
        setUploadedFiles((prev) => {
            const updated = prev.filter((file) => file.name !== filename);
            onFilesChange?.(updated);
            return updated;
        });
        setFileProgresses((prev) => {
            const newProgresses = { ...prev };
            delete newProgresses[filename];
            return newProgresses;
        });
    };

    return (
        <div className="flex flex-col gap-3 w-full ">
            <div className="flex items-center justify-between gap-2 w-full">
                <span className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
                    Select a {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            tabIndex={-1}
                            className="cursor-help text-muted-foreground text-xs"
                            aria-label={`Help: Select a ${type}`}
                            onMouseDown={(e) => {
                                // prevent label/input focus and accidental form submissions
                                e.preventDefault()
                            }}
                            onClick={(e) => {
                                // prevent any form submit or bubbling when interacting with the help icon
                                e.stopPropagation()
                                e.preventDefault()
                            }}
                        >
                            <IconHelpCircle className="w-4 h-4" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                        The {type} image that will be displayed in the system header. {recommendedSize ? `Recommended size is ${recommendedSize}.` : ""}
                    </TooltipContent>
                </Tooltip>

            </div>
            {
                uploadedFiles.length < (maxFiles || Infinity) && (
                    <FileDropzone
                        fileInputRef={fileInputRef}
                        handleBoxClick={handleBoxClick}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleFileSelect={handleFileSelect}
                        label={`Select a ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                        maxFileSize={maxFileSize}
                        fileSizeType={fileSizeType}
                        includeLabel={false}
                    />
                )
            }
            {
                uploadedFiles.length > 0 && (
                    <FileList
                        uploadedFiles={uploadedFiles}
                        fileProgresses={fileProgresses}
                        removeFile={removeFile}
                    />
                )
            }
            {errorMessage && (
                <p className="text-sm text-destructive">{errorMessage}</p>
            )}
        </div>
    )
}