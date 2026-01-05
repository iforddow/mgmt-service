package com.iforddow.mgmt.dto;

import com.maxmind.geoip2.model.AsnResponse;
import com.maxmind.geoip2.model.CityResponse;

/*
* A DTO class for IP address information including ASN and geographical details.
*
* Uses data from MaxMind's GeoIP2 ASN and City databases.
*
* @author IFD
* @since 2025-12-20
* */
public record IpAddressInfoDTO(String asnNumber, String asnOrganization, String network, String continent, String country, String region, String city, int accuracyRadius,
                               double latitude, double longitude, String timeZone, String postalCode, String countryIsoCode, boolean isAnonymous, boolean isAnonymousVpn,
                               boolean isAnycast, boolean isHostingProvider, boolean isLegitimateProxy, boolean isPublicProxy, boolean isResidentialProxy,
                               boolean isTorExitNode) {

    public IpAddressInfoDTO(AsnResponse asnResponse, CityResponse cityResponse) {
        this(
                asnResponse.getAutonomousSystemNumber().toString(),
                asnResponse.getAutonomousSystemOrganization(),
                asnResponse.getNetwork().toString(),
                cityResponse.getContinent().getName(),
                cityResponse.getCountry().getName(),
                cityResponse.getMostSpecificSubdivision().getName(),
                cityResponse.getCity().getName(),
                cityResponse.getLocation().getAccuracyRadius(),
                cityResponse.getLocation().getLatitude(),
                cityResponse.getLocation().getLongitude(),
                cityResponse.getLocation().getTimeZone(),
                cityResponse.getPostal().getCode(),
                cityResponse.getCountry().getIsoCode(),
                cityResponse.getTraits().isAnonymous(),
                cityResponse.getTraits().isAnonymousVpn(),
                cityResponse.getTraits().isAnycast(),
                cityResponse.getTraits().isHostingProvider(),
                cityResponse.getTraits().isLegitimateProxy(),
                cityResponse.getTraits().isPublicProxy(),
                cityResponse.getTraits().isResidentialProxy(),
                cityResponse.getTraits().isTorExitNode()
        );
    }

}