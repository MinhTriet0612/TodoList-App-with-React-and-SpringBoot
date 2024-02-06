package org.example.fullstackbackend.backendapplication.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.fullstackbackend.backendapplication.model.User;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class AuthenticationResponse {
    private String token;
    private User user;
}
