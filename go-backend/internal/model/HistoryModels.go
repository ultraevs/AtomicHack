package model

type NewHistory struct {
	Date    string `json:"date"`
	Result  string `json:"result"`
	Status  string `json:"status"`
	Photo   string `json:"photo"`
	Comment string `json:"comment"`
}
