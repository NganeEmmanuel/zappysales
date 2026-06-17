package com.zappysales.backend.config;

import org.jspecify.annotations.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuration class for Cross-Origin Resource Sharing (CORS) settings.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    private final String[] allowedOrigins;

    /**
     * Constructs a CorsConfig with allowed origins injected from application properties.
     *
     * @param allowedOrigins the comma-separated allowed origins list
     */
    public CorsConfig(@Value("${app.cors.allowed-origins:*}") String[] allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        boolean allowCredentials = true;
        for (String origin : allowedOrigins) {
            if ("*".equals(origin)) {
                allowCredentials = false;
                break;
            }
        }

        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(allowCredentials);
    }
}
