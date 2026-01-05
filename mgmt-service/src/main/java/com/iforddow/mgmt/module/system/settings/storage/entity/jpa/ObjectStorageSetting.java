package com.iforddow.mgmt.module.system.settings.storage.entity.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

/**
* A JPA entity representing object storage settings.
*
* @author IFD
* @since 2026-01-04
* */
@Getter
@Setter
@Entity
@Table(name = "object_storage_setting")
public class ObjectStorageSetting {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "access_key", nullable = false)
    private String accessKey;

    @Column(name = "secret_key", nullable = false)
    private String secretKey;

    @Column(name = "endpoint", nullable = false)
    private String endpoint;

    @Column(name = "bucket_name", nullable = false)
    private String bucketName;

    @Column(name = "public_url", nullable = false)
    private String publicUrl;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @ColumnDefault("now()")
    @Column(name = "created_at", nullable = false)
    private Instant createdAt;


}