package com.iforddow.mgmt.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "blocked_asn")
public class BlockedAsn {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "asn", nullable = false)
    private Integer asn;

    @Column(name = "asn_name")
    private String asnName;

    @Column(name = "asn_org")
    private String asnOrg;

    @Column(name = "scope", nullable = false, length = 50)
    private String scope;

    @Column(name = "service_name", length = 100)
    private String serviceName;

    @Column(name = "account_id")
    private UUID accountId;

    @Column(name = "reason", nullable = false, length = Integer.MAX_VALUE)
    private String reason;

    @Column(name = "block_type", nullable = false, length = 30)
    private String blockType;

    @Column(name = "severity", nullable = false)
    private Short severity;

    @Builder.Default
    @ColumnDefault("now()")
    @Column(name = "blocked_at", nullable = false)
    private Instant blockedAt = Instant.now();

    @Builder.Default
    @Column(name = "expires_at")
    private Instant expiresAt = null;

    @Column(name = "created_by", length = 100)
    private String createdBy;

    @Builder.Default
    @Column(name = "last_hit_at")
    private Instant lastHitAt = null;

    @Builder.Default
    @ColumnDefault("0")
    @Column(name = "hit_count")
    private Long hitCount = 0L;

    @Builder.Default
    @ColumnDefault("true")
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;


}