package server

import (
	"fmt"
	"net/http"
	"pms/filesystem/internal/config"

	"github.com/rs/cors"
)

func uploadFile(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(5 << 20) //5MB
	multipartFormData := r.MultipartForm

	for _, v := range multipartFormData.File["attachments"] {
		fmt.Println(v.Filename, ":", v.Size)
		uploadedFile, _ := v.Open()
		uploadedFile.Read([]byte{})
		uploadedFile.Close()
	}
}

func RunServer() {
	cfg := config.DefaultConfig()
	mux := http.NewServeMux()
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "TEST")
	})
	mux.HandleFunc("POST /upload", uploadFile)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{cfg.Host},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
		Debug:            true,
	})

	handler := c.Handler(mux)
	http.ListenAndServe(cfg.Port, handler)
}
