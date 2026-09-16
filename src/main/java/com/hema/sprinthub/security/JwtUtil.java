package com.hema.sprinthub.security;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.security.Keys;
@Component
public class JwtUtil {
	private final String SECRET_KEY = "mySecretKeyForSprintHubJwt123456789";
	public String generateToken(String email, String role) {

	    return Jwts.builder()
	            .subject(email)
	            .claim("role", role)
	            .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
	            .compact();
	}
	public String extractEmail(String token) {

	    return Jwts.parser()
	            .verifyWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()))
	            .build()
	            .parseSignedClaims(token)
	            .getPayload()
	            .getSubject();
	}
}
