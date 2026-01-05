package com.iforddow.mgmt.module.system.settings.storage.request;

import lombok.Data;

/**
* A request class for updating storage settings.
*
* @author IFD
* @since 2026-01-04
* */
@Data
public class StorageSettingRequest {

    private String accessKey;
    private String secretKey;
    private String endpoint;
    private String bucketName;
    private String publicUrl;

}
