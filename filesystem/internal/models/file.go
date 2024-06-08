package models

type File struct {
	Path     string `json:"fieldname"`
	Name     string `json:"originalname"`
	Encoding string `json:"encoding"`
	Mimetype string `json:"mimetype"`
	Buffer   []byte `json:"buffer"`
	Size     int    `json:"size"`
}
