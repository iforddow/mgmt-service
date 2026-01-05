package com.iforddow.mgmt.module.system.settings.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/system/settings")
public class SystemSettingsController {

    @GetMapping("/")
    public String getSettings() {
        return "System settings endpoint";
    }

}
