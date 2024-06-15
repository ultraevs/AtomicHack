package controller

import (
	"app/internal/database"
	"app/internal/model"
	"database/sql"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"os"
	"strconv"
	"time"
)

// Login Вход в аккаунт.
// @Summary Логин
// @Description Авторизует пользователя с предоставленным email и паролем.
// @Accept json
// @Produce json
// @Param request body model.LoginRequest true "Запрос на авторизацию пользователя"
// @Success 200 {object} model.CodeResponse "Пользователь авторизован"
// @Failure 400 {object} model.ErrorResponse "Не удалось авторизовать пользователя"
// @Tags Auth
// @Router /v1/login [post]
func Login(context *gin.Context) {
	var body struct {
		ID       int
		Password string
	}
	if context.Bind(&body) != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Failed to read body"})
		return
	}

	var form model.LoginResponse
	err := database.Db.QueryRow("SELECT user_id, password, name, is_admin FROM atomic_users WHERE user_id = $1", body.ID).Scan(&form.ID, &form.Password, &form.Name, &form.IsAdmin)
	if err == nil {
		if err := bcrypt.CompareHashAndPassword([]byte(form.Password), []byte(body.Password)); err != nil {
			context.JSON(http.StatusUnauthorized, gin.H{"error": "Wrong password"})
			return
		}
	} else if errors.Is(err, sql.ErrNoRows) {
		context.JSON(http.StatusUnauthorized, gin.H{"error": "No User"})
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  strconv.Itoa(form.ID),
		"exp":  time.Now().Add(time.Hour * 24 * 30).Unix(),
		"name": form.Name,
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token"})
		return
	}
	context.JSON(http.StatusOK, gin.H{"token": tokenString})
}
