package com.iforddow.mgmt.module.system.settings.storage.entity.jpa;

@lombok.Getter
@lombok.Setter@jakarta.persistence.Entity
@jakarta.persistence.Table(name = "object_storage_setting")
public class ObjectStorageSetting {
@jakarta.persistence.Id
@jakarta.persistence.Column(name = "id", nullable = false)
private java.lang.Integer id;

@jakarta.persistence.Column(name = "access_key", nullable = false)
private java.lang.String accessKey;

@jakarta.persistence.Column(name = "secret_key", nullable = false)
private java.lang.String secretKey;

@jakarta.persistence.Column(name = "endpoint", nullable = false)
private java.lang.String endpoint;

@jakarta.persistence.Column(name = "bucket_name", nullable = false)
private java.lang.String bucketName;

@jakarta.persistence.Column(name = "public_url", nullable = false)
private java.lang.String publicUrl;

@jakarta.persistence.Column(name = "updated_at")
private java.time.Instant updatedAt;

@org.hibernate.annotations.ColumnDefault("now()")
@jakarta.persistence.Column(name = "created_at", nullable = false)
private java.time.Instant createdAt;



}