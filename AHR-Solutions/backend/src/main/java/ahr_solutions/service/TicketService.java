package ahr_solutions.service;

import ahr_solutions.dto.CreateTicketRequest;
import ahr_solutions.exception.ResourceNotFoundException;
import ahr_solutions.model.Category;
import ahr_solutions.model.Ticket;
import ahr_solutions.model.User;
import ahr_solutions.repository.CategoryRepository;
import ahr_solutions.repository.TicketRepository;
import ahr_solutions.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

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
                        new ResourceNotFoundException(
                                "Categoria não encontrada"
                        )
                );

        User requester = userRepository
                .findById(request.getRequesterId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Usuário não encontrado"
                        )
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

    public Ticket buscarPorId(Integer id) {

        return ticketRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Chamado não encontrado"
                        )
                );
    }

    public void excluirChamado(Integer id) {

        Ticket ticket = buscarPorId(id);

        ticketRepository.delete(ticket);
    }
}