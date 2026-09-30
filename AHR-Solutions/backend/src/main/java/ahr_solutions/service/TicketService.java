package ahr_solutions.service;

import ahr_solutions.dto.CreateTicketRequest;
import ahr_solutions.model.Category;
import ahr_solutions.model.Ticket;
import ahr_solutions.model.User;
import ahr_solutions.repository.CategoryRepository;
import ahr_solutions.repository.TicketRepository;
import ahr_solutions.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public TicketService(
            TicketRepository ticketRepository,
            CategoryRepository categoryRepository,
            UserRepository userRepository
    ) {
        this.ticketRepository = ticketRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
    }

    public Ticket criarChamado(CreateTicketRequest request) {

        Category category = categoryRepository
                .findById(request.getCategoryId())
                .orElseThrow(() ->
                        new RuntimeException("Categoria não encontrada")
                );

        User requester = userRepository
                .findById(request.getRequesterId())
                .orElseThrow(() ->
                        new RuntimeException("Usuário não encontrado")
                );

        Ticket ticket = new Ticket(
                request.getTitle(),
                request.getDescription(),
                request.getPriority(),
                category,
                requester,
                category.getTeam()
        );

        return ticketRepository.save(ticket);
    }

    public List<Ticket> listarChamados() {
        return ticketRepository.findAll();
    }

    public Optional<Ticket> buscarPorId(Long id) {
        return ticketRepository.findById(id);
    }

    public void excluirChamado(Long id) {
        ticketRepository.deleteById(id);
    }
}