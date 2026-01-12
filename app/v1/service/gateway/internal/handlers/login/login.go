package login

import (
	"encoding/json"
	"net/http"

	"gateway/internal/auth"
)

type LoginRequest struct {
	User string `json:"user"`
	Pass string `json:"pass"`
}

func Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	// 👇 ejemplo hardcodeado
	if req.User != "admin" || req.Pass != "1234" {
		http.Error(w, "invalid credentials", http.StatusUnauthorized)
		return
	}

	token, _ := auth.GenerateToken("admin")

	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
	})
}
