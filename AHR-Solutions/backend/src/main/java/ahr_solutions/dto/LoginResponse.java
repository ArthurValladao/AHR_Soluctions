package ahr_solutions.dto;

public class LoginResponse {

    private Integer id;
    private String name;
    private String email;
    private String role;
    private Integer teamId;
    private String teamName;

    public LoginResponse(
            Integer id,
            String name,
            String email,
            String role,
            Integer teamId,
            String teamName
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.teamId = teamId;
        this.teamName = teamName;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public Integer getTeamId() {
        return teamId;
    }

    public String getTeamName() {
        return teamName;
    }
}