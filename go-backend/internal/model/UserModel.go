package model

type UserInfo struct {
	Email   string `json:"email"`
	Name    string `json:"name"`
	IdAdmin bool   `json:"id_admin"`
}
