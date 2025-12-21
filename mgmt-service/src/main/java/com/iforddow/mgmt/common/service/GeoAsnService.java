package com.iforddow.mgmt.common.service;

import com.maxmind.geoip2.DatabaseReader;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.AsnResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.InetAddress;

@Service
public class GeoAsnService {

    private final DatabaseReader databaseReader;

    /**
     * A constructor that initializes the GeoAsnService with the GeoIP2 database.
     *
     * @param database The GeoIP2 database resource.
     * @throws IOException If there is an error reading the database file.
     *
     * @author IFD
     * @since 2025-11-09
     * */
    public GeoAsnService(@Value("classpath:geomind/GeoLite2-ASN.mmdb") Resource database) throws IOException {
        this.databaseReader = new DatabaseReader.Builder(database.getInputStream()).build();
    }

    public AsnResponse getAsnInfo(String ip) throws IOException, GeoIp2Exception {

        InetAddress address = InetAddress.getByName(ip);

        return databaseReader.asn(address);
    }
}
