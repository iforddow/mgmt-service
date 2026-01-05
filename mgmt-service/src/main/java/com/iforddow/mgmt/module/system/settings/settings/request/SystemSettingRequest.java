package com.iforddow.mgmt.module.system.settings.settings.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

/**
* A request class for system settings.
*
* @author IFD
* @since 2026-01-04
* */
@Data
public class SystemSettingRequest {

    private String systemName;
    private String companyName;
    private MultipartFile logo;
    private MultipartFile favicon;

}
