package com.designingapp.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("ADMIN")
public class AdminController {


    @GetMapping
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello from ADMIN secured endpoint");
    }
}
