package ahr_solutions.config;

import ahr_solutions.model.User;
import ahr_solutions.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner criarUsuariosIniciais(
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder
    ) {

        return args -> {

            if (
                    !userRepository.existsByEmailIgnoreCase(
                            "funcionario@ahr.com"
                    )
            ) {

                User funcionario =
                        new User(
                                "Funcionário AHR",
                                "funcionario@ahr.com",
                                passwordEncoder.encode(
                                        "123456"
                                ),
                                "EMPLOYEE",
                                null
                        );

                userRepository.save(
                        funcionario
                );
            }

            if (
                    !userRepository.existsByEmailIgnoreCase(
                            "agente@ahr.com"
                    )
            ) {

                User agente =
                        new User(
                                "Agente AHR",
                                "agente@ahr.com",
                                passwordEncoder.encode(
                                        "123456"
                                ),
                                "AGENT",
                                null
                        );

                userRepository.save(
                        agente
                );
            }

            if (
                    !userRepository.existsByEmailIgnoreCase(
                            "admin@ahr.com"
                    )
            ) {

                User admin =
                        new User(
                                "Administrador AHR",
                                "admin@ahr.com",
                                passwordEncoder.encode(
                                        "123456"
                                ),
                                "ADMIN",
                                null
                        );

                userRepository.save(
                        admin
                );
            }
        };
    }
}