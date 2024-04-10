package server

import (
	"fmt"
	"net/http"
	"pms/filesystem/internal/config"

	"github.com/rs/cors"
)

func RunServer() {
	cfg := config.DefaultConfig()
	mux := http.NewServeMux()
	router(mux)
	handler := cors.New(cors.Options{
		AllowedOrigins:   []string{cfg.Host},
		AllowCredentials: true,
		Debug:            true,
	}).Handler(mux)
	http.ListenAndServe(cfg.Port, handler)
}

func router(mux *http.ServeMux) {
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "TEST")
	})
	mux.HandleFunc("GET /project/{id}", func(w http.ResponseWriter, r *http.Request) {
		projectID := r.PathValue("id")
		fmt.Fprintf(w, projectID)
	})
}
