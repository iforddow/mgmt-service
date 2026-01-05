package com.iforddow.mgmt.module.system.settings.settings.controller;

import com.iforddow.mgmt.module.system.settings.settings.dto.SystemSettingDTO;
import com.iforddow.mgmt.module.system.settings.settings.request.SystemSettingRequest;
import com.iforddow.mgmt.module.system.settings.settings.service.SystemSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/")
    public ResponseEntity<SystemSettingDTO> getSettings() {
        return ResponseEntity.ok(systemSettingService.getSystemSettings());
    }

    /**
    * A method to update the system settings.
    *
    * @param systemSettingRequest the new system settings.
    * @return ResponseEntity with no content.
    * @throws IOException if an I/O error occurs.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    @PatchMapping("/")
    public ResponseEntity<?> updateSettings(@RequestBody SystemSettingRequest systemSettingRequest) throws IOException {

        systemSettingService.updateSystemSettings(systemSettingRequest);

        return ResponseEntity.noContent().build();
    }

}
