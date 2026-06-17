package com.zappysales.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for setting up OpenAPI (Swagger) documentation.
 */
@Configuration
public class OpenApiConfig {

    /**
     * Defines the OpenAPI metadata for the ZappySales application.
     *
     * @return the configured OpenAPI instance
     */
    @Bean
    public OpenAPI zappySalesOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("ZappySales API")
                        .description("User and Address Management API for ZappySales")
                        .version("v1")
                        .contact(new Contact()
                                .name("Ngane Emmanuel")
                                .email("emmanuel.ngane@example.cm")
                                .url("https://github.com/NganeEmmanuel")));
    }
}
