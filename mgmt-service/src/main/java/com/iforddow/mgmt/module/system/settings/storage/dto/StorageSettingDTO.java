package com.iforddow.mgmt.module.system.settings.storage.dto;

import com.iforddow.mgmt.module.system.settings.storage.entity.jpa.ObjectStorageSetting;

/**
* A record to transfer storage setting data.
*
* @author IFD
* @since 2026-01-04
* */
public record StorageSettingDTO(
        String accessKey,
        String secretKey,
        String endpoint,
        String bucketName,
        String publicUrl) {

    public StorageSettingDTO(ObjectStorageSetting entity) {
        this(
                entity.getAccessKey(),
                entity.getSecretKey(),
                entity.getEndpoint(),
                entity.getBucketName(),
                entity.getPublicUrl()
        );
    }

}
