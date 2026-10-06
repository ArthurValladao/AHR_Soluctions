package ahr_solutions.controller;

import ahr_solutions.dto.ApiResponse;
import ahr_solutions.dto.CreateTicketRequest;
import ahr_solutions.model.Ticket;
import ahr_solutions.service.TicketService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://127.0.0.1:5500",
        "http://localhost:5500"
})
@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Ticket>> criarChamado(
            @RequestBody CreateTicketRequest request
    ) {

        Ticket ticket = ticketService.criarChamado(request);

        ApiResponse<Ticket> response =
                new ApiResponse<>(
                        ticket,
                        "Chamado criado com sucesso"
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Ticket>>> listarChamados() {

        List<Ticket> tickets =
                ticketService.listarChamados();

        ApiResponse<List<Ticket>> response =
                new ApiResponse<>(
                        tickets,
                        "Chamados encontrados"
                );

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Ticket>> buscarPorId(
            @PathVariable Integer id
    ) {

        Ticket ticket =
                ticketService.buscarPorId(id);

        ApiResponse<Ticket> response =
                new ApiResponse<>(
                        ticket,
                        "Chamado encontrado"
                );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> excluirChamado(
            @PathVariable Integer id
    ) {

        ticketService.excluirChamado(id);

        ApiResponse<Void> response =
                new ApiResponse<>(
                        null,
                        "Chamado excluído com sucesso"
                );

        return ResponseEntity.ok(response);
    }
}