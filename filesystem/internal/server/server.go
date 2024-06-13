package server

import (
	"fmt"
	//"io"
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"pms/filesystem/internal/config"
	"sort"
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
	var diff []string
	var res []string
	var path string
	numFiles = numFiles + 1
	for i := 0; i < numFiles; i++ {
		fileState := 1 //1 unchanged 2 changed 3 new 0 deleted
		str := strconv.Itoa(i)
		path = cfg.Dir + strings.Join(multipartFormData.Value[str+"[fieldname]"], "")
		initialStat, err := os.Stat(path)
		if err != nil {
			fileState = 3
		}
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
		stat, err := os.Stat(path)
		if err != nil {
			fmt.Println(err)
		} else {
			if fileState == 1 && (stat.Size() != initialStat.Size() || stat.ModTime() != initialStat.ModTime()) {
				fileState = 2
			}
		}
		switch fileState {
		case 2:
			diff = append(diff, path+" changed")
		case 3:
			res = append(res, path)
			diff = append(diff, path+" new")
		default:
		}
	}
	sort.Strings(res)
	fmt.Println(strings.Join(res, "\n"))
	resp, err := json.Marshal(res)
	commit := cfg.Commit + r.PathValue("commit")
	os.MkdirAll(cfg.Commit, os.ModePerm)
	f, err := os.Create(commit)
	if err != nil {
		fmt.Println(err)
	}
	_, err = f.WriteString(strings.Join(diff, "\n"))
	if err != nil {
		fmt.Println(err)
	}
	f.Close()
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	fmt.Fprint(w, resp)
}
func commitSearch(w http.ResponseWriter, r *http.Request) {
	commit := cfg.Commit + r.PathValue("id")
	diff, err := os.ReadFile(commit)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Fprintf(w, string(diff))
}
func RunServer() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /upload/{commit}", uploadFile)
	fs := http.FileServer(http.Dir(cfg.Dir))
	mux.Handle("/files", http.StripPrefix("/files", fs))
	mux.HandleFunc("GET /commit/{id}", commitSearch)
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
