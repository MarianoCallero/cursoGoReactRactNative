package hello

import (
	"encoding/json"
	"net/http"
)


// Hello godoc
// @Summary Hello
// @Tags api
// @Security BearerAuth
// @Produce json
// @Success 200 {object} map[string]string
// @Router /api/v1/hello [get]

func Hello(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	_ = json.NewEncoder(w).Encode(map[string]string{
		"message": "Hola desde Go",
	})
}
