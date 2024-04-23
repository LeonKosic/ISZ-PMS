package models

type File struct {
	Id      int    `json:"id"`
	Creator int    `json:"creator"`
	Name    string `json:"name"`
	Content []byte `json:"content"`
}
