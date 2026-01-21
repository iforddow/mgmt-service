package com.iforddow.mgmt.common.config;

import com.iforddow.mgmt.module.system.settings.storage.dto.StorageSettingDTO;
import com.iforddow.mgmt.module.system.settings.storage.service.StorageSettingService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

/**
* A configuration class to hold storage settings.
*
* @author IFD
* @since 2026-01-04
* */
@Configuration
@RequiredArgsConstructor
@Getter
public class StorageConfig {

    private final StorageSettingService storageSettingService;

    public String getAccessKey() {
        return storageSettingService.getStorageSettings().accessKey();
    }

    public String getSecretKey() {
        return storageSettingService.getStorageSettings().secretKey();
    }

    public String getEndpoint() {
        return storageSettingService.getStorageSettings().endpoint();
    }

    public String getBucketName() {
        return storageSettingService.getStorageSettings().bucketName();
    }

    public String getPublicUrl() {
        return storageSettingService.getStorageSettings().publicUrl();
    }

    public boolean externalSetupIncomplete() {
        StorageSettingDTO settings = storageSettingService.getStorageSettings();
        return settings.accessKey() == null || settings.accessKey().isEmpty()
                || settings.secretKey() == null || settings.secretKey().isEmpty()
                || settings.endpoint() == null || settings.endpoint().isEmpty()
                || settings.bucketName() == null || settings.bucketName().isEmpty()
                || settings.publicUrl() == null || settings.publicUrl().isEmpty();
    }
}
