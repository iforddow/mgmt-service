package com.iforddow.mgmt.module.system.settings.settings.service;

import com.iforddow.mgmt.common.exception.ResourceNotFoundException;
import com.iforddow.mgmt.common.service.StorageService;
import com.iforddow.mgmt.module.system.settings.settings.dto.SystemSettingDTO;
import com.iforddow.mgmt.module.system.settings.settings.entity.jpa.SystemSetting;
import com.iforddow.mgmt.module.system.settings.settings.repository.SystemSettingRepository;
import com.iforddow.mgmt.module.system.settings.settings.request.SystemSettingRequest;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;

/**
* A service class to manage system settings.
*
* @author IFD
* @since 2026-01-04
* */
@Service
@RequiredArgsConstructor
public class SystemSettingService {

    private final SystemSettingRepository systemSettingRepository;
    private final StorageService storageService;

    /**
    * A method to get system settings.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    public SystemSettingDTO getSystemSettings() {

        return systemSettingRepository.findById(0).map(SystemSettingDTO::new).orElseThrow(
                () -> new ResourceNotFoundException("System settings not found")
        );

    }

    /**
    * A method to update system settings.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    @Transactional
    public void updateSystemSettings(SystemSettingRequest systemSettingRequest) throws IOException {

            boolean settingsChanged = false;

            SystemSetting systemSetting = systemSettingRepository.findById(0).orElseThrow(() -> new ResourceNotFoundException("System setting not found"));

            if(!systemSettingRequest.getSystemName().equals(systemSetting.getSystemName())) {
                systemSetting.setSystemName(systemSettingRequest.getSystemName());
                settingsChanged = true;
            }

            if(!systemSettingRequest.getCompanyName().equals(systemSetting.getCompanyName())) {
                systemSetting.setCompanyName(systemSettingRequest.getCompanyName());
                settingsChanged = true;
            }

            // Handle favicon upload/replacement
            if(systemSettingRequest.getFavicon() != null) {

                if(systemSetting.getFaviconUrl() != null) {
                    storageService.replaceFile(systemSetting.getFaviconUrl(), systemSettingRequest.getFavicon(), true);
                    settingsChanged = true;
                }   else {
                    MultipartFile favicon = systemSettingRequest.getFavicon();
                    String faviconUrl = storageService.uploadFile(favicon, true);
                    systemSetting.setFaviconUrl(faviconUrl);
                    settingsChanged = true;
                }
            }

            // Handle logo upload/replacement
            if(systemSettingRequest.getLogo() != null) {

                if(systemSetting.getLogoUrl() != null) {
                    storageService.replaceFile(systemSetting.getLogoUrl(), systemSettingRequest.getLogo(), true);
                    settingsChanged = true;
                }   else {
                    MultipartFile logo = systemSettingRequest.getLogo();
                    String logoUrl = storageService.uploadFile(logo, true);
                    systemSetting.setLogoUrl(logoUrl);
                    settingsChanged = true;
                }

            }

            if(settingsChanged) {
                systemSetting.setUpdatedAt(Instant.now());
            }

            systemSettingRepository.save(systemSetting);


    }

}
