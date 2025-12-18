package com.iforddow.mgmt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MgmtApplication {

    public static void main(String[] args) {
        SpringApplication.run(MgmtApplication.class, args);
    }

}
