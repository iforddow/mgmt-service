package com.iforddow.mgmt.module.system.settings.settings.repository;

import com.iforddow.mgmt.module.system.settings.settings.entity.jpa.SystemSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
* A repository interface for managing SystemSetting entities.
*
* @author IFD
* @since 2026-01-04
* */
@Repository
public interface SystemSettingRepository extends JpaRepository<SystemSetting, Integer> {
}
