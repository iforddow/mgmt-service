package com.iforddow.mgmt.module.system.settings.settings.entity.jpa;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

/**
* A system setting entity representing configuration settings for the application.
*
* @author IFD
* @since 2026-01-03
* */
@Getter
@Setter
@Entity
@Table(name = "system_setting")
public class SystemSetting {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @ColumnDefault("'Atlvon Admin'")
    @Column(name = "system_name", nullable = false, length = 100)
    private String systemName;

    @ColumnDefault("'Atlvon Inc'")
    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "favicon_url")
    private String faviconUrl;

    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ColumnDefault("now()")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;


}