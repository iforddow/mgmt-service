package com.iforddow.mgmt.module.system.settings.storage.controller;

import com.iforddow.mgmt.module.system.settings.storage.dto.StorageSettingDTO;
import com.iforddow.mgmt.module.system.settings.storage.request.StorageSettingRequest;
import com.iforddow.mgmt.module.system.settings.storage.service.StorageSettingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
* A controller to manage storage settings.
*
* @author IFD
* @since 2026-01-04
* */
@RestController
@RequestMapping("/system/settings/storage")
@RequiredArgsConstructor
public class StorageSettingController {

    private final StorageSettingService storageSettingService;

    /**
    * An endpoint to get the current storage settings.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    @GetMapping("/")
    public ResponseEntity<StorageSettingDTO> getStorageSettings() {

        StorageSettingDTO storageSettingDTO = storageSettingService.getStorageSettings();

        return ResponseEntity.ok(storageSettingDTO);
    }

    /**
    * An endpoint to update the storage settings.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    @PatchMapping("/")
    public ResponseEntity<?> updateStorageSettings(@RequestBody StorageSettingRequest storageSettingRequest) {

        storageSettingService.updateStorageSettings(storageSettingRequest);

        return ResponseEntity.noContent().build();

    }

}
