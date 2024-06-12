package server

import (
	"fmt"
	//"io"
	//	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"pms/filesystem/internal/config"
	"strconv"
	"strings"
	// "pms/filesystem/internal/models"
)

var cfg = config.DefaultConfig()

func uploadFile(w http.ResponseWriter, r *http.Request) {

	r.ParseMultipartForm(10 << 20) //10MB
	multipartFormData := r.MultipartForm
	numFiles := 0
	for _, k := multipartFormData.Value[strconv.Itoa(numFiles)+"[originalname]"]; k; _, k = multipartFormData.Value[strconv.Itoa(numFiles+1)+"[originalname]"] {
		numFiles = numFiles + 1
	}
	numFiles = numFiles + 1
	for i := 0; i < numFiles; i++ {
		str := strconv.Itoa(i)
		path := cfg.Dir + strings.Join(multipartFormData.Value[str+"[fieldname]"], "")
		os.MkdirAll(filepath.Dir(path), os.ModePerm)
		f, err := os.Create(path)
		if err != nil {
			fmt.Println(err)
		}
		_, err = f.WriteString(strings.Join(multipartFormData.Value[str+"[buffer]"], ""))
		if err != nil {
			fmt.Println(err)
		}
		f.Close()
	}
	fmt.Fprintf(w, "accepted")

}

func RunServer() {
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
