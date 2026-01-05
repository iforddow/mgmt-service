package com.iforddow.mgmt.module.system.settings.storage.service;

import com.iforddow.mgmt.common.exception.ResourceNotFoundException;
import com.iforddow.mgmt.module.system.settings.storage.dto.StorageSettingDTO;
import com.iforddow.mgmt.module.system.settings.storage.entity.jpa.ObjectStorageSetting;
import com.iforddow.mgmt.module.system.settings.storage.repository.StorageSettingRepository;
import com.iforddow.mgmt.module.system.settings.storage.request.StorageSettingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

/**
* A service class to manage storage settings.
*
* @author IFD
* @since 2026-01-04
* */
@Service
@RequiredArgsConstructor
public class StorageSettingService {

    private final StorageSettingRepository storageSettingRepository;
    private StorageSettingDTO cachedSettings;

    /**
    * A method to get storage settings.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    public StorageSettingDTO getStorageSettings() {
        if (cachedSettings == null) {
            cachedSettings = storageSettingRepository.findById(0)
                    .map(StorageSettingDTO::new)
                    .orElseThrow(() -> new ResourceNotFoundException("Storage settings not found"));
        }
        return cachedSettings;
    }

    /**
    * A method to update storage settings.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    @Transactional
    public void updateStorageSettings(StorageSettingRequest storageSettingRequest) {

        ObjectStorageSetting storageSetting = storageSettingRepository.findById(0)
                .orElseThrow(() -> new ResourceNotFoundException("Storage setting not found"));

        storageSetting.setAccessKey(storageSettingRequest.getAccessKey());
        storageSetting.setSecretKey(storageSettingRequest.getSecretKey());
        storageSetting.setEndpoint(storageSettingRequest.getEndpoint());
        storageSetting.setBucketName(storageSettingRequest.getBucketName());
        storageSetting.setPublicUrl(storageSettingRequest.getPublicUrl());
        storageSetting.setUpdatedAt(Instant.now());

        storageSettingRepository.save(storageSetting);

        cachedSettings = null;

    }

}
