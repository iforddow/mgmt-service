package com.iforddow.mgmt.module.system.settings.settings.dto;

import com.iforddow.mgmt.module.system.settings.settings.entity.jpa.SystemSetting;

import java.time.Instant;

/**
* A DTO for the SystemSetting entity
*
* @author IFD
* @since 2026-01-03
* */
public record SystemSettingDTO(Integer id, String systemName, String companyName, String faviconUrl, String logoUrl, Instant updatedAt) {

    public SystemSettingDTO(SystemSetting systemSetting) {
        this(
                systemSetting.getId(),
                systemSetting.getSystemName(),
                systemSetting.getCompanyName(),
                systemSetting.getFaviconUrl(),
                systemSetting.getLogoUrl(),
                systemSetting.getUpdatedAt()
        );
    }

}
