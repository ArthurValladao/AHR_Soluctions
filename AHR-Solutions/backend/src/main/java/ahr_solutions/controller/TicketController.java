package ahr_solutions.controller;

import ahr_solutions.dto.CreateTicketRequest;
import ahr_solutions.model.Ticket;
import ahr_solutions.service.TicketService;

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
    public Ticket criarChamado(
            @RequestBody CreateTicketRequest request
    ) {
        return ticketService.criarChamado(request);
    }

    @GetMapping
    public List<Ticket> listarChamados() {
        return ticketService.listarChamados();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> buscarPorId(
            @PathVariable Integer id
    ) {
        return ticketService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirChamado(
            @PathVariable Integer id
    ) {

        if (ticketService.buscarPorId(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        ticketService.excluirChamado(id);

        return ResponseEntity.noContent().build();
    }
}