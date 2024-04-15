package server

import (
	"fmt"
	"net/http"
	"pms/filesystem/internal/config"

	"github.com/rs/cors"
)

func RunServer(api string, port string) {
	cfg := config.DefaultConfig()
	mux := http.NewServeMux()
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "TEST")
	})
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{cfg.Host},
		AllowCredentials: true,
		Debug:            true,
	})
	handler := c.Handler(mux)
	http.ListenAndServe(cfg.Port, handler)
}
