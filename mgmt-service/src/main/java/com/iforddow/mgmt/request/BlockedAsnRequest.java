package com.iforddow.mgmt.request;

import lombok.Data;
import lombok.NonNull;

import java.time.Instant;
import java.util.UUID;

/*
* A request class to represent blocked ASN data.
*
* @author IFD
* @since 2025-12-16
* */
@Data
public class BlockedAsnRequest {

    private @NonNull Integer asn;
    private String asnName;
    private String asnOrg;
    private @NonNull String scope;
    private String serviceName;
    private @NonNull String reason;
    private String reasonNotes;
    private @NonNull String blockType;
    private @NonNull Integer severity;
    private String expiresAt;

}
