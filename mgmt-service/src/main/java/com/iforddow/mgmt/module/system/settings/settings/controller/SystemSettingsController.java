package com.iforddow.mgmt.module.system.settings.settings.controller;

import com.iforddow.mgmt.module.system.settings.settings.dto.SystemSettingDTO;
import com.iforddow.mgmt.module.system.settings.settings.service.SystemSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
* A controller to manage system settings.
*
* @author IFD
* @since 2026-01-04
* */
@RestController
@RequestMapping("/system/settings")
@RequiredArgsConstructor
public class SystemSettingsController {

    private final SystemSettingService systemSettingService;

    /**
    * A method to get the current system settings.
    *
    * @return ResponseEntity containing the system settings.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    @GetMapping()
    public ResponseEntity<SystemSettingDTO> getSettings() {
        return ResponseEntity.ok(systemSettingService.getSystemSettings());
    }

    /**
    * A method to update the system settings.
    *
    * @param systemName   The new system name (optional).
    * @param companyName  The new company name (optional).
    * @param favicon      The new favicon file (optional).
    * @param logo         The new logo file (optional).
    * @return ResponseEntity with no content.
    * @throws IOException if an I/O error occurs.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    @PatchMapping()
    public ResponseEntity<?> updateSettings(
            @RequestParam(required = false) String systemName,
            @RequestParam(required = false) String companyName,
            @RequestPart(required = false) MultipartFile favicon,
            @RequestPart(required = false) MultipartFile logo
    ) throws IOException {

        systemSettingService.updateSystemSettings(systemName, companyName, favicon, logo);

        return ResponseEntity.noContent().build();
    }

}
