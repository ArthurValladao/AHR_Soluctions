package ahr_solutions.controller;

import ahr_solutions.dto.ApiResponse;
import ahr_solutions.dto.LoginRequest;
import ahr_solutions.dto.LoginResponse;
import ahr_solutions.service.AuthService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500"
})
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>>
    login(
            @RequestBody LoginRequest request
    ) {

        LoginResponse user =
                authService.login(request);

        return ResponseEntity.ok(
                new ApiResponse<>(
                        user,
                        "Login realizado com sucesso"
                )
        );
    }
}