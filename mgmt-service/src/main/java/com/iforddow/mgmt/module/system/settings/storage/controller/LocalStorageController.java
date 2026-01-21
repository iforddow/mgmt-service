package com.iforddow.mgmt.module.system.settings.storage.controller;

import com.iforddow.mgmt.common.service.StorageService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Controller
@RequestMapping("/storage/local")
@RequiredArgsConstructor
public class LocalStorageController {

    private final StorageService storageService;

    /**
     * A method to retrieve and serve a locally stored file.
     *
     * @param fileName The name of the file to retrieve.
     * @return ResponseEntity containing the file as a resource.
     * @throws IOException If an error occurs during file retrieval.
     *
     * @author IFD
     * @since 2026-01-10
     */
    @GetMapping("/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) throws IOException {
        byte[] fileData = storageService.getFile("/storage/local/" + fileName);

        String contentType = Files.probeContentType(Paths.get(fileName));
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                .body(new ByteArrayResource(fileData));
    }
}
