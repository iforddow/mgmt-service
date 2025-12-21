package com.iforddow.mgmt.common.service;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CityResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.InetAddress;

/**
 * A service class for retrieving geolocation information based on IP addresses.
 * Uses the MaxMind GeoIP2 database to fetch location details.
 *
 * @author IFD
 * @since 2025-11-09
 * */
@Service
@Slf4j
public class GeoLocationService {

    private final DatabaseReader databaseReader;

    /**
     * A constructor that initializes the GeoLocationService with the GeoIP2 database.
     *
     * @param database The GeoIP2 database resource.
     * @throws IOException If there is an error reading the database file.
     *
     * @author IFD
     * @since 2025-11-09
     * */
    public GeoLocationService(@Value("classpath:geomind/GeoLite2-City.mmdb") Resource database) throws IOException {
        this.databaseReader = new DatabaseReader.Builder(database.getFile()).build();
    }

    /**
     * A method to get geolocation information for a given IP address.
     *
     * @param ipAddress The IP address to look up.
     * @return A GeoLocation object containing country, region, and city information.
     *
     * @author IFD
     * @since 2025-11-09
     * */
    public CityResponse getLocationInfo(String ipAddress) throws IOException, GeoIp2Exception {

        InetAddress inetAddress = InetAddress.getByName(ipAddress);

        return databaseReader.city(inetAddress);

    }

}
