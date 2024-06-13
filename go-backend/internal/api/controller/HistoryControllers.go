package controller

import (
	"app/internal/database"
	"app/internal/model"
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"net/http"
	"os"
	"time"
)

func GenerateUserToken(context *gin.Context) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": uuid.New().String(),
		"exp": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token"})
		return
	}
	context.JSON(http.StatusOK, gin.H{"token": tokenString})
}

// GetHistory получить историю пользователя.
// @Summary Получить историю пользователя
// @Description Предоставляет историю распознаваний юзера.
// @Accept json
// @Produce json
// @Success 200 {object} model.CodeResponse "История получена"
// @Failure 400 {object} model.ErrorResponse "Не удалось получить историю"
// @Tags History
// @Security CookieAuth
// @Router /v1/gethistory [get]
func GetHistory(context *gin.Context) {
	userID := context.Param("user_id")
	rows, err := database.Db.Query("SELECT date, result, status, photo FROM atomic_history WHERE user_id = $1", userID)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to query database"})
		return
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {

		}
	}(rows)

	var history []gin.H
	for rows.Next() {
		var date, result, status, photo string
		err := rows.Scan(&date, &result, &status, &photo)
		if err != nil {
			context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to scan row"})
			return
		}

		history = append(history, gin.H{
			"date":   date,
			"result": result,
			"status": status,
			"photo":  photo,
		})
	}

	if len(history) == 0 {
		context.JSON(http.StatusOK, gin.H{"message": "No history"})
	} else {
		context.JSON(http.StatusOK, history)
	}
}

// AddHistory добавить историю пользователя.
// @Summary Добавить историю пользователя
// @Description Добавляет запись в историю распознаваний юзера.
// @Accept json
// @Produce json
// @Success 200 {object} model.CodeResponse "Запись добавлена"
// @Failure 400 {object} model.ErrorResponse "Не удалось добавить запись"
// @Tags History
// @Security CookieAuth
// @Router /v1/addhistory [get]
func AddHistory(context *gin.Context) {
	userID, err := context.Cookie("user_id")
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "user_id cookie not found"})
		return
	}

	if err := context.BindJSON(&model.NewHistory{}); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": "invalid JSON data"})
		return
	}

	currentTime := time.Now().Format(time.RFC3339)
	_, err = database.Db.Exec("INSERT INTO atomic_history (user_id, date, result, status, photo) VALUES ($1, $2, $3, $4, $5)", userID, currentTime, requestData.Result, requestData.Status, requestData.Photo)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"error": "failed to insert history into database"})
		return
	}

	context.JSON(http.StatusOK, gin.H{"message": "History added successfully"})
}
