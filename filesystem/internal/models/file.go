package models

type File struct {
	Fieldname    string `json:"fieldname"`
	Originalname string `json:"originalname"`
	Encoding     string `json:"encoding"`
	Mimetype     string `json:"mimetype"`
	Buffer       []byte `json:"buffer"`
	Size         int    `json:"size"`
}
