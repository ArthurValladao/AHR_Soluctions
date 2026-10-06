package ahr_solutions.service;

import ahr_solutions.dto.LoginRequest;
import ahr_solutions.dto.LoginResponse;
import ahr_solutions.exception.UnauthorizedException;
import ahr_solutions.model.User;
import ahr_solutions.repository.UserRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse login(LoginRequest request) {

        if (
                request.getEmail() == null ||
                request.getPassword() == null
        ) {
            throw new UnauthorizedException(
                    "E-mail ou senha inválidos"
            );
        }

        User user = userRepository
                .findByEmailIgnoreCase(
                        request.getEmail().trim()
                )
                .orElseThrow(() ->
                        new UnauthorizedException(
                                "E-mail ou senha inválidos"
                        )
                );

        if (!user.isActive()) {
            throw new UnauthorizedException(
                    "Usuário desativado"
            );
        }

        if (
                !passwordEncoder.matches(
                        request.getPassword(),
                        user.getPasswordHash()
                )
        ) {
            throw new UnauthorizedException(
                    "E-mail ou senha inválidos"
            );
        }

        Integer teamId = null;
        String teamName = null;

        if (user.getTeam() != null) {
            teamId = user.getTeam().getId();
            teamName = user.getTeam().getName();
        }

        return new LoginResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                teamId,
                teamName
        );
    }
}