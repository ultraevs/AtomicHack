package model

type LoginRequest struct {
	ID       int    `json:"id" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
	ID       int    `json:"id" binding:"required"`
	Password string `json:"password" binding:"required"`
	Name     string `json:"name"  binding:"required"`
	IsAdmin  bool   `json:"is_admin" binding:"required"`
}
