package server

import (
	"fmt"
	//"io"
	"net/http"
	//"os"
	"pms/filesystem/internal/config"
)

func uploadFile(w http.ResponseWriter, r *http.Request) {

	//r.ParseMultipartForm(5 << 20) //5MB
	//multipartFormData := r.MultipartForm
	//fmt.Fprint(w, multipartFormData)
	//	for _, v := range multipartFormData.File["attachments"] {
	//		fmt.Println(v.Filename, ":", v.Size)
	//		uploadedFile, _ := v.Open()
	//		uploadedFile.Read([]byte{})
	//		uploadedFile.Close()
	//	}
	err := r.ParseMultipartForm(5 << 20)
	if err != nil {
		fmt.Println("Error ParseMultipartForm: ", err)
		return
	}
	fmt.Println("AAAAA")

	fmt.Fprintf(w, "accepted")
}

func RunServer() {
	cfg := config.DefaultConfig()
	mux := http.NewServeMux()
	mux.HandleFunc("GET /", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "TEST")
	})
	mux.HandleFunc("POST /upload", uploadFile)
	//c := cors.New(cors.Options{
	//	AllowedOrigins:   []string{"*"},
	//	AllowedHeaders:   []string{"*"},
	//	AllowCredentials: true,
	//	Debug:            true,
	//})
	//handler := c.Handler(mux)
	//http.ListenAndServe(cfg.Port, handler)
	http.ListenAndServe(cfg.Port, mux)
}
