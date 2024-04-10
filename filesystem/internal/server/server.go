package server

import (
	"fmt"
	"net/http"

	"github.com/rs/cors"
)

func RunServer(api string, port string) {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "TEST")
	})
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{api},
		AllowCredentials: true,
		Debug:            true,
	})
	handler := c.Handler(mux)
	http.ListenAndServe(port, handler)
}
