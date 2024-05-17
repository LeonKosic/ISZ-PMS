package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"pms/filesystem/internal/config"
	"pms/filesystem/internal/models"

	"github.com/rs/cors"
)

var cfg = config.DefaultConfig()

func RunServer() {
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
		fmt.Fprint(w, "TEST")
	})
	mux.HandleFunc("GET /project/{id}", func(w http.ResponseWriter, r *http.Request) {
		projectID := r.PathValue("id")
		fmt.Fprint(w, projectID)
	})
	mux.HandleFunc("POST /file", func(w http.ResponseWriter, r *http.Request) {
		var file models.File
		err := json.NewDecoder(r.Body).Decode(&file)
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}
		f, err := os.Create(cfg.Files + file.Name)
		if err != nil {
			w.WriteHeader(http.StatusExpectationFailed)
			return
		}
		f.Write(file.Content)
		defer f.Close()
	})
	mux.HandleFunc("GET /file/{name}", func(w http.ResponseWriter, r *http.Request) {
		name := cfg.Files + r.PathValue("name")
		// fileBytes, err := os.ReadFile(name)
		// if err != nil {
		// 	panic(err)
		// }
		// w.WriteHeader(http.StatusOK)
		// w.Header().Set("Content-Type", "application/octet-stream")
		// w.Write(fileBytes)
		http.ServeFile(w, r, name)
	})
}
