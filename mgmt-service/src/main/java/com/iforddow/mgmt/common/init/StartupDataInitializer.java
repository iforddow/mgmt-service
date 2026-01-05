package com.iforddow.mgmt.common.init;

import com.iforddow.mgmt.module.system.settings.settings.entity.jpa.SystemSetting;
import com.iforddow.mgmt.module.system.settings.settings.repository.SystemSettingRepository;
import com.iforddow.mgmt.module.system.settings.storage.entity.jpa.ObjectStorageSetting;
import com.iforddow.mgmt.module.system.settings.storage.repository.StorageSettingRepository;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class StartupDataInitializer implements ApplicationRunner {

    private final SystemSettingRepository systemSettingRepository;
    private final StorageSettingRepository storageSettingRepository;

    @Override
    @Transactional
    public void run(@NonNull ApplicationArguments args) {

        systemSettingRepository.findById(0).orElseGet(() -> {
            SystemSetting systemSetting = new SystemSetting();

            systemSetting.setId(0);
            systemSetting.setSystemName("Atlvon Admin");
            systemSetting.setCompanyName("Atlvon Inc");
            systemSetting.setLogoUrl(null);
            systemSetting.setFaviconUrl(null);
            systemSetting.setCreatedAt(Instant.now());
            systemSetting.setUpdatedAt(null);

            return systemSettingRepository.save(systemSetting);

        });

        storageSettingRepository.findById(0).orElseGet(() -> {
            ObjectStorageSetting storageSetting = new ObjectStorageSetting();

            storageSetting.setId(0);
            storageSetting.setAccessKey("");
            storageSetting.setSecretKey("");
            storageSetting.setEndpoint("");
            storageSetting.setBucketName("");
            storageSetting.setPublicUrl("");
            storageSetting.setUpdatedAt(null);
            storageSetting.setCreatedAt(Instant.now());

            return storageSettingRepository.save(storageSetting);
        });

    }

}
