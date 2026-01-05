package com.iforddow.mgmt.module.ip.block.filter;

import com.iforddow.mgmt.module.ip.block.entity.jpa.BlockedIp;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class BlockedIpFilter {

    public static Specification<BlockedIp> build(Map<String, String> params) {
        return (root, query, cb) -> {
            if (params == null || params.isEmpty()) {
                return cb.conjunction();
            }

            List<Predicate> predicates = new ArrayList<>();
            Instant now = Instant.now();

            params.forEach((key, value) -> {
                if (value == null || value.isBlank()) return;
                switch (key) {
                    case "ipAddresses":
                        String[] ips = value.split(",");
                        List<Predicate> ipPredicates = new ArrayList<>();
                        for (String ip : ips) {
                            ipPredicates.add(cb.equal(
                                    cb.function("text", String.class, root.get("ipAddress")),
                                    ip.trim()
                            ));
                        }
                        predicates.add(cb.or(ipPredicates.toArray(new Predicate[0])));
                        break;

                    case "cidrRanges":
                        String[] cidrs = value.split(",");
                        predicates.add(root.get("cidrRange").in((Object[]) cidrs));
                        break;
                    case "scopes":
                        String[] scopes = value.split(",");
                        predicates.add(root.get("scope").in((Object[]) scopes));
                        break;
                    case "blockTypes":
                        String[] types = value.split(",");
                        predicates.add(root.get("blockType").in((Object[]) types));
                        break;
                    case "severity":
                        try {
                            short sev = Short.parseShort(value);
                            predicates.add(cb.equal(root.get("severity").as(Short.class), sev));
                        } catch (NumberFormatException ignored) { }
                        break;
                    case "createdBy":
                        predicates.add(cb.like(cb.lower(root.get("createdBy")), "%" + value.toLowerCase() + "%"));
                        break;
                    case "expired":
                        if ("true".equalsIgnoreCase(value) || "1".equals(value)) {
                            predicates.add(cb.and(cb.isNotNull(root.get("expiresAt")), cb.lessThanOrEqualTo(root.get("expiresAt").as(Instant.class), now)));
                        } else if ("false".equalsIgnoreCase(value) || "0".equals(value)) {
                            predicates.add(cb.or(cb.isNull(root.get("expiresAt")), cb.greaterThan(root.get("expiresAt").as(Instant.class), now)));
                        }
                        break;
                    default:
                        // ignore unknown filters
                }
            });

            return predicates.isEmpty() ? cb.conjunction() : cb.and(predicates.toArray(new Predicate[0]));
        };
    }

}
