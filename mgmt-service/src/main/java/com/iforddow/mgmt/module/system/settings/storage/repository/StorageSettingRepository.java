package com.iforddow.mgmt.module.system.settings.storage.repository;

import com.iforddow.mgmt.module.system.settings.storage.entity.jpa.ObjectStorageSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
* A repository interface for managing object storage settings.
*
* @author IFD
* @since 2026-01-04
* */
@Repository
public interface StorageSettingRepository extends JpaRepository<ObjectStorageSetting, Integer> {
}
