package com.iforddow.mgmt.module.system.settings.storage.service;

import com.iforddow.mgmt.common.exception.BadRequestException;
import com.iforddow.mgmt.common.exception.NoContentException;
import com.iforddow.mgmt.common.exception.ResourceNotFoundException;
import com.iforddow.mgmt.module.system.settings.storage.dto.StorageSettingDTO;
import com.iforddow.mgmt.module.system.settings.storage.entity.jpa.ObjectStorageSetting;
import com.iforddow.mgmt.module.system.settings.storage.repository.StorageSettingRepository;
import com.iforddow.mgmt.module.system.settings.storage.request.StorageSettingRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.HeadBucketRequest;

import java.net.URI;
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

        if(testExternalStorageConnection(storageSettingRequest.getAccessKey(), storageSettingRequest.getSecretKey(),
                storageSettingRequest.getEndpoint(), storageSettingRequest.getBucketName(), storageSettingRequest.getPublicUrl())) {
            throw new BadRequestException("Connection test failed");
        }

        storageSetting.setAccessKey(storageSettingRequest.getAccessKey());
        storageSetting.setSecretKey(storageSettingRequest.getSecretKey());
        storageSetting.setEndpoint(storageSettingRequest.getEndpoint());
        storageSetting.setBucketName(storageSettingRequest.getBucketName());
        storageSetting.setPublicUrl(storageSettingRequest.getPublicUrl());
        storageSetting.setUpdatedAt(Instant.now());

        storageSettingRepository.save(storageSetting);

        cachedSettings = null;

    }

    /*
    * A method to test connection to the S3-compatible storage.
    *
    * @author IFD
    * @since 2026-01-10
    * */
    public boolean testExternalStorageConnection() {

        StorageSettingDTO settings = getStorageSettings();

        if(settings.accessKey().isBlank() || settings.secretKey().isBlank() || settings.endpoint().isBlank() || settings.bucketName().isBlank() || settings.publicUrl().isBlank()) {
            throw new NoContentException("Storage settings are incomplete");
        }

        return testExternalStorageConnection(settings.accessKey(), settings.secretKey(), settings.endpoint(), settings.bucketName(), settings.publicUrl());

    }

    /*
     * A method to test connection to the S3-compatible storage.
     *
     * @author IFD
     * @since 2026-01-10
     * */
    public boolean testExternalStorageConnection(String accessKey, String secretKey, String endpoint, String bucketName, String publicUrl) {

        try (S3Client s3 = S3Client.builder()
                .endpointOverride(URI.create(endpoint))
                .region(Region.US_EAST_1)
                .credentialsProvider(StaticCredentialsProvider.create(
                        AwsBasicCredentials.create(accessKey, secretKey)))
                .build()) {
            s3.headBucket(HeadBucketRequest.builder().bucket(bucketName).build());
            return false;
        } catch (RuntimeException e) {
            return true;
        }

    }

    /**
    * A method to clear storage settings.
    *
    * @author IFD
    * @since 2026-01-10
    * */
    public void clearStorageSettings() {
        ObjectStorageSetting storageSetting = storageSettingRepository.findById(0)
                .orElseThrow(() -> new ResourceNotFoundException("Storage setting not found"));

        storageSetting.setAccessKey("");
        storageSetting.setSecretKey("");
        storageSetting.setEndpoint("");
        storageSetting.setBucketName("");
        storageSetting.setPublicUrl("");
        storageSetting.setUpdatedAt(Instant.now());

        storageSettingRepository.save(storageSetting);

        cachedSettings = null;
    }

}
