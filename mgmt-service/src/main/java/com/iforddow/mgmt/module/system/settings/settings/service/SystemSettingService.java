package com.iforddow.mgmt.module.system.settings.settings.service;

import com.iforddow.mgmt.common.exception.ResourceNotFoundException;
import com.iforddow.mgmt.common.service.StorageService;
import com.iforddow.mgmt.module.system.settings.settings.dto.SystemSettingDTO;
import com.iforddow.mgmt.module.system.settings.settings.entity.jpa.SystemSetting;
import com.iforddow.mgmt.module.system.settings.settings.repository.SystemSettingRepository;
import lombok.RequiredArgsConstructor;
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
    private SystemSettingDTO cachedStorageSettings;

    /**
    * A method to get system settings.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    public SystemSettingDTO getSystemSettings() {

        if (cachedStorageSettings == null) {
            cachedStorageSettings = systemSettingRepository.findById(0)
                    .map(SystemSettingDTO::new)
                    .orElseThrow(() -> new ResourceNotFoundException("Storage settings not found"));
        }
        return cachedStorageSettings;

    }

    /**
    * A method to update system settings.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    @Transactional
    public void updateSystemSettings(String systemName, String companyName, MultipartFile favicon, MultipartFile logo) throws IOException {

            boolean settingsChanged = false;

            SystemSetting systemSetting = systemSettingRepository.findById(0).orElseThrow(() -> new ResourceNotFoundException("System setting not found"));

            if(!systemName.equals(systemSetting.getSystemName())) {
                systemSetting.setSystemName(systemName);
                settingsChanged = true;
            }

            if(!companyName.equals(systemSetting.getCompanyName())) {
                systemSetting.setCompanyName(companyName);
                settingsChanged = true;
            }

        // Handle favicon upload/replacement
        if(favicon != null) {

            if(systemSetting.getFaviconUrl() != null && !systemSetting.getFaviconUrl().isBlank()) {

                String keyFromUrl = systemSetting.getFaviconUrl().substring(systemSetting.getFaviconUrl().lastIndexOf('/') + 1);

                String newFaviconUrl = storageService.replaceFile(keyFromUrl, favicon, true);
                systemSetting.setFaviconUrl(newFaviconUrl);
            } else {
                String faviconUrl = storageService.uploadFile(favicon, true);
                systemSetting.setFaviconUrl(faviconUrl);
            }

            settingsChanged = true;
        }

        // Handle logo upload/replacement
        if(logo != null) {

            if(systemSetting.getLogoUrl() != null && !systemSetting.getLogoUrl().isBlank()) {

                String keyFromUrl = systemSetting.getLogoUrl().substring(systemSetting.getLogoUrl().lastIndexOf('/') + 1);

                String newLogoUrl = storageService.replaceFile(keyFromUrl, logo, true);
                systemSetting.setLogoUrl(newLogoUrl);
            } else {
                String logoUrl = storageService.uploadFile(logo, true);
                systemSetting.setLogoUrl(logoUrl);
            }
            settingsChanged = true;

        }

            if(settingsChanged) {
                systemSetting.setUpdatedAt(Instant.now());
            }

            cachedStorageSettings = null;

            systemSettingRepository.save(systemSetting);


    }

}
