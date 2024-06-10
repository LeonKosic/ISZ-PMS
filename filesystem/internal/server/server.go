package server

import (
	"fmt"
	//"io"
	//	"encoding/json"
	"net/http"
	//"os"
	"pms/filesystem/internal/config"
	// "pms/filesystem/internal/models"
)

func uploadFile(w http.ResponseWriter, r *http.Request) {

	r.ParseMultipartForm(5 << 20) //5MB
	multipartFormData := r.MultipartForm
	fmt.Print(multipartFormData)
	//	for _, v := range multipartFormData.File["attachments"] {
	//		fmt.Println(v.Filename, ":", v.Size)
	//		uploadedFile, _ := v.Open()
	//		uploadedFile.Read([]byte{})
	//		uploadedFile.Close()
	//	}
	//	fmt.Println(r.Body)
	//fmt.Print(r)
	//fmt.Println()
	//decoder := json.NewDecoder(r.Body)
	/*var files []models.File
	err := decoder.Decode(&files)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("AAAAA")
	*/
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
