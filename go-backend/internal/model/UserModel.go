package model

type UserInfo struct {
	ID      int    `json:"id"`
	Name    string `json:"name"`
	IdAdmin bool   `json:"id_admin"`
}
