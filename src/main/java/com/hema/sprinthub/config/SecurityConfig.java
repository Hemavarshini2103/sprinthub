package com.hema.sprinthub.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hema.sprinthub.security.JwtAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import java.util.List;
@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
        .csrf(csrf -> csrf.disable())
        .cors(cors -> {})

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            )

            .authorizeHttpRequests(auth -> auth
            		.requestMatchers(HttpMethod.OPTIONS, "/**")
            		.permitAll()

                // Public endpoints
                .requestMatchers(
                    "/users/register",
                    "/users/login",
                    "/swagger-ui/**",
                    "/swagger-ui.html",
                    "/v3/api-docs/**"
                ).permitAll()
                .requestMatchers(HttpMethod.GET, "/users")
                .hasAuthority("MANAGER")

                // Project authorization
                .requestMatchers(HttpMethod.POST, "/projects")
                .hasAuthority("MANAGER")

                .requestMatchers(HttpMethod.PUT, "/projects/**")
                .hasAuthority("MANAGER")

                .requestMatchers(HttpMethod.DELETE, "/projects/**")
                .hasAuthority("MANAGER")

                // Task authorization
                .requestMatchers(HttpMethod.POST, "/tasks")
                .hasAuthority("MANAGER")

                .requestMatchers(HttpMethod.PUT, "/tasks/**")
                .hasAuthority("MANAGER")

                .requestMatchers(HttpMethod.DELETE, "/tasks/**")
                .hasAuthority("MANAGER")

                // Everything else requires login
                .anyRequest().authenticated()
            );

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
            List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
        	    List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        	);

        configuration.setAllowedHeaders(
            List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}