package model

type Recognition struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	Date    string `json:"date"`
	Result  string `json:"result"`
	Status  string `json:"status"`
	Photo   string `json:"photo"`
	Comment string `json:"comment"`
}
