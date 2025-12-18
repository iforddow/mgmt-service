package com.iforddow.mgmt.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.net.InetAddress;
import java.time.Instant;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "blocked_ip")
public class BlockedIp {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "ip_address", nullable = false)
    private InetAddress ipAddress;

    @Column(name = "cidr_range")
    private InetAddress cidrRange;

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

    @ColumnDefault("now()")
    @Column(name = "blocked_at", nullable = false)
    private Instant blockedAt;

    @Column(name = "expires_at")
    private Instant expiresAt;

    @Column(name = "created_by", length = 100)
    private String createdBy;

    @Column(name = "last_hit_at")
    private Instant lastHitAt;

    @ColumnDefault("0")
    @Column(name = "hit_count")
    private Long hitCount;

    @ColumnDefault("true")
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;


}