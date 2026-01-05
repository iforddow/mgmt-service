package com.iforddow.mgmt.module.ip.block.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

/*
* A request class to represent blocked IP data.
*
* @author IFD
* @since 2025-12-30
* */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlockedIpRequest {

    private @NonNull String ipAddress;
    private Integer cidrRange;
    private @NonNull String scope;
    private String serviceName;
    private @NonNull String reason;
    private String reasonNotes;
    private @NonNull String blockType;
    private @NonNull Integer severity;
    private String expiresAt;

    @Override
    public String toString() {
        return "BlockedIpRequest{" +
                "ipAddress='" + ipAddress + '\'' +
                ", cidrRange='" + cidrRange + '\'' +
                ", scope='" + scope + '\'' +
                ", serviceName='" + serviceName + '\'' +
                ", reason='" + reason + '\'' +
                ", reasonNotes='" + reasonNotes + '\'' +
                ", blockType='" + blockType + '\'' +
                ", severity=" + severity +
                ", expiresAt='" + expiresAt + '\'' +
                '}';
    }

}