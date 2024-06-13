package server

import (
	"encoding/json"
	"fmt"

	//"io"

	"net/http"
	"os"
	"path/filepath"
	"pms/filesystem/internal/config"
	"sort"
	"strconv"
	"strings"
	// "pms/filesystem/internal/models"
)

type myJSON struct {
	Array []string `json:"arr"`
}
type DownloadFile struct {
	id   string `json:"project_id"`
	path string `json:"path"`
}

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
	var id string
	numFiles = numFiles + 1
	for i := 0; i < numFiles; i++ {
		fileState := 1 //1 unchanged 2 changed 3 new 0 deleted
		str := strconv.Itoa(i)
		path = cfg.Dir + strings.Join(multipartFormData.Value[str+"[fieldname]"], "")
		if i == 0 {
			trimmed := strings.TrimPrefix(path, "files/")
			//fmt.Println(trimmed)
			id, _, _ = strings.Cut(trimmed, "/")
			//fmt.Println(projectId)
		}
		initialStat, err := os.Stat(path)
		if err != nil {
			if os.IsNotExist(err) {
				fileState = 3
			}
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
		case 3:
			_, after, _ := strings.Cut(path, "/")
			_, final, _ := strings.Cut(after, "/")
			res = append(res, final)
			diff = append(diff, path+" new")
		case 2:
			diff = append(diff, path+" changed")
		default:
		}
	}
	sort.Strings(res)

	res = append([]string{id}, res...)
	fmt.Println(strings.Join(res, "\n"))
	/*resp, err := json.Marshal(res)
	if err != nil {
		fmt.Println(err)
	}*/
	jsondat := &myJSON{Array: res}
	encjson, _ := json.Marshal(jsondat)
	fmt.Println(string(encjson))
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
	w.Write(encjson)
}
func commitSearch(w http.ResponseWriter, r *http.Request) {
	commit := cfg.Commit + r.PathValue("id")
	diff, err := os.ReadFile(commit)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Fprintf(w, string(diff))
}
func downloadFile(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Stiglo")
	var file DownloadFile
	err := json.NewDecoder(r.Body).Decode(&file)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println("files/" + file.id + "/" + file.path)
}
func RunServer() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /upload/{commit}", uploadFile)
	mux.HandleFunc("POST /files", downloadFile)
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
